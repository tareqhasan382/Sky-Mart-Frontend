import { useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productApi";
import { useState } from "react";
import { IVariation } from "../types/common";
import { useAppDispatch } from "../redux/hooks";
import { toast } from "react-toastify";
import { IProduct, addToCart } from "../redux/cardSlice";
import { FaCheckCircle } from "react-icons/fa";

const ProductDetails = () => {
  const dispatch = useAppDispatch();

  const [thumimage, setThumimage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const { id } = useParams();
  const { data, isLoading } = useProductDetailsQuery(id);
  const product = data?.data;
  // console.log("product:", product);
  const thumbnil = (index: number) => {
    setThumimage(index);
  };
  const handleColor = (index: number) => {
    setSelectedColor(index);
  };
  const handleSize = (index: number) => {
    setSelectedSize(index);
  };
  // ======Add To Card ==========
  const AddToCart = () => {
    // Check if a size and color are selected
    if (selectedSize !== null && selectedColor !== null) {
      const newItem: IProduct = {
        productId: product?._id,
        name: product?.name,
        size: product?.variations[selectedColor].size[selectedSize],
        color: product?.variations[selectedColor]?.color,
        price: product.price,
        image: product.image[0],
        // Add other product details as needed
      };

      dispatch(addToCart(newItem));
    } else {
      toast.warning("Please select size and color before adding to cart.");
    }
  };
  return (
    <div className=" py-6 ">
      <h1 className=" text-center text-2xl font-bold py-3 bg-gray-800 text-white  ">
        Product Details
      </h1>
      {isLoading && (
        <div className=" w-full h-screen bg-slate-500 ">
          <h1 className=" text-2xl font-bold text-center text-white ">
            Loding...
          </h1>
        </div>
      )}
      {!isLoading && (
        <div className=" flex flex-col gap-3 ">
          {/* img section*/}
          <div className=" shadow-lg lg:flex gap-4 rounded-md ">
            <div className=" lg:w-[50%] md:w-full rounded-md ">
              <div className=" flex shadow-lg m-2 items-center justify-center ">
                <img
                  src={product?.image[thumimage]}
                  alt={product?.image[thumimage]}
                  className=" p-2 h-[200px] lg:h-[400px] items-center justify-center "
                />
              </div>
              <div className=" flex gap-2 w-full justify-center  ">
                {product?.image?.map((x: string, index: number) => (
                  <div key={index} className="p-2 ">
                    <img
                      onClick={() => thumbnil(index)}
                      src={x}
                      alt={x}
                      className={`${
                        thumimage == index
                          ? "outline-red-400 outline outline-2"
                          : ""
                      }  duration-300 rounded hover:outline hover:outline-2 hover:outline-red-400 cursor-pointer h-[60px] w-[60px] object-fill`}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className=" lg:w-[50%] md:w-full px-2 pb-3 md:py-6 ">
              <h3 className=" lg:text-xl text-sm lg:font-bold font-bold ">
                Name : {product?.name}
              </h3>
              <h3 className=" text-sm font-semibold ">
                Title : {product?.title}
              </h3>
              <h3 className=" text-sm font-semibold ">
                {/* MRP: <del> $ {mrpPrice} </del> */}
              </h3>

              <h1 className=" text-lg font-bold ">Details</h1>
              <h3 className=" text-sm font-semibold">
                Available : {product?.stock > 0 ? " In Stock" : "Not Available"}
              </h3>
              <div className=" text-sm font-semibold flex items-center ">
                Color:
                {product?.variations.map((x: IVariation, index: number) => (
                  <div key={index} className=" my-3 ">
                    <p
                      className="cursor-pointer mx-2 rounded-full w-[25px] h-[25px] outline outline-2 outline-black"
                      style={{
                        backgroundColor: x?.color,
                        display: "inline-block",
                        cursor: "pointer",
                        outlineColor: "black",
                      }}
                      onClick={() => handleColor(index)}
                    >
                      {selectedColor === index ? (
                        <>
                          <FaCheckCircle
                            style={{
                              //color: x?.color,
                              color: "white",
                              display: "inline-block",
                              cursor: "pointer",
                              outlineColor: "black",
                            }}
                            className="bg-green-600 rounded-full"
                            size={25}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-sm font-semibold flex items-center gap-2 ">
                Size:
                {product?.variations[selectedColor].size.map(
                  (size: string, index: number) => (
                    <div key={index}>
                      <p
                        onClick={() => handleSize(index)}
                        className={`${
                          selectedSize === index
                            ? "bg-black text-white px-1 rounded-md "
                            : ""
                        } mx-1 cursor-pointer`}
                      >
                        {size}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div></div>
              <div className=" flex gap-3 ">
                <button className=" px-3 py-1 bg-blue-500 text-white text-lg font-bold my-2 rounded hover:bg-blue-700 duration-300 ">
                  Buy Now
                </button>
                <button
                  onClick={() => AddToCart()}
                  className=" px-3 py-1 bg-gray-600 text-white text-lg font-bold my-2 rounded hover:bg-blue-700 duration-300 "
                >
                  Add To Card
                </button>
              </div>
            </div>
          </div>
          {/* details */}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
