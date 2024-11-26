import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../_Types";

interface CartState {
  cart: ICartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItemIndex = state.cart.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.cart[existingItemIndex];
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
        } else {
          state.cart.splice(existingItemIndex, 1);
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, removeItemFromCart, resetCart } =
  cartSlice.actions;
