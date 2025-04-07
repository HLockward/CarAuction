"use client";
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiFillCar, AiFillTrophy, AiOutlineLogout } from "react-icons/ai";
import { HiUser } from "react-icons/hi";
import { HiCog } from "react-icons/hi2";

type Props = {
  user: User;
};

const UserActions = ({ user }: Props) => {
  const router = useRouter();
  return (
    <Dropdown inline label={`welcome ${user.name}`}>
      <DropdownItem icon={HiUser}>
        <Link href="/">My Auctions</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillTrophy}>
        <Link href="/">Auctions won</Link>
      </DropdownItem>
      <DropdownItem icon={AiFillCar}>
        <Link href="/auctions/create">Sell my car</Link>
      </DropdownItem>
      <DropdownItem icon={HiCog}>
        <Link href="/session">Session (dev only!)</Link>
      </DropdownItem>
      <DropdownDivider />
      <DropdownItem
        icon={AiOutlineLogout}
        onClick={() => signOut({ redirectTo: "/" })}
      >
        Sign out
      </DropdownItem>
    </Dropdown>
  );
};

export default UserActions;
