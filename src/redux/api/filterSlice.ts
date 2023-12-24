import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  tags: string;
  search: string;
}

const initialState: FilterState = {
  tags: "",
  search: "",
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
  },
});

export default filterSlice.reducer;
export const { tagSelect, searchfilter } = filterSlice.actions;
