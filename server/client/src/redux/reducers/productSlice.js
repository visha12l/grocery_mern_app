import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: { products: [] },
  reducers: {
    setProducts: (state, action) => {
      return { ...state, products: [...action.payload] };
    }
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
