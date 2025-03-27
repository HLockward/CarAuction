"use server";
import { Auction, PageResult } from "../types";

export async function getData(query: string): Promise<PageResult<Auction>> {
  const response = await fetch(`http://localhost:6001/search${query}`);
  if (!response.ok) throw new Error("Failed to fetch data");
  return response.json();
}
