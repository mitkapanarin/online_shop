import { useDispatch, useSelector } from "react-redux";
import { DataProps, ICartItem, IDataFetch, StateProps } from "../../_Types";
import { mockData } from "../../components/MockData";
import {
  addItemToCart,
  removeItemFromCart,
  RootState,
  resetCart,
  updateCartItemAttribute,
  updateCartItemQuantity,
  useGetAllProductsQuery,
} from "../../store";

export const withState = <P extends object>(
  WrappedComponent: React.ComponentType<P & StateProps>,
) => {
  return (props: P) => {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state);

    const addToCartFn = (item: Omit<ICartItem, "orderId">) =>
      dispatch(addItemToCart(item));
    const updateCartItemAttributeFn = (item: {
      orderId: string;
      attribute: { attributeId: string; attributeItemId: string };
    }) => dispatch(updateCartItemAttribute(item));
    const updateCartItemQuantityFn = (
      item: Pick<ICartItem, "orderId" | "quantity">,
    ) => dispatch(updateCartItemQuantity(item));

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
      resetCart: () => dispatch(resetCart()),
      state,
      totalAmountInCart,
      updateCartItemQuantityFn,
      updateCartItemAttributeFn,
    };

    return <WrappedComponent {...props} {...stateProps} />;
  };
};

export const withDataAndState = <P extends object>(
  WrappedComponent: React.ComponentType<P & DataProps & StateProps>,
) => {
  const WithStateComponent = withState(WrappedComponent);
  return (props: P) => {
    const { data, isError, isFetching, isLoading } = useGetAllProductsQuery();
    console.log("data", data);

    const dataProps: DataProps = {
      mockData,
      data: data as IDataFetch,
      isLoading: isFetching || isLoading,
      isError,
    };

    return <WithStateComponent {...props} {...dataProps} />;
  };
};
