"use client";
import { useEffect, useState } from "react";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import { Auction } from "../types";
import AuctionCard from "./AuctionCard";
import Filters from "./Filters";

const Listing = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    getData(pageNumber, pageSize).then((data) => {
      setAuctions(data.result);
      setPageCount(data.pageCount);
    });
  }, [pageNumber, pageSize]);

  if (auctions.length === 0) return <div>Loading...</div>;

  return (
    <>
      <Filters pageSize={pageSize} setPageSize={setPageSize} />
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
