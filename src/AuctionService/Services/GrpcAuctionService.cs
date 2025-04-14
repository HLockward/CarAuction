using AuctionService.Data;
using Grpc.Core;

namespace AuctionService.Services;

public class GrpcAuctionService(AuctionDbContext dbContext) : GrpcAuction.GrpcAuctionBase
{
    private readonly AuctionDbContext _dbContext = dbContext;

    public override async Task<GrpcAuctionResponse> GetAuction(GetAuctionRequest request,
    ServerCallContext context)
    {
        Console.WriteLine("==> Received Grpc request for auction");

        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(request.Id))
            ?? throw new RpcException(new Status(StatusCode.NotFound, "Auction not found"));

        var response = new GrpcAuctionModel
        {
            Id = auction.Id.ToString(),
            AuctionEnd = auction.AuctionEnd.ToString(),
            Seller = auction.Seller.ToString(),
            ReservePrice = auction.ReservePrice
        };

        return new GrpcAuctionResponse
        {
            Auction = response
        };
    }
}
