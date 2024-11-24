import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../_Types";

interface ICartSliceStateProps {
  cart: ICartItem[];
}

const initialState: ICartSliceStateProps = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (
      state: ICartSliceStateProps,
      action: PayloadAction<ICartItem>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.cart.push(action.payload);
      }
    },

    removeItemFromCart: (
      state: ICartSliceStateProps,
      action: PayloadAction<ICartItem>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.cart.find(
        (item) => item.id === id,
      ) as ICartItem;

      if (!existingItem) {
        return;
      } else {
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
        } else {
          state.cart = state.cart.filter((item) => item.id !== id);
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, resetCart, removeItemFromCart } =
  cartSlice.actions;
