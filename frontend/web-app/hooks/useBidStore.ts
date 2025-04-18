import { Bid } from "@/types";
import { create } from "zustand";

type State = {
  bids: Bid[];
};

type Action = {
  setBids: (bids: Bid[]) => void;
  addBid: (bid: Bid) => void;
};

export const useBidStore = create<State & Action>((set) => ({
  bids: [],

  setBids: (bids) => set({ bids }),

  addBid: (bid) =>
    set((state) => ({
      bids: !state.bids.find((x) => x.id === bid.id)
        ? [bid, ...state.bids]
        : [...state.bids],
    })),
}));
