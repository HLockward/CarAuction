import { Button } from "flowbite-react";
import Link from "next/link";

const EditButton = ({ id }: { id: string }) => {
  return (
    <Button outline>
      <Link href={`/auctions/update/${id}`}>Update Auction</Link>
    </Button>
  );
};

export default EditButton;
