import { Auction, PageResult } from "@/types";
import { create } from "zustand";

type State = {
  auctions: Auction[];
  totalCount: number;
  pageCount: number;
};

type Action = {
  setData: (data: PageResult<Auction>) => void;
  setCurrentPrice: (auctionId: string, amount: number) => void;
};

const initialState: State = {
  auctions: [],
  totalCount: 0,
  pageCount: 0,
};

export const useAuctionStore = create<State & Action>((set) => ({
  ...initialState,
  setData: (data: PageResult<Auction>) => {
    set({
      auctions: data.result,
      totalCount: data.totalCount,
      pageCount: data.pageCount,
    });
  },
  setCurrentPrice: (auctionId: string, amount: number) => {
    set((state) => ({
      auctions: state.auctions.map((auction) =>
        auction.id === auctionId
          ? { ...auction, currentHighBid: amount }
          : auction
      ),
    }));
  },
}));
