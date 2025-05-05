"use client";
import { Button } from "flowbite-react";
import { useState } from "react";
import { updateAuctionTest } from "../actions/auctionActions";

const AuthTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

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
      {loading ? (
        <span className="text-sm text-gray-500">Loading...</span>
      ) : (
        <div>{JSON.stringify(result, null, 2)}</div>
      )}
    </div>
  );
};

export default AuthTest;
