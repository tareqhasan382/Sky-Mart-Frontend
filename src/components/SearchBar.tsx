import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { searchfilter } from "../redux/api/filterSlice";
const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <div className=" flex items-center bg-gray-200 p-2 rounded-md px-6 mx-6  ">
      {/* max-md:hidden  */}
      <button>
        <CiSearch size={20} className="  " />
      </button>
      <input
        type="text"
        className=" w-full outline-none bg-transparent ml-2 caret-black placeholder:font-light placeholder:text-gray-600 text-[15px]  "
        placeholder="Search "
        autoComplete="false"
        onChange={(e) => dispatch(searchfilter(e.target.value))}
      />
    </div>
  );
};

export default SearchBar;
