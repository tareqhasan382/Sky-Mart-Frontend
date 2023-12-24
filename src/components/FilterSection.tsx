import { useDispatch } from "react-redux";
import { tagSelect } from "../redux/api/filterSlice";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
const FilterSection = () => {
  const dispatch = useDispatch();
  const { tags } = useAppSelector((state: RootState) => state.filter);

  return (
    <div className=" px-2 h-auto  ">
      <div className="flex flex-wrap gap-2 py-3 ">
        <button
          onClick={() => dispatch(tagSelect(""))}
          className={`${
            tags === "" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          All
        </button>
        <button
          onClick={() => dispatch(tagSelect("clot"))}
          className={`${
            tags === "clot" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          Cloth
        </button>
        <button
          onClick={() => dispatch(tagSelect("T-shirt"))}
          className={`${
            tags === "T-shirt" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          T-shirt
        </button>
        <button
          onClick={() => dispatch(tagSelect("Pant"))}
          className={`${
            tags === "Pant" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          Pant
        </button>
        <button
          onClick={() => dispatch(tagSelect("Kids"))}
          className={`${
            tags === "Kids" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          Kids
        </button>
        <button
          onClick={() => dispatch(tagSelect("Hijab"))}
          className={`${
            tags === "Hijab" && "bg-blue-500"
          }  px-4 py-2 text-sm outline outline-1 hover:bg-blue-500 hover:text-white duration-300 outline-violet-300 rounded-full `}
        >
          Hijab
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
