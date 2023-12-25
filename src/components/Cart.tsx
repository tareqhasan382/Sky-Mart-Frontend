/* eslint-disable react-hooks/exhaustive-deps */
//import { getFromLocalStorage } from "../utills/local-storage";
// import { emptyCart } from "../assets/images/index";
import { Link } from "react-router-dom";
import emptyCart from "../assets/images/emptyCart.png";
import {
  IProduct,
  addToCart,
  removeFromCart,
  removeOne,
} from "../redux/cardSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import { FaPlus, FaMinus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Cart: React.FC = () => {
  // const navigate = useNavigate();
  //=======================Get data=================================
  const dispatch = useAppDispatch();

  const { foods } = useAppSelector((state) => state.cart);
  const totalPrice: number = foods
    .map((item: IProduct) => {
      // Ensure item.price is a string before using replace
      const numericPrice: number = parseFloat(
        String(item.price).replace("$", "")
      );
      return item.quantity! * numericPrice;
    })
    .reduce(
      (accumulator: number, currentValue: number) => accumulator + currentValue,
      0
    );

  // console.log(`Total Price: $${totalPrice.toFixed(2)}`);
  return (
    <div className="bg-gray-200 min-h-full  items-center pb-20 mb-5 rounded ">
      <div className="mx-auto mt-[70px]  items-center justify-center flex flex-col pt-8 lg:px-20 ">
        <h1 className=" text-center text-xl font-bold ">Cart Page</h1>

        <div className=" flex flex-col md:flex-row items-center h-auto justify-between gap-6 w-full p-2 lg:px-20 ">
          {/*=============== single cart ===================*/}
          <div className=" h-auto flex flex-col items-center w-full lg:w-1/2 gap-2 ">
            {foods.length <= 0 ? (
              <div className=" flex flex-col items-center justify-center w-full ">
                <img
                  className="w-80 rounded-lg p-4 mx-auto"
                  src={emptyCart}
                  alt="emptyCart"
                />
                <h3 className=" uppercase text-2xl font-bold justify-center ">
                  Your cart feels lonely.
                </h3>
                <article className=" justify-center text-center py-4 px-4 ">
                  Your Shopping cart lives to serve. Give it purpose - fill it
                  with books , shop, electronics, etc. and make it happy.
                </article>
                <Link to="/">
                  <button className=" bg-black text-white text-2xl font-bold px-6 py-2 rounded-md ">
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className=" gap-2 w-full ">
                {foods.map((item: IProduct) => (
                  <div
                    key={item.productId}
                    className=" bg-white duration-300 h-auto flex items-center justify-between outline rounded-md outline-1 outline-black "
                  >
                    <img
                      src={item.image}
                      alt="img"
                      className=" w-[70px] h-[70px] pl-2 "
                    />
                    <div className=" flex flex-col ">
                      <p className="  ">
                        Name:
                        <span className=" font-bold ">{item.name} </span>
                      </p>
                      <p>
                        Price:{" "}
                        <span className="text-base font-bold">
                          ${item.price}{" "}
                        </span>
                      </p>
                      <p>
                        quantity:{" "}
                        <span className="text-base font-bold">
                          {item.quantity}{" "}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-col p-2 gap-1 ">
                      <FaPlus
                        onClick={() => dispatch(addToCart(item))}
                        size={30}
                        className=" cursor-pointer bg-[#CC470A] rounded-lg p-2  "
                      />
                      <FaMinus
                        onClick={() => dispatch(removeOne(item))}
                        size={30}
                        className=" cursor-pointer bg-[#CC470A] rounded-lg p-2  "
                      />
                      <RiDeleteBin5Fill
                        onClick={() => dispatch(removeFromCart(item))}
                        size={30}
                        className=" cursor-pointer bg-[#CC470A] rounded-lg p-2  "
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/*==================== Order Now ====================*/}
          {foods.length > 0 && (
            <div className=" top-0 lg:w-1/2 w-full">
              <div className=" relative top-0  flex flex-col text-lg items-center justify-center py-2 outline rounded-md outline-1 outline-black ">
                {/* <p className=" ">Order Now</p> */}
                <p>
                  <span className=" font-bold ">{`Total Price: $${totalPrice.toFixed(
                    2
                  )}`}</span>
                </p>
                <form
                  action=""
                  className=" px-2 lg:w-2/3 w-full flex flex-col gap-2 "
                >
                  <input
                    type="text"
                    placeholder="your name"
                    className=" pl-2 w-full rounded-md h-10 focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Phone number"
                    className=" pl-2 w-full rounded-md h-10 focus:outline-none "
                  />
                  <input
                    type="text"
                    placeholder="Adress"
                    className=" pl-2 w-full rounded-md h-10 focus:outline-none "
                  />
                  <button
                    disabled
                    className=" pl-2 w-full rounded-md h-10 font-bold bg-black text-white cursor-pointer "
                  >
                    Payment Now
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
