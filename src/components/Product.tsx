/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApi";
import {
  tagSelect,
  searchfilter,
  maxPrixe,
  minPrixe,
  selectColor,
  selectSize,
  selectSortField,
  selectSortOrder,
} from "../redux/api/filterSlice";
import { FaCheck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { SizesArray } from "../constant/Sizes";
const uniqueColors = new Set<string>();
const Product: React.FC = () => {
  const [uniqueColorArray, setUniqueColorArray] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>();
  const [selectedSize, setSelectedSize] = useState<string>();
  const dispatch = useDispatch();

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
  query["color"] = selectedColor;
  query["size"] = selectedSize;
  const { data, isLoading } = useGetProductsQuery({ ...query });
  const products = data?.data;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOption = e.target.value;
    dispatch(selectSortField("price"));
    dispatch(selectSortOrder(selectedSortOption));
  };
  useEffect(() => {
    // Iterate through products to extract unique colors
    products?.forEach((product: any) => {
      product?.variations?.forEach((variation: any) => {
        uniqueColors.add(variation.color);
      });
    });

    // Convert the set to an array for rendering
    setUniqueColorArray(Array.from(uniqueColors));
  }, [products]);
  const handleColor = (color: string) => {
    setSelectedSize("");
    setSelectedColor(color);
    //console.log("setSelectedColor:", color);
  };
  const handleSize = (size: string) => {
    setSelectedColor("");
    setSelectedSize(size.toLowerCase());

    //console.log("setSelectedColor:", size.toLowerCase());
  };

  const handleClearFilter = () => {
    setSelectedColor("");
    setSelectedSize("");
    tagSelect("");
    searchfilter("");
    selectColor("");
    selectSize("");
    dispatch(tagSelect(""));
  };

  return (
    <div className=" bg-gray-100 px-1 lg:flex gap:[1%] justify-between h-full rounded-md ">
      <div className=" lg:w-[18%]  ">
        <div className=" px-1 hidden md:block ">
          {/* sort by */}
          <button
            onClick={handleClearFilter}
            className=" my-3 bg-blue-500 text-white px-3 py-1 rounded "
          >
            Clear All Filter
          </button>
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
                Default
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
              className=" p-2 w-[80px] rounded "
            />
            <p className=" text-xl font-bold ">-</p>
            <input
              type="number"
              placeholder="max"
              onChange={(e) => dispatch(maxPrixe(Number(e.target.value)))}
              className=" p-2 w-[80px] rounded "
            />
          </div>

          {/* Color manage */}
          <div className=" py-2 ">
            <p className="font-semibold py-2 ">Colors</p>
            <div className=" flex flex-wrap gap-2  ">
              {uniqueColorArray?.map((color, index) => (
                <div key={index}>
                  <p
                    onClick={() => handleColor(color)}
                    className="w-[40px] h-[40px] rounded-xl bg-black cursor-pointer border-[0.5px] border-black shadow-md items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color ? (
                      <>
                        <FaCheck
                          className=" m-2 text-green-600 opacity-100 rounded-md bg-slate-200 "
                          size={20}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/*  Size manage */}
          <div className=" py-2 ">
            <p className="font-semibold py-2 ">Sizes</p>

            <div className=" flex flex-wrap gap-2 ">
              {SizesArray.map((size: any, index: number) => (
                <button
                  onClick={() => handleSize(size)}
                  key={index}
                  className={`${
                    selectedSize?.toLocaleUpperCase() === size &&
                    " bg-black text-white  "
                  } border-[0.5px] border-black rounded-xl text-center text-[14px] text-black p-2 cursor-pointer`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
        <details className=" px-1 md:hidden transition duration-150 ease-in ">
          <summary>Sort and Filtering</summary>
          <button
            onClick={handleClearFilter}
            className=" my-3 bg-blue-500 text-white px-3 py-1 rounded "
          >
            Clear All Filter
          </button>
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
            <div className=" py-2 ">
              <h3 className=" font-semibold ">Price Range</h3>
              {/* price Range */}
              <div className=" flex gap-2 items-center py-2 ">
                <input
                  type="number"
                  placeholder="min"
                  onChange={(e) => dispatch(minPrixe(Number(e.target.value)))}
                  className=" p-1 w-[80px] rounded outline outline-1 outline-gray-400  "
                />
                <p className=" text-xl font-bold ">-</p>
                <input
                  type="number"
                  placeholder="max"
                  onChange={(e) => dispatch(maxPrixe(Number(e.target.value)))}
                  className=" p-1 w-[100px] rounded outline outline-1 outline-gray-400 "
                />
              </div>
            </div>
          </div>
          <div className=" ">
            {/* Color manage */}
            <div className=" py-2 ">
              <p className="font-semibold py-2 ">Colors</p>
              <div className=" flex flex-wrap gap-2  ">
                {uniqueColorArray?.map((color, index) => (
                  <div key={index}>
                    <p
                      onClick={() => handleColor(color)}
                      className="w-[40px] h-[40px] rounded-xl bg-black cursor-pointer border-[0.5px] border-black shadow-md items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      {selectedColor === color ? (
                        <>
                          <FaCheck
                            className=" m-2 text-green-600 opacity-100 rounded-md bg-slate-200 "
                            size={20}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/*  Size manage */}
            <div className=" py-2 ">
              <p className="font-semibold py-2 ">Sizes</p>

              <div className=" flex flex-wrap gap-2 ">
                {SizesArray.map((size: any, index: number) => (
                  <button
                    onClick={() => handleSize(size)}
                    key={index}
                    className={`${
                      selectedSize?.toLocaleUpperCase() === size &&
                      " bg-black text-white  "
                    } border-[0.5px] border-black rounded-xl text-center text-[14px] text-black p-2 cursor-pointer`}
                  >
                    {size}
                  </button>
                ))}
              </div>
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
                  alt="img"
                  className=" h-[170px] object-cover  rounded mb-3 "
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
