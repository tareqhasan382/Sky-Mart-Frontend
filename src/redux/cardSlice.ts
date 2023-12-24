/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IProduct {
  productId: string;
  name: string;
  size: string;
  image?: string;
  price: number;
  color: number;
  quantity?: number;
}
interface ICart {
  foods: IProduct[];
}

export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return [];
  }
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};
const initialState: ICart = {
  // foods: [],
  foods: getFromLocalStorage("cartItem"),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const existing = state.foods.find(
        (item: IProduct) => item.productId === action.payload.productId
      );

      if (existing) {
        // Item already exists in the cart, increase quantity
        existing.quantity = existing.quantity! + 1;
        toast.info(` Increase SuccessFully`);
        // existing.total += action.payload.price;
      } else {
        // Item is not in the cart, add it

        state.foods.push({
          ...action.payload,
          quantity: 1,
        });
        toast.success(`Add to Cart SuccessFully`);
      }

      localStorage.setItem("cartItem", JSON.stringify(state.foods));
    },
    //Remove One Cart
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existing = state.foods.find(
        (item: IProduct) => item.productId === action.payload.productId
      );
      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
        toast.warning(` Decrease to Cart SuccessFully`);
      } else {
        state.foods = state.foods.filter(
          (item: IProduct) => item.productId !== action.payload.productId
        );
        toast.error(` Deleted to Cart SuccessFully`, { icon: false });
      }
      localStorage.setItem("cartItem", JSON.stringify(state.foods));
    },

    //==========
    removeFromCart: (state, action: PayloadAction<IProduct>) => {
      state.foods = state.foods.filter(
        (item: IProduct) => item.productId !== action.payload.productId
      );
      localStorage.setItem("cartItem", JSON.stringify(state.foods));
      toast.error(`Deleted to Cart SuccessFully`, {
        icon: false,
      });
    },
  },
});
export const { addToCart, removeOne, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
