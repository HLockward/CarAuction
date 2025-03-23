import { FaCar } from "react-icons/fa";

function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 flex justify-between
         bg-white shadow-md p-5 items-center text-gray-800"
    >
      <div className="flex items-center gap-2 text-3xl font-semibold text-red-500">
        <FaCar size={30} />
        <div>Car Auction</div>
      </div>
      <div>search</div>
      <div>login</div>
    </header>
  );
}

export default Navbar;
