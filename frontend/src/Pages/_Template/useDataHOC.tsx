import { useDispatch } from "react-redux";
import { ICartItem, IProduct } from "../../_Types";
import { mockData } from "../../components/MockData";
import { addItemToCart, removeItemFromCart } from "../../store";

// Define types
type Constants = {
  data: IProduct[];
  mockData: IProduct[];
  isLoading: boolean;
  isError: boolean;
  addToCartFn: (item: ICartItem) => void;
  removeFromCartFn: (item: ICartItem) => void;
};

export const useDataHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P & Constants>,
) => {
  return (props: P) => {
    const dispatch = useDispatch();

    const addToCartFn = (item: ICartItem) => dispatch(addItemToCart(item));
    const removeFromCartFn = (item: ICartItem) =>
      dispatch(removeItemFromCart(item));

    const constants: Constants = {
      mockData,
      data: [],
      isLoading: false,
      isError: false,
      addToCartFn,
      removeFromCartFn,
    };

    return <WrappedComponent {...props} {...constants} />;
  };
};
