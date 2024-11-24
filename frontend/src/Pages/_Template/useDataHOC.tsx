import { useDispatch, useSelector } from "react-redux";
import { ICartItem, IProduct } from "../../_Types";
import { mockData } from "../../components/MockData";
import {
  addItemToCart,
  removeItemFromCart,
  RootState,
  resetCart,
} from "../../store";

// Define types
type Constants = {
  data: IProduct[];
  mockData: IProduct[];
  isLoading: boolean;
  isError: boolean;
  addToCartFn: (item: ICartItem) => void;
  removeFromCartFn: (item: ICartItem) => void;
  state: RootState;
  resetCart: () => void;
  totalAmountInCart: number;
};

export const useDataHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P & Constants>,
) => {
  return (props: P) => {
    const dispatch = useDispatch();

    const state = useSelector((state: RootState) => state);

    const addToCartFn = (item: ICartItem) => dispatch(addItemToCart(item));
    const removeFromCartFn = (item: ICartItem) =>
      dispatch(removeItemFromCart(item));

    const totalAmountInCart = +state.cart.cart
      .reduce((acc, item) => {
        const product = mockData?.find((p) => p.id === item.id);
        if (!product) {
          return acc;
        }
        return acc + product.prices[0].amount * item.quantity;
      }, 0)
      .toFixed(2);

    const constants: Constants = {
      mockData,
      data: [],
      isLoading: false,
      isError: false,
      addToCartFn,
      removeFromCartFn,
      state,
      resetCart,
      totalAmountInCart,
    };

    return <WrappedComponent {...props} {...constants} />;
  };
};
