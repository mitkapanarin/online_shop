import { Component } from "react";
import CartCard from "./CartCard";
import { connect } from "react-redux";
import {
  RootState,
  addItemToCart,
  removeItemFromCart,
  resetCartItems,
} from "../../store";
import { data } from "../../Data/data";
import { Dispatch } from "redux";

export interface ICartModalProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
  resetCart: () => void;
}

export class CartModal extends Component<ICartModalProps> {
  constructor(props: ICartModalProps) {
    super(props);
  }
  render() {
    const { cartState, incrementFn, decrementFn, resetCart } = this.props;
    return (
      <div className="absolute right-0 t-0 p-3 min-h-[300px] w-[300px] z-10 bg-white">
        <div className="flex flex-col gap-3">
          {cartState.length === 0 && (
            <h3 className="text-center">Cart is empty</h3>
          )}
          {cartState?.map((item) => {
            const product = data.find((p) => p.id === item.id);
            if (!product) {
              return;
            }
            return (
              <CartCard
                key={item.id}
                {...product}
                quantity={item.quantity}
                incrementFn={() => incrementFn(item.id, 1)}
                decrementFn={() => decrementFn(item.id, 1)}
              />
            );
          })}
        </div>
        <div className="flex flex-row justify-center mb-1 mt-3">
          <button className="" onClick={resetCart}>
            Reset Cart
          </button>
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
  resetCart: () => dispatch(resetCartItems()),
});

export default connect(reduxStateProps, reduxDispatchProps)(CartModal);
