"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Button, ButtonGroup } from "flowbite-react";
import { IconType } from "react-icons";
import { AiOutlineClockCircle, AiOutlineSortAscending } from "react-icons/ai";
import { BsFillStopCircleFill, BsStopwatchFill } from "react-icons/bs";
import { GiFinishLine, GiFlame } from "react-icons/gi";
import { useShallow } from "zustand/shallow";
import FilterBy from "./FilterBy";

type Buttons = { label: string; icon: IconType; value: string }[];

const pageSizeOptions = [4, 8, 12];

const orderButtons: Buttons = [
  {
    label: "Alphabetical",
    icon: AiOutlineSortAscending,
    value: "make",
  },
  {
    label: "End date",
    icon: AiOutlineClockCircle,
    value: "endingSoon",
  },
  {
    label: "Recently added",
    icon: BsFillStopCircleFill,
    value: "new",
  },
];

const filterButtons: Buttons = [
  {
    label: "Live Auctions",
    icon: GiFlame,
    value: "live",
  },
  {
    label: "Ending < 6 hours",
    icon: GiFinishLine,
    value: "endingSoon",
  },
  {
    label: "Completed",
    icon: BsStopwatchFill,
    value: "finished",
  },
];

const Filters = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const params = useParamsStore(
    useShallow((state) => ({
      pageSize: state.pageSize,
      filterBy: state.filterBy,
      orderBy: state.orderBy,
    }))
  );
  const { pageSize, orderBy, filterBy } = params;

  const setPageSize = (value: number) => setParams({ pageSize: value });
  const setOrderByParams = (value: string) => setParams({ orderBy: value });
  const setFilterByParams = (value: string) => setParams({ filterBy: value });

  return (
    <div className="flex justify-between items-center mb-4">
      <FilterBy
        buttons={filterButtons}
        value={filterBy}
        setParams={setFilterByParams}
        label="Filter by"
      />
      <FilterBy
        buttons={orderButtons}
        value={orderBy}
        setParams={setOrderByParams}
        label="Order by"
      />
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
        <ButtonGroup>
          {pageSizeOptions.map((value, i) => (
            <Button
              key={i}
              onClick={() => setPageSize(value)}
              color={`${pageSize === value ? "red" : "gray"}`}
              className="focus:ring-0"
              size="sm"
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
