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
    removeItemFromCart: (state, action: PayloadAction<ICartItem>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.cart.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        const item = state.cart[itemIndex];
        item.quantity =
          quantity === -1 ? 0 : Math.max(0, item.quantity - quantity);

        if (item.quantity === 0) {
          state.cart.splice(itemIndex, 1);
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, removeItemFromCart, resetCart } =
  cartSlice.actions;
