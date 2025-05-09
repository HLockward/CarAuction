"use client";

import { getBidForAuction } from "@/app/actions/auctionActions";
import EmptyPage from "@/app/components/EmptyPage";
import Heading from "@/app/components/Heading";
import { isHttpError } from "@/app/lib/httpErrorHelpers";
import { thousandsSeparatorFormat } from "@/app/lib/thousandsSeparatorFormat";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidForm from "./BidForm";
import BidItem from "./BidItem";

type Props = {
  auction: Auction;
  user: User | null | undefined;
};

const BidList = ({ user, auction }: Props) => {
  const [loading, setLoading] = useState(false);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);
  const open = useBidStore((state) => state.open);
  const setOpen = useBidStore((state) => state.setOpen);
  const openForBids = new Date(auction.auctionEnd) > new Date();

  const highBid = bids.reduce(
    (prev, current) =>
      prev > current.amount
        ? prev
        : current.bidStatus.includes("Accepted")
        ? current.amount
        : prev,
    0
  );

  useEffect(() => {
    getBidForAuction(auction.id)
      .then((res: unknown) => {
        if (isHttpError(res)) {
          throw res;
        }
        setBids(res as Bid[]);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setBids, setLoading]);

  useEffect(() => {
    setOpen(openForBids);
  }, [openForBids, setOpen]);

  if (loading) return <span>Loading bids...</span>;

  return (
    <div className="rounded-lg shadow-md">
      <div className="py-2 px-4 bg-white">
        <div className="sticky top-0 bg-white p-2">
          <Heading
            title={`Current high bid is $${thousandsSeparatorFormat(highBid)}`}
          />
        </div>
      </div>
      <div className="overflow-auto h-[300px] flex flex-col-reverse px-2">
        {bids.length === 0 ? (
          <EmptyPage
            type={"reset"}
            title="No bids for this item"
            subtitle="Please feel free to make a bid"
          />
        ) : (
          <>
            {bids.map((bid) => (
              <BidItem key={bid.id} bid={bid} />
            ))}
          </>
        )}
      </div>
      <div className="px-2 pb-2 text-gray-500">
        {!open ? (
          <div className="flex items-center justify-center p2 text-lg font-semibold">
            This auction has finished
          </div>
        ) : !user ? (
          <div className="flex items-center justify-center p2 text-lg font-semibold">
            Please login to place a bid
          </div>
        ) : user && user.username === auction.seller ? (
          <div className="flex items-center justify-center p2 text-lg font-semibold">
            You cannot bid on your own auction
          </div>
        ) : (
          <BidForm auctionId={auction.id} highBid={highBid} />
        )}
      </div>
    </div>
  );
};

export default BidList;
