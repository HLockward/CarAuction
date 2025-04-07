"use server";
import { auth } from "@/auth";
import { Auction, PageResult } from "../types";

export const getData = async (query: string): Promise<PageResult<Auction>> => {
  const response = await fetch(`http://localhost:6001/search${query}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
};

export const updateAuctionTest = async () => {
  const data = { mileage: 1000 };

  const session = await auth();

  const res = await fetch(
    "http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + session?.accessToken,
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) return { status: res.status, message: res.statusText };
  return res.statusText;
};
