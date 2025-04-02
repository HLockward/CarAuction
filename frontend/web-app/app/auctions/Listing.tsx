"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import { Auction, PageResult } from "../types";
import AuctionCard from "./AuctionCard";
import Filters from "./Filters";

const Listing = () => {
  const [data, setData] = useState<PageResult<Auction>>();
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      FilterBy: state.filterBy,
    }))
  );
  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({ url: "", query: params });

  const setPageNumber = (pageNumber: number) => setParams({ pageNumber });

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
    });
  }, [url]);

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <Filters />
      <div className="grid grid-cols-4 gap-6">
        {data.result.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <AppPagination
          currentPage={params.pageNumber}
          pageCount={data.pageCount}
          pageChanged={setPageNumber}
        />
      </div>
    </>
  );
};

export default Listing;
