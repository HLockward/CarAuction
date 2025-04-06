"use client";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";

type Props = {
  redirectTo?: string;
  promptTo?: string;
};

const LoginButton = ({ redirectTo = "/ ", promptTo = "login" }: Props) => {
  return (
    <Button
      outline
      onClick={() => signIn("id-server", { redirectTo }, { prompt: promptTo })}
    >
      Login
    </Button>
  );
};

export default LoginButton;
