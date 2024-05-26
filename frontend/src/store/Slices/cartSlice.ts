import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICartSlice {
  x: number;
}

const initialState: ICartSlice = {
  x: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // update later
    addItemToCart: (state: ICartSlice, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    removeItemFromCart: (state: ICartSlice, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, resetCart, removeItemFromCart } =
  cartSlice.actions;
