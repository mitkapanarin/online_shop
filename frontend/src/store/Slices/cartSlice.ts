import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem } from "../../_Types";
import { v4 as uuidv4 } from "uuid";

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
    addItemToCart: (
      state,
      action: PayloadAction<Omit<ICartItem, "orderId">>,
    ) => {
      const newItem = {
        ...action.payload,
        orderId: uuidv4(),
      };
      state.cart.push(newItem);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<Pick<ICartItem, "orderId" | "quantity">>,
    ) => {
      const { orderId, quantity } = action.payload;
      const existingItem = state.cart.find((item) => item.orderId === orderId);
      if (existingItem) {
        existingItem.quantity = Math.max(0, existingItem.quantity + quantity);
        if (existingItem.quantity === 0) {
          state.cart = state.cart.filter((item) => item.orderId !== orderId);
        }
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<Pick<ICartItem, "orderId">>,
    ) => {
      const { orderId } = action.payload;
      state.cart = state.cart.filter((item) => item.orderId !== orderId);
    },
    updateCartItemAttribute: (
      state,
      action: PayloadAction<{
        orderId: string;
        attribute: { attributeId: string; attributeItemId: string };
      }>,
    ) => {
      const { orderId, attribute } = action.payload;
      const cartItem = state.cart.find((item) => item.orderId === orderId);
      if (cartItem) {
        if (!cartItem.attributes) {
          cartItem.attributes = [];
        }
        const existingAttributeIndex = cartItem.attributes.findIndex(
          (attr) => attr.attributeId === attribute.attributeId,
        );
        if (existingAttributeIndex !== -1) {
          cartItem.attributes[existingAttributeIndex] = attribute;
        } else {
          cartItem.attributes.push(attribute);
        }
      }
    },
    resetCart: () => initialState,
  },
});

export const {
  addItemToCart,
  updateCartItemQuantity,
  removeItemFromCart,
  updateCartItemAttribute,
  resetCart,
} = cartSlice.actions;
