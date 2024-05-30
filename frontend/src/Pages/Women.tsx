import { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";
import { IProductCardProps } from "../types/interface";
import { data } from "../Data/data";
import { addItemToCart, removeItemFromCart, RootState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface IShoppingPageProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
}

export class Women extends Component<IShoppingPageProps> {
  // this is the redux state
  cart = ["3"];
  constructor(props: IShoppingPageProps) {
    super(props);
  }

  render() {
    const { cartState, decrementFn, incrementFn } = this.props;
    return (
      <div>
        <h1>Womens clothing</h1>

        <div className="grid grid-cols-3 gap-5">
          {data?.map((product: IProductCardProps, index: number) => (
            <ProductCard
              key={index}
              {...product}
              isSelected={
                cartState.find((item) => product.id == item.id) ? true : false
              }
              addToCartFn={() => incrementFn(product.id, 1)}
              removeFromCartFn={() =>
                decrementFn(
                  product.id,
                  cartState.find((item) => product.id == item.id)?.quantity ||
                    0,
                )
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  cartState: state.cart.cart,
});

const reduxDispatchProps = (dispatch: Dispatch) => ({
  incrementFn: (id: string, quantity: number) =>
    dispatch(
      addItemToCart({
        id,
        quantity,
      }),
    ),
  decrementFn: (id: string, quantity: number) =>
    dispatch(
      removeItemFromCart({
        id,
        quantity,
      }),
    ),
});

export default connect(reduxStateProps, reduxDispatchProps)(Women);
