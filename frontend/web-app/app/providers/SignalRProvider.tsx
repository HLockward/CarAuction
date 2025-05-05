"use client";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useBidStore } from "@/hooks/useBidStore";
import { Auction, AuctionFinished, Bid } from "@/types";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { User } from "next-auth";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { getDetailedViewData } from "../actions/auctionActions";
import AuctionCreatedToast from "../components/AuctionCreatedToast";
import AuctionFinishedToast from "../components/AuctionFinishedToast";

type Props = {
  children: React.ReactNode;
  user: User | null | undefined;
  notifyUrl: string;
};

const SignalRProvider = ({ children, user, notifyUrl }: Props) => {
  const connection = useRef<HubConnection | null>(null);
  const setCurrentPrice = useAuctionStore((state) => state.setCurrentPrice);
  const addBid = useBidStore((state) => state.addBid);
  const params = useParams<{ id: string }>();

  const handleAuctionFinished = useCallback(
    (auctionFinished: AuctionFinished) => {
      const auction = getDetailedViewData(auctionFinished.auctionId);
      return toast.promise(
        auction,
        {
          loading: "Loading",
          success: (auction) => (
            <AuctionFinishedToast
              auction={auction}
              finishedAuction={auctionFinished}
            />
          ),
          error: () => "Auction finished",
        },
        {
          success: {
            duration: 10000,
            icon: null,
          },
        }
      );
    },
    []
  );

  const handleAuctionCreated = useCallback(
    (auction: Auction) => {
      if (auction.seller !== user?.username) {
        return toast(<AuctionCreatedToast auction={auction} />, {
          duration: 10000,
        });
      }
    },
    [user?.username]
  );

  const handleBidPlaced = useCallback(
    (bid: Bid) => {
      if (bid.bidStatus.includes("Accepted")) {
        setCurrentPrice(bid.auctionId, bid.amount);
      }

      if (bid.auctionId === params.id) {
        addBid(bid);
      }
    },
    [setCurrentPrice, addBid, params.id]
  );

  useEffect(() => {
    if (!connection.current) {
      connection.current = new HubConnectionBuilder()
        .withUrl(notifyUrl)
        .withAutomaticReconnect()
        .build();

      connection.current
        .start()
        .then(() => {
          console.log("SignalR connection established with connection hub");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    connection.current.on("BidPlaced", handleBidPlaced);
    connection.current.on("AuctionCreated", handleAuctionCreated);
    connection.current.on("AuctionFinished", handleAuctionFinished);

    return () => {
      connection.current?.off("BidPlaced", handleBidPlaced);
      connection.current?.off("AuctionCreated", handleAuctionCreated);
      connection.current?.off("AuctionFinished", handleAuctionFinished);
    };
  }, [handleBidPlaced, handleAuctionCreated, handleAuctionFinished, notifyUrl]);
  return children;
};

export default SignalRProvider;
