import { baseApi } from "./api/baseApi";
import filterSlice from "./api/filterSlice";
import cardReducer from "./cardSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  filter: filterSlice,
  cart: cardReducer,
  // cart: cardReducer,
};
