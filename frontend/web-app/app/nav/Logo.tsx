"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { FaCar } from "react-icons/fa";

const Logo = () => {
  const reset = useParamsStore((state) => state.reset);
  return (
    <div
      onClick={reset}
      className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500"
    >
      <FaCar size={30} />
      <div>Car Auction</div>
    </div>
  );
};

export default Logo;
