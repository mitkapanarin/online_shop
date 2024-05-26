import { Component } from "react";
import CartCard from "./CartCard";

export class CartModal extends Component {
  render() {
    return (
      <div className="absolute right-0 t-0 p-3 min-h-[300px] w-[250px] z-10 bg-white">
        <CartCard />
        <CartCard />
        <CartCard />
      </div>
    );
  }
}

export default CartModal;
