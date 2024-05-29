import { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";
import { IProductCardProps } from "../types/interface";
import { data } from "../Data/data";

export class Women extends Component {
  // this is the redux state
  cart = ["3"];

  render() {
    return (
      <div>
        <h1>Womens clothing</h1>

        <div className="grid grid-cols-3 gap-5">
          {data?.map((product: IProductCardProps, index: number) => (
            <ProductCard
              key={index}
              {...product}
              isSelected={
                this.cart.find((item) => product.id == item) ? true : false
              }
              addToCartFn={() => console.log("Add to cart")}
              removeFromCartFn={() => console.log("Remove from cart")}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Women;
