"use client";
import Image from "next/image";
import { Auction } from "../types";
import { useState } from "react";

const CarImage = (auction: Auction) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      src={auction.imageUrl}
      alt={`Image of ${auction.make}  ${auction.model} in ${auction.color}`}
      fill
      priority
      className={`object-cover group-hover:opacity-75 duration-700 ease-in-out 
        ${
          isLoading
            ? "grayscale blur-2xl scale-110"
            : "grayscale-0 blur-0 scale-100"
        }
        `}
      sizes="(max-width: 780px) 100vw, (max-width: 1200px) 50vw, 25vw"
      onLoad={() => setLoading(false)}
    />
  );
};

export default CarImage;
