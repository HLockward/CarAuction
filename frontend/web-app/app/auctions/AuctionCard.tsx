import CountdownTimer from "./CountdownTimer";
import { Auction } from "../types";
import CarImage from "./CarImage";

type Props = {
  auction: Auction;
};

function AuctionCard({ auction }: Props) {
  return (
    <a href="#" className="group">
      <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
        <CarImage {...auction} />
        <div className="absolute bottom-2 left-2">
          <CountdownTimer endDate={auction.auctionEnd} />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-gray-700">
          {auction.make} {auction.model}
        </h3>
        <p className="font-semibold text-sm">{auction.year}</p>
      </div>
    </a>
  );
}

export default AuctionCard;
