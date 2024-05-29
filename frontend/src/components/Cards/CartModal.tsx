import { Component } from "react";
import CartCard from "./CartCard";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { data } from "../../Data/data";

export class CartModal extends Component<{
  cartState: RootState["cart"];
}> {
  constructor(props: { cartState: RootState["cart"] }) {
    super(props);
  }
  render() {
    const { cartState } = this.props;
    const cartStateObject = Object.values(cartState);
    return (
      <div className="absolute right-0 t-0 p-3 min-h-[300px] w-[300px] z-10 bg-white">
        <div className="flex flex-col gap-3">
          {cartStateObject.length === 0 && (
            <h3 className="text-center">Cart is empty</h3>
          )}
          {cartStateObject?.map((item) => {
            const product = data.find((p) => p.id === item.id);
            if (!product) {
              return;
            }
            return (
              <CartCard key={item.id} {...product} quantity={item.quantity} />
            );
          })}
        </div>
        <div className="flex flex-row justify-center mb-1 mt-3">
          <button className="">Reset Cart</button>
        </div>
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  cartState: state.cart,
});

export default connect(reduxStateProps, {})(CartModal);
