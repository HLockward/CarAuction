"use server";
import { fetchWrapper } from "@/lib/fetchWrapper";
import { FieldValues } from "react-hook-form";
import { Auction, PageResult } from "../types";

export const getData = async (query: string): Promise<PageResult<Auction>> => {
  return await fetchWrapper.get(`search${query}`);
};

export const createAuction = async (data: FieldValues) => {
  return await fetchWrapper.post("auctions", data);
};

export const getDetailedViewData = async (id: string): Promise<Auction> => {
  return await fetchWrapper.get(`auctions/${id}`);
};

export const updateAuctionTest = async () => {
  const data = { mileage: 1000 };

  return await fetchWrapper.put(
    "auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    data
  );
};
