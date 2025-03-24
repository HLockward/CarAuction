import { Auction, PageResult } from "../types";
import AuctionCard from "./AuctionCard";

async function getData(): Promise<PageResult<Auction>> {
  const response = await fetch("http://localhost:6001/search?pageSize=10");
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
}
async function Listing() {
  const data = await getData();

  return (
    <div className="grid grid-cols-4 gap-6">
      {data &&
        data.result.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
    </div>
  );
}

export default Listing;
