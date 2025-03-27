"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const setParams = useParamsStore((state) => state.setParams);
  const [value, setValue] = useState("");

  const onChange = (event: any) => setValue(event.target.value);
  const search = () => setParams({ searchTerm: value });
  return (
    <div className="flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm">
      <input
        onKeyDown={(e: any) => {
          if (e.key === "Enter") search();
        }}
        onChange={onChange}
        type="text"
        placeholder="Search car by make, model or color"
        className="flex-grow pl-5 bg-transparent 
            focus:outline-none border-transparent 
            focus:border-transparent focus:ring-0
            text-sm text-gray-600"
      />
      <button>
        <FaSearch
          onClick={search}
          size={34}
          className="bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2"
        />
      </button>
    </div>
  );
};

export default Search;
