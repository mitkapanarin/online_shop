import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  id: string;
  quantity: number;
}

const initialState: ICartItem[] = [
  {
    id: "1",
    quantity: 10,
  },
  {
    id: "2",
    quantity: 2,
  },
  {
    id: "3",
    quantity: 0,
  },
];

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state: ICartItem[], action: PayloadAction<ICartItem>) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.push(action.payload);
      }
    },
    removeItemFromCart: (
      state: ICartItem[],
      action: PayloadAction<ICartItem>,
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.find((item) => item.id === id);
      if (!existingItem) {
        return;
      }
      if (existingItem) {
        if (existingItem.quantity > quantity) {
          existingItem.quantity -= quantity;
        } else {
          return state.filter((item) => item.id !== id);
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const { addItemToCart, resetCart, removeItemFromCart } =
  cartSlice.actions;
