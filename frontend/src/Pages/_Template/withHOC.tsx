import { useDispatch, useSelector } from "react-redux";
import { DataProps, ICartItem, StateProps } from "../../_Types";
import { mockData } from "../../components/MockData";
import {
  addItemToCart,
  removeItemFromCart,
  RootState,
  resetCart,
} from "../../store";

export const withState = <P extends object>(
  WrappedComponent: React.ComponentType<P & StateProps>,
) => {
  return (props: P) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);

    const addToCartFn = (item: ICartItem) => dispatch(addItemToCart(item));
    const removeFromCartFn = (item: ICartItem) =>
      dispatch(removeItemFromCart(item));

    const totalAmountInCart = Number(
      state.cart.cart
        .reduce((acc, item) => {
          const product = mockData?.find((p) => p.id === item.id);
          return product ? acc + product.prices[0].amount * item.quantity : acc;
        }, 0)
        .toFixed(2),
    );

    const stateProps: StateProps = {
      addToCartFn,
      removeFromCartFn,
      resetCart,
      state,
      totalAmountInCart,
    };

    return <WrappedComponent {...props} {...stateProps} />;
  };
};

export const withDataAndState = <P extends object>(
  WrappedComponent: React.ComponentType<P & DataProps & StateProps>,
) => {
  const WithStateComponent = withState(WrappedComponent);

  return (props: P) => {
    const dataProps: DataProps = {
      mockData,
      data: [],
      isLoading: false,
      isError: false,
    };

    return <WithStateComponent {...props} {...dataProps} />;
  };
};
