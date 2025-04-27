"use client";

import { placeBidForAuction } from "@/app/actions/auctionActions";
import { thousandsSeparatorFormat } from "@/app/lib/thousandsSeparatorFormat";
import { useBidStore } from "@/hooks/useBidStore";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

const BidForm = ({ auctionId, highBid }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const addBid = useBidStore((state) => state.addBid);

  const onSubmit = async (data: FieldValues) => {
    placeBidForAuction(auctionId, +data.amount)
      .then((bid: any) => {
        if (bid.error) throw bid.error;

        addBid(bid);
        reset();
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center border-2 rounded-lg py-2"
    >
      <input
        type="number"
        {...register("amount")}
        className="flex-grow pl-5 bg-transparent 
            focus:outline-none border-transparent 
            focus:border-transparent focus:ring-0 text-sm text-gray-600"
        placeholder={`Enter your bid (minimun bid is $${thousandsSeparatorFormat(
          highBid + 1
        )}`}
      />
    </form>
  );
};

export default BidForm;
