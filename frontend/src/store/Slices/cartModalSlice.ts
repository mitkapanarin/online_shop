import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// this will control the behavior of the cart modal state
// whether its open or closed
interface ICartModalSlice {
  isActive: boolean;
}

const initialState: ICartModalSlice = {
  isActive: false,
};

export const cartModalSlice = createSlice({
  name: "cartModal",
  initialState,
  reducers: {
    changeCartModalState: (
      state: ICartModalSlice,
      action: PayloadAction<boolean>,
    ) => {
      state.isActive = action.payload;
    },
    resetCartModalState: () => initialState,
  },
});

export const { resetCartModalState, changeCartModalState } =
  cartModalSlice.actions;
