import LoginButton from "./LoginButton";
import Logo from "./Logo";
import Search from "./Search";

function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 flex justify-between
         bg-white shadow-md p-5 items-center text-gray-800"
    >
      <Logo />
      <Search />
      <LoginButton />
    </header>
  );
}

export default Navbar;
