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
        if (
          quantity === -1 ||
          state.cart[existingItemIndex].quantity <= quantity
        ) {
          state.cart.splice(existingItemIndex, 1);
        } else {
          state.cart[existingItemIndex].quantity -= quantity;
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, removeItemFromCart, resetCart } =
  cartSlice.actions;
