import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../_Types";

interface ICartSliceStateProps {
  cart: ICartItem[];
  isCartModalActive: boolean;
}

const initialState: ICartSliceStateProps = {
  cart: [],
  isCartModalActive: false,
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

    changeCartModalState: (
      state: ICartSliceStateProps,
      action: PayloadAction<boolean>,
    ) => {
      return {
        cart: state.cart,
        isCartModalActive: action.payload,
      };
    },
    resetCartItems: (state: ICartSliceStateProps) => {
      return {
        cart: [],
        isCartModalActive: state.isCartModalActive,
      };
    },
    resetCartState: (state: ICartSliceStateProps) => {
      return {
        cart: state.cart,
        isCartModalActive: initialState.isCartModalActive,
      };
    },
    resetCart: () => initialState,
  },
});

export const {
  addItemToCart,
  resetCart,
  removeItemFromCart,
  resetCartItems,
  resetCartState,
  changeCartModalState,
} = cartSlice.actions;
