/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApi";
import {
  minPrixe,
  maxPrixe,
  selectSortField,
  selectSortOrder,
} from "../redux/api/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Product: React.FC = () => {
  // page, limit, search, filterField, sortOrder, sortField  ||  color, size, price, name, sortOrder, sortField,
  const dispatch = useDispatch();
  // ?sortField=date&sortOrder=-1
  const query: Record<string, any> = {};
  const { tags, size, color, maxPrice, minPrice, sortField, sortOrder } =
    useSelector((state: RootState) => state.filter);
  // query["name"] = search;
  query["name"] = tags;
  query["color"] = color;
  query["size"] = size;
  query["minPrice"] = minPrice;
  query["maxPrice"] = maxPrice;
  query["sortBy"] = sortField;
  query["sortOrder"] = sortOrder;
  // ?sortBy=price&sortOrder=-1
  const { data, isLoading } = useGetProductsQuery({ ...query });
  const products = data?.data;
  //console.log("data count:", products?.length);
  console.log("products:", products);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = e.target.value;
    dispatch(selectSortField("price"));
    dispatch(selectSortOrder(selectedSortOption));
  };
  // (selectedSortOption);
  return (
    <div className=" bg-gray-100 px-1 lg:flex gap:[1%] justify-between h-full rounded-md ">
      <div className=" lg:w-[18%]  ">
        <div className=" px-1 hidden md:block ">
          {/* sort by */}
          <div className=" py-2 ">
            <label htmlFor="sort" className="font-semibold">
              Sort By
            </label>
            <select
              onChange={handleSortChange}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline cursor-pointer "
              id="sort"
            >
              <option value="" className=" cursor-pointer ">
                Default{" "}
              </option>
              <option value="asc" className=" cursor-pointer ">
                Price (Low to High)
              </option>
              <option value="desc" className=" cursor-pointer ">
                Price (Hign to Low)
              </option>
            </select>
          </div>
          <h3 className=" font-semibold ">Price Range</h3>
          {/* price Range */}
          <div className=" flex gap-2 items-center py-2 ">
            <input
              type="number"
              onChange={(e) => dispatch(minPrixe(Number(e.target.value)))}
              placeholder="min"
              defaultValue={minPrice}
              className=" p-2 w-[80px] rounded "
            />
            <p className=" text-xl font-bold ">-</p>
            <input
              type="number"
              placeholder="max"
              defaultValue={maxPrice}
              onChange={(e) => dispatch(maxPrixe(Number(e.target.value)))}
              className=" p-2 w-[80px] rounded "
            />
          </div>

          {/* Internal Storage */}
          <div className=" py-2 ">
            <label htmlFor="memor" className="font-semibold py-2 ">
              Color
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="memorySize"
            >
              <option value="">Default</option>
            </select>
          </div>
          {/* Battery */}
          <div className=" py-2 ">
            <label htmlFor="battery" className="font-semibold py-2 ">
              Size
            </label>
            <select
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
              id="memorySize"
            >
              <option value="">Default</option>
            </select>
          </div>
        </div>
        <details className=" px-1 md:hidden transition duration-150 ease-in ">
          <summary>Sort and Filtering</summary>
          <div className=" flex gap-2 ">
            {/* sort by */}
            <div className=" py-2 ">
              <label htmlFor="sort" className="font-semibold">
                Sort By
              </label>
              <select
                onChange={handleSortChange}
                className="block appearance-none  lg:w-full w-[70px] bg-white border border-gray-300 text-gray-700 py-2 px-1  rounded leading-tight focus:outline-none focus:shadow-outline"
                id="sort"
              >
                <option value="">Default</option>
                <option value="asc">Price (Low to High)</option>
                <option value="desc">Price (Hign to Low)</option>
              </select>
            </div>
            <div>
              <h3 className=" font-semibold ">Price Range</h3>
              {/* price Range */}
              <div className=" flex gap-2 items-center py-2 ">
                <input
                  type="number"
                  placeholder="min"
                  onChange={(e) => dispatch(minPrixe(Number(e.target.value)))}
                  defaultValue={minPrice}
                  className=" p-1 w-[80px] rounded outline outline-1 outline-gray-400  "
                />
                <p className=" text-xl font-bold ">-</p>
                <input
                  type="number"
                  placeholder="max"
                  onChange={(e) => dispatch(maxPrixe(Number(e.target.value)))}
                  defaultValue={maxPrice}
                  className=" p-1 w-[100px] rounded outline outline-1 outline-gray-400 "
                />
              </div>
            </div>
          </div>
          <div className=" flex gap-3 items-center ">
            {/* ram */}
            <div>
              <label htmlFor="ram" className="font-semibold py-2 ">
                Size
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                id="ram"
              >
                <option value="">Default</option>
              </select>
            </div>
            {/* Internal Storage */}
            <div className=" py-2 ">
              <label htmlFor="memor" className="font-semibold py-2 ">
                Color
              </label>
              <select
                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
                id="memorySize"
              >
                <option value="">Default</option>
              </select>
            </div>
          </div>
          {/* Battery */}
        </details>
      </div>
      <div className=" lg:w-[81%] gap-3 ">
        {isLoading && (
          <div className=" w-full h-full ">
            <h1 className=" text-2xl font-bold text-center  ">Loding...</h1>
          </div>
        )}

        {/*   */}
        <div className=" w-full grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 xsm:grid-clos-1 my-2 gap-3 ">
          {products?.length <= 0 && (
            <div className=" w-full h-full ">
              <h1 className=" text-2xl font-bold text-center items-center justify-center mt-10 ">
                Unavailable Products
              </h1>
            </div>
          )}
          {!isLoading &&
            products?.map((item: any) => (
              <div
                key={item?._id}
                className=" hover:shadow-lg duration-150 bg-white/90 flex flex-col text-black p-2 gap-2 rounded  "
              >
                <img
                  src={item?.image[0]}
                  alt="phone"
                  className=" h-[170px] object-fill rounded mb-3 "
                />
                <div className=" lg:h-[100px] md:h-[200px] ">
                  <Link to={`/productDetails/${item._id}`}>
                    <h3 className=" text-sm font-bold text-blue-700  ">
                      {item?.name}
                    </h3>
                  </Link>
                  <p className=" text-sm font-semibold ">
                    Price: <span className=" font-bold ">${item?.price}</span>
                  </p>
                  <p>{item?.title}</p>
                </div>
                <div className=" flex lg:flex-col gap-3 lg:gap-0 ">
                  <button className=" bg-blue-500 hover:bg-blue-700 duration-300 text-white w-full my-2 py-2 rounded font-semibold ">
                    buy Now
                  </button>
                  <button className=" bg-slate-300 hover:bg-slate-400 duration-300 text-black w-full my-2 py-2 rounded font-semibold ">
                    Add To Cart
                  </button>
                  {/* bg-blue-500 hover:bg-blue-700 */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
