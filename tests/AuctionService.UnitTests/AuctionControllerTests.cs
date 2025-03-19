using AuctionService.Controllers;
using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AuctionService.RequestHelpers;
using AuctionService.UnitTests.Utils;
using AutoFixture;
using AutoMapper;
using MassTransit;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace AuctionService.UnitTests;

public class AuctionControllerTests
{
    private readonly Mock<IAuctionRepository> _auctionRepo;
    private readonly Mock<IPublishEndpoint> _publishEndpoint;
    private readonly Fixture _fixture;
    private readonly AuctionController _controller;
    private readonly IMapper _mapper;
    public AuctionControllerTests()
    {
        _fixture = new Fixture();
        _auctionRepo = new Mock<IAuctionRepository>();
        _publishEndpoint = new Mock<IPublishEndpoint>();

        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddMaps(typeof(MappingProfiles).Assembly);
        }).CreateMapper().ConfigurationProvider;

        _mapper = new Mapper(mapperConfig);
        _controller = new AuctionController(_auctionRepo.Object,
            _mapper, _publishEndpoint.Object)
        {
            ControllerContext = new ControllerContext
            {
                HttpContext = new DefaultHttpContext
                {
                    User = Helpers.GetClaimsPrincipal()
                }
            }
        };
    }

    [Fact]
    public async Task GetAuctions_WithNoParams_ReturnsAuctionDtoListOf10()
    {
        // Arrange
        var auctions = _fixture.CreateMany<AuctionDto>(10).ToList();
        _auctionRepo.Setup(x => x.GetAuctionsAsync(null)).ReturnsAsync(auctions);

        // Act
        var result = await _controller.GetAllAuction(null);

        // Assert
        Assert.Equal(10, result.Value.Count);
        Assert.IsType<ActionResult<List<AuctionDto>>>(result);
    }

    [Fact]
    public async Task GetAuctionById_WithValidId_ReturnsAuctionDto()
    {
        // Arrange
        var auction = _fixture.Create<AuctionDto>();
        _auctionRepo.Setup(x => x.GetAuctionByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // Act
        var result = await _controller.GetAuctionById(auction.Id);

        // Assert
        Assert.Equal(auction, result.Value);
        Assert.IsType<ActionResult<AuctionDto>>(result);
    }

    [Fact]
    public async Task GetAuctionById_WithInvalidId_ReturnsNotFound()
    {
        // Arrange
        _auctionRepo.Setup(x => x.GetAuctionByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // Act
        var result = await _controller.GetAuctionById(Guid.NewGuid());

        // Assert
        Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task CreateAuction_WithValidAuctionDto_ReturnsCreatedAtAction()
    {
        // Arrange
        var auctionDto = _fixture.Create<CreateAuctionDto>();
        _auctionRepo.Setup(x => x.AddAuction(It.IsAny<Auction>()));
        _auctionRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        var result = await _controller.CreateAuction(auctionDto);
        var createdResult = (CreatedAtActionResult)result.Result;

        // Assert
        Assert.NotNull(createdResult);
        Assert.Equal("GetAuctionById", createdResult.ActionName);
        Assert.IsType<AuctionDto>(createdResult.Value);
    }

    [Fact]
    public async Task CreateAuction_FailedSave_Returns400BadRequest()
    {
        // Arrange
        var auctionDto = _fixture.Create<CreateAuctionDto>();
        _auctionRepo.Setup(x => x.AddAuction(It.IsAny<Auction>()));
        _auctionRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(false);

        // Act
        var result = await _controller.CreateAuction(auctionDto);

        // Assert
        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async Task UpdateAuction_WithUpdateAuctionDto_ReturnsOkResponse()
    {
        // Arrange
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Item = _fixture.Build<Item>().Without(x => x.Auction).Create();
        var updateAuctionDto = _fixture.Create<UpdateAuctionDto>();
        auction.Seller = "test";
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);
        _auctionRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        var result = await _controller.UpdateAuction(auction.Id, updateAuctionDto);

        // Assert
        Assert.IsType<OkResult>(result);
        Assert.Equal(auction.Item.Make, updateAuctionDto.Make);
        Assert.Equal(auction.Item.Year, updateAuctionDto.Year);
        Assert.Equal(auction.Item.Mileage, updateAuctionDto.Mileage);
        Assert.Equal(auction.Item.Model, updateAuctionDto.Model);
        Assert.Equal(auction.Item.Color, updateAuctionDto.Color);

    }

    [Fact]
    public async Task UpdateAuction_WithInvalidUser_Returns403Forbid()
    {
        // Arrange
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Seller = "not-test";
        var updateAuctionDto = _fixture.Create<UpdateAuctionDto>();
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // Act
        var result = await _controller.UpdateAuction(auction.Id, updateAuctionDto);

        // Assert
        Assert.IsType<ForbidResult>(result);
    }

    [Fact]
    public async Task UpdateAuction_WithInvalidGuid_ReturnsNotFound()
    {
        // Arrange
        var updateAuctionDto = _fixture.Create<UpdateAuctionDto>();
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // Act
        var result = await _controller.UpdateAuction(Guid.NewGuid(), updateAuctionDto);

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithValidUser_ReturnsOkResponse()
    {
        // Arrange
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Seller = "test";
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);
        _auctionRepo.Setup(x => x.RemoveAuction(auction));
        _auctionRepo.Setup(x => x.SaveChangesAsync()).ReturnsAsync(true);

        // Act
        var result = await _controller.DeleteAuction(auction.Id);

        // Assert
        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidGuid_Returns404Response()
    {
        // Arrange
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(value: null);

        // Act
        var result = await _controller.DeleteAuction(Guid.NewGuid());

        // Assert
        Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task DeleteAuction_WithInvalidUser_Returns403Response()
    {
        // Arrange
        var auction = _fixture.Build<Auction>().Without(x => x.Item).Create();
        auction.Seller = "not-test";
        _auctionRepo.Setup(x => x.GetAuctionEntityByIdAsync(It.IsAny<Guid>()))
            .ReturnsAsync(auction);

        // Act
        var result = await _controller.DeleteAuction(auction.Id);

        // Assert
        Assert.IsType<ForbidResult>(result);
    }
}
