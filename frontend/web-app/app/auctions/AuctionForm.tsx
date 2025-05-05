"use client";

import { Button, Spinner } from "flowbite-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Auction } from "../../types";
import { createAuction, updateAuction } from "../actions/auctionActions";
import DateInput from "../components/DateInput";
import Input from "../components/Input";
import { isHttpError } from "../lib/httpErrorHelpers";

const AuctionForm = ({ auction }: { auction?: Auction }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isCreate = pathname === "/auctions/create";
  const {
    control,
    handleSubmit,
    setFocus,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (auction) {
      reset({
        make: auction.make,
        model: auction.model,
        color: auction.color,
        year: auction.year,
        mileage: auction.mileage,
      });
    }
    setFocus("make");
  }, [setFocus, reset, auction]);

  const onSubmit = async (data: FieldValues) => {
    try {
      let id = "";
      let res;
      if (isCreate) {
        res = await createAuction(data);
        id = res.id;
      } else {
        if (auction) {
          id = auction.id;
          res = await updateAuction(data, id);
        }
      }

      if (res.error) {
        throw res.error;
      }
      router.push("/auctions/details/" + id);
    } catch (error: unknown) {
      if (isHttpError(error)) {
        toast.error(`${error.status} ${error.message}`);
      }
    }
  };

  return (
    <form className="flex flex-col mt-3" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Make"
        name="make"
        control={control}
        rules={{ required: "Make is required" }}
      />
      <Input
        label="Model"
        name="model"
        control={control}
        rules={{ required: "Model is required" }}
      />
      <Input
        label="Color"
        name="color"
        control={control}
        rules={{ required: "Color is required" }}
      />

      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Year"
          name="year"
          type="number"
          control={control}
          rules={{ required: "Year is required" }}
        />
        <Input
          label="Mileage"
          name="mileage"
          type="number"
          control={control}
          rules={{ required: "Mileage is required" }}
        />
      </div>

      {isCreate && (
        <>
          <Input
            label="Image URL"
            name="imageUrl"
            control={control}
            rules={{ required: "Image URL is required" }}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Reserve Price (enter 0 if no reserve)"
              name="reservePrice"
              type="number"
              control={control}
              rules={{ required: "Reserve price is required" }}
            />
            <DateInput
              label="Auction end date/time"
              name="auctionEnd"
              dateFormat={"dd MMMM yyyy h:mm a"}
              showTimeSelect
              control={control}
              rules={{ required: "Auction end date is required" }}
            />
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button outline color="gray">
          Cancel
        </Button>
        <Button disabled={!isValid} outline type="submit">
          {isSubmitting ? (
            <>
              <Spinner
                size="sm"
                aria-label="Info spinner example"
                className="me-3"
                light
              />
              Loading...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AuctionForm;
