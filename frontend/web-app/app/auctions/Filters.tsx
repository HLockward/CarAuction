"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";

const pageSizeOptions = [4, 8, 12];

const Filters = () => {
  const setPageSize = useParamsStore((state) => state.setParams);
  const pageSize = useParamsStore((state) => state.pageSize);
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
        <ButtonGroup>
          {pageSizeOptions.map((value, i) => (
            <Button
              key={i}
              onClick={() => setPageSize({ pageSize: value })}
              color={`${pageSize === value ? "red" : "gray"}`}
              className="focus:ring-0"
            >
              {value}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Filters;
