"use client";

import { placeBidForAuction } from "@/app/actions/auctionActions";
import { isHttpError } from "@/app/lib/httpErrorHelpers";
import { thousandsSeparatorFormat } from "@/app/lib/thousandsSeparatorFormat";
import { useBidStore } from "@/hooks/useBidStore";
import { Bid } from "@/types";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  auctionId: string;
  highBid: number;
};

const BidForm = ({ auctionId, highBid }: Props) => {
  const { register, handleSubmit, reset } = useForm();

  const addBid = useBidStore((state) => state.addBid);

  const onSubmit = async (data: FieldValues) => {
    if (data.amount <= highBid) {
      reset();
      return toast.error(
        `Bid must be higher than the current high bid of $${thousandsSeparatorFormat(
          highBid + 1
        )}`
      );
    }
    placeBidForAuction(auctionId, +data.amount)
      .then((bid: unknown) => {
        if (isHttpError(bid)) {
          throw bid;
        }

        addBid(bid as Bid);
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
