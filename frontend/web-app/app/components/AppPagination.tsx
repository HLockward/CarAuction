"use client";
import { Pagination } from "flowbite-react";
import { useState } from "react";

type Props = {
  currentPage: number;
  pageCount: number;
};

const AppPagination = ({ currentPage, pageCount }: Props) => {
  const [pageNumber, setPageNumber] = useState(currentPage);
  return (
    <Pagination
      currentPage={pageNumber}
      onPageChange={(page) => setPageNumber(page)}
      totalPages={pageCount}
      layout="pagination"
      showIcons={true}
      className="text-blue-500 mb-5"
    />
  );
};

export default AppPagination;
