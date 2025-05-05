"use client";

import { deleteAuction } from "@/app/actions/auctionActions";
import { isHttpError } from "@/app/lib/httpErrorHelpers";
import { Button, Spinner } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteButton = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDelete = () => {
    setIsLoading(true);
    deleteAuction(id)
      .then((res) => {
        if (res.error) {
          throw res.error;
        }
        router.push("/");
      })
      .catch((error: unknown) => {
        if (isHttpError(error)) toast(`${error.status} ${error.message}`);
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <Button color="red" onClick={handleDelete}>
      {isLoading ? (
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
        "Delete Auction"
      )}
    </Button>
  );
};

export default DeleteButton;
