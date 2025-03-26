"use client";
import { useEffect, useState } from "react";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import { Auction } from "../types";
import AuctionCard from "./AuctionCard";

const Listing = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    getData(pageNumber).then((data) => {
      setAuctions(data.result);
      setPageCount(data.pageCount);
    });
  }, [pageNumber]);

  if (auctions.length === 0) return <div>Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-4 gap-6">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={pageNumber}
          pageCount={pageCount}
          pageChanged={setPageNumber}
        />
      </div>
    </>
  );
};

export default Listing;
