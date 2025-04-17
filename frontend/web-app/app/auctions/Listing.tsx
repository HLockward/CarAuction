"use client";
import { useAuctionStore } from "@/hooks/useAuctionStore";
import { useParamsStore } from "@/hooks/useParamsStore";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";
import { getData } from "../actions/auctionActions";
import AppPagination from "../components/AppPagination";
import EmptyFilter from "../components/EmptyPage";
import AuctionCard from "./AuctionCard";
import Filters from "./Filters";

const Listing = () => {
  const [loading, setLoading] = useState(true);
  const params = useParamsStore(
    useShallow((state) => ({
      pageNumber: state.pageNumber,
      pageSize: state.pageSize,
      searchTerm: state.searchTerm,
      orderBy: state.orderBy,
      FilterBy: state.filterBy,
      seller: state.seller,
      winner: state.winner,
    }))
  );
  const data = useAuctionStore(
    useShallow((state) => ({
      auctions: state.auctions,
      totalCount: state.totalCount,
      pageCount: state.pageCount,
    }))
  );
  const setData = useAuctionStore((state) => state.setData);

  const setParams = useParamsStore((state) => state.setParams);
  const url = queryString.stringifyUrl({ url: "", query: params });

  const setPageNumber = (pageNumber: number) => setParams({ pageNumber });

  useEffect(() => {
    getData(url).then((data) => {
      setData(data);
      setLoading(false);
    });
  }, [url]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Filters />
      {data.totalCount === 0 ? (
        <EmptyFilter type="reset" />
      ) : (
        <>
          <div className="grid grid-cols-4 gap-6">
            {data.auctions.map((auction) => (
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
      )}
    </>
  );
};

export default Listing;
