"use server";
import { fetchWrapper } from "@/app/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { Auction, Bid, PageResult } from "../../types";

export const getData = async (query: string): Promise<PageResult<Auction>> => {
  return await fetchWrapper.get(`search${query}`);
};

export const createAuction = async (data: FieldValues) => {
  return await fetchWrapper.post("auctions", data);
};

export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`auctions/${id}`);
};

export const updateAuction = async (data: FieldValues, id: string) => {
  return await fetchWrapper.put(`auctions/${id}`, data);
};

export const deleteAuction = async (id: string) => {
  return await fetchWrapper.del(`auctions/${id}`);
};

export const getBidForAuction = async (id: string): Promise<Bid[]> => {
  return await fetchWrapper.get(`bids/${id}`);
};

export const placeBidForAuction = async (
  auctionId: string,
  amount: number
): Promise<Bid> => {
  return await fetchWrapper.post(
    `bids?auctionId=${auctionId}&amount=${amount}`,
    {}
  );
};

export const updateAuctionTest = async () => {
  const data = { mileage: 1000 };

  return await fetchWrapper.put(
    "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    data
  );
};
