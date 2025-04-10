import { getDetailedViewData } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import CarImage from "../../CarImage";
import CountdownTimer from "../../CountdownTimer";
import DetailedSpecs from "./DetailedSpecs";

const Details = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const auction = await getDetailedViewData(id);
  return (
    <div>
      <div className="flex justify-between">
        <Heading title={`${auction.make} ${auction.model}`} />
        <div className="flex gap-3">
          <h3 className="text-2xl font-semibold">Time remaining:</h3>
          <CountdownTimer endDate={auction.auctionEnd} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-3">
        <div className="w-full bg-gray-200 rounded-lg overflow-hidden relative aspect-[4/3]">
          <CarImage {...auction} />
        </div>

        <div className="border-2 border-gray-100 rounded-lg p-2">
          <Heading title="Bids" />
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 rounded-lg">
        <DetailedSpecs auction={auction} />
      </div>
    </div>
  );
};

export default Details;
