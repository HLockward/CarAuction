"use client";
import { Button } from "flowbite-react";
import { useState } from "react";
import { updateAuctionTest } from "../actions/auctionActions";

const AuthTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>();

  const doUpdate = () => {
    setResult(undefined);
    setLoading(true);
    updateAuctionTest()
      .then((res) => setResult(res))
      .catch((err) => setResult(err))
      .finally(() => setLoading(false));
  };
  return (
    <div className="flex items-center gap-4">
      <Button outline onClick={doUpdate}>
        Test auth
      </Button>
      <div>{JSON.stringify(result, null, 2)}</div>
    </div>
  );
};

export default AuthTest;
