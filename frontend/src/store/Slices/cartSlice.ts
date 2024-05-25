import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SystemState {
  x: number;
}

const initialState: SystemState = {
  x: 0,
};

export const cartSlice = createSlice({
  name: "system",
  initialState,
  reducers: {
    // update later
    addItemToCart: (state: SystemState, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    removeItemFromCart: (state: SystemState, action: PayloadAction<number>) => {
      state.x = action.payload;
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, resetCart, removeItemFromCart } =
  cartSlice.actions;
