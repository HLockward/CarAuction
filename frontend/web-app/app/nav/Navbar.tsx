import { getCurrentUser } from "../actions/authActions";
import LoginButton from "../components/LoginButton";
import Logo from "./Logo";
import Search from "./Search";
import UserActions from "./UserActions";

const Navbar = async () => {
  const user = await getCurrentUser();
  return (
    <header
      className="sticky top-0 z-50 flex justify-between
         bg-white shadow-md p-5 items-center text-gray-800"
    >
      <Logo />
      <Search />
      {user ? <UserActions user={user} /> : <LoginButton />}
    </header>
  );
};

export default Navbar;
