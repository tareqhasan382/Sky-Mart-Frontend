import { useState } from "react";
// import SearchBar from "./SearchBar";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaCircleUser } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { BiSolidUpArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { isLoggedIn, removeUserInfo } from "../utils/local-storage";
import { authKey } from "../constant/storageKey";
import { toast } from "react-toastify";
const Navbar = () => {
  const [showProfile, setShowProfile] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);

  const isLogged = isLoggedIn();
  const handleLogout = () => {
    if (isLogged) {
      removeUserInfo(authKey);
      toast.success("User logged out successfully");
      window.location.reload();
    }
  };
  // const handleLogout = () => {
  //   removeUserInfo(authKey);
  //   toast.success("user Logout successfully");
  //    window.location.reload(true);
  // };
  return (
    <div className="px-5 max-w-[1280px] mx-auto">
      <div className="flex items-center justify-between py-4 relative  ">
        <div className="flex items-center md:space-x-10 lg:space-x-20">
          <div className="font-semibold text-2xl">
            <Link to="/" className=" text-3xl font-bold ">
              Sky Mart
            </Link>
          </div>
          <nav className="max-md:hidden">
            <ul className="flex items-center lg:space-x-10 space-x-7 opacity-70 text-[15px]">
              <li>
                <Link to="/" className="py-3 inline-block w-full">
                  Feature
                </Link>
              </li>
              <li>
                <Link to="/addProduct" className="py-3 inline-block w-full">
                  Add Product
                </Link>
              </li>
              <li>
                <Link to="" className="py-3 inline-block w-full">
                  My Profile
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {/* <SearchBar /> */}
          <div
            onClick={() => setShowProfile(!showProfile)}
            className="relative cursor-pointer"
          >
            <FaCircleUser size={30} />
            <div
              className={`absolute bg-white z-[2] rounded-lg shadow-lg ${
                showProfile ? "" : "hidden"
              }`}
            >
              {isLogged ? (
                <>
                  <div className=" p-4 ">
                    <button className=" py-2 hover:text-blue-400 duration-300 ">
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <Link to="/cart">
            <div className="p-2 bg-gray-100 rounded-full">
              <MdOutlineShoppingCart size={20} />
            </div>
          </Link>

          {/* <Link href="/signin">
            <div className="p-2 bg-gray-100 rounded-full">
              <MdOutlineShoppingCart size={20} />
            </div>
          </Link> */}

          <span
            onClick={() => setShowNav(!showNav)}
            className="p-[9px] bg-gray-100 rounded-full md:hidden"
          >
            <BiSolidUpArrow
              className={`transition ease-in duration-150 ${
                showNav ? "rotate-180" : "0"
              }`}
            />
          </span>
        </div>
      </div>
      <div
        className={`md:hidden ${
          showNav
            ? "pb-4 px-5 bg-slate-300 rounded-lg "
            : "h-0 invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col text-[15px] opacity-75 px-2 ">
          <li>
            <Link to="/" className="py-3 inline-block w-full ">
              Feature
            </Link>
          </li>
          <li>
            <Link to="/addProduct" className="py-3 inline-block w-full ">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/" className="py-3 inline-block w-full ">
              My Profile
            </Link>
          </li>
        </ul>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg my-4 py-3">
          <input
            type="text"
            className="outline-none w-full bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]"
            placeholder="Search"
            autoComplete="false"
          />
          <button>
            <CiSearch size={20} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
