import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  cartSlice,
  addItemToCart,
  removeItemFromCart,
  resetCart,
  resetCartItems,
  resetCartState,
  changeCartModalState,
} from "./Slices/cartSlice";
import { fetchDataAPI, useGetAllProductsMutation } from "./API/fetchDataAPI";

const persistConfig = {
  key: "root",
  storage,
};

const persistedCartReducer = persistReducer(persistConfig, cartSlice.reducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    [fetchDataAPI.reducerPath]: fetchDataAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(fetchDataAPI.middleware),
});

export const persistedStore = persistStore(store);

setupListeners(store.dispatch);

// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export {
  addItemToCart,
  removeItemFromCart,
  resetCart,
  resetCartItems,
  resetCartState,
  changeCartModalState,

  // fetchDataAPI
  useGetAllProductsMutation,
};
