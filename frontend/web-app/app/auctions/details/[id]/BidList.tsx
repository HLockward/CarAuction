"use client";

import { getBidForAuction } from "@/app/actions/auctionActions";
import Heading from "@/app/components/Heading";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, Bid } from "@/types";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BidItem from "./BidItem";

type Props = {
  auction: Auction;
  user: User | null | undefined;
};

const BidList = ({ user, auction }: Props) => {
  const [loading, setLoading] = useState(false);
  const bids = useBidStore((state) => state.bids);
  const setBids = useBidStore((state) => state.setBids);

  useEffect(() => {
    getBidForAuction(auction.id)
      .then((res: any) => {
        if (res.error) {
          throw res.error;
        }
        setBids(res as Bid[]);
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, [auction.id, setBids, setLoading]);

  if (loading) return <span>Loading bids...</span>;

  return (
    <div className="border-2 border-gray-100 rounded-lg p-2">
      <Heading title="Bids" />
      {bids.map((bid) => (
        <BidItem key={bid.id} bid={bid} />
      ))}
    </div>
  );
};

export default BidList;
