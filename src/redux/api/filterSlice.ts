import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  tags: string;
  search: string;
  maxPrice: number;
  minPrice: number;
  color: string;
  size: string;
  sortOrder: string;
  sortField: string;
}

const initialState: FilterState = {
  tags: "",
  search: "",
  maxPrice: 10000,
  minPrice: 0,
  color: "",
  size: "",
  sortOrder: "",
  sortField: "",
};

const filterSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    tagSelect: (state: FilterState, action: PayloadAction<string>) => {
      state.tags = action.payload;
    },
    searchfilter: (state: FilterState, action: PayloadAction<string>) => {
      state.tags = action.payload;
    },
    maxPrixe: (state: FilterState, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    minPrixe: (state: FilterState, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    selectSize: (state: FilterState, action: PayloadAction<string>) => {
      state.size = action.payload;
    },
    selectColor: (state: FilterState, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    selectSortOrder: (state: FilterState, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
    selectSortField: (state: FilterState, action: PayloadAction<string>) => {
      state.sortField = action.payload;
    },
  },
});

export default filterSlice.reducer;
export const {
  tagSelect,
  searchfilter,
  maxPrixe,
  minPrixe,
  selectColor,
  selectSize,
  selectSortField,
  selectSortOrder,
} = filterSlice.actions;
