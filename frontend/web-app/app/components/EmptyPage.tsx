"use client";
import { useParamsStore } from "@/hooks/useParamsStore";
import { Button } from "flowbite-react";
import Heading from "./Heading";
import LoginButton from "./LoginButton";

type Props = {
  title?: string;
  subtitle?: string;
  type: "reset" | "login";
  callbackURl?: string;
};

const EmptyPage = ({
  title = "No matches for this filter",
  subtitle = "Try changing or resetting the filters",
  type,
  callbackURl,
}: Props) => {
  const reset = useParamsStore((state) => state.reset);

  return (
    <div className="h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg">
      <Heading title={title} subtitle={subtitle} center />
      <div className="mt-4">
        {type === "reset" && (
          <Button outline onClick={reset}>
            Remove Filters
          </Button>
        )}
        {type === "login" && (
          <LoginButton redirectTo={callbackURl} promptTo="" />
        )}
      </div>
    </div>
  );
};

export default EmptyPage;
