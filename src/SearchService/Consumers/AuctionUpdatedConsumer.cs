using AutoMapper;
using Contracts;
using MassTransit;
using MongoDB.Entities;
using SearchService.Models;

namespace SearchService.Consumers;

public class AuctionUpdatedConsumer : IConsumer<AuctionUpdated>
{
    private readonly IMapper _mapper;

    public AuctionUpdatedConsumer(IMapper mapper)
    {
        _mapper = mapper;
    }
    public async Task Consume(ConsumeContext<AuctionUpdated> context)
    {
        Console.WriteLine("---> Consumer auction updated: " + context.Message.Id);

        var MessageItem = _mapper.Map<Item>(context.Message);

        var result = await DB.Update<Item>()
            .MatchID(context.Message.Id)
            .ModifyOnly(x => new { x.Make, x.Model, x.Color, x.Mileage, x.Year }, MessageItem)
            .ExecuteAsync();

        if (!result.IsAcknowledged)
            throw new MessageException(typeof(AuctionUpdated), "Problem updating auction");

    }
}
