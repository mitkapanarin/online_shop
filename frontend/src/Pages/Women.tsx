import { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";

export class Women extends Component {
  render() {
    return (
      <div>
        <h1>Womens clothing</h1>

        <div className="grid grid-cols-3 gap-5">
          <ProductCard
            image="./sample-image.jpg"
            name="White T-Shirt"
            price={50}
            quantity={20}
          />
          <ProductCard
            image="./sample-image.jpg"
            name="White T-Shirt"
            price={50}
            quantity={0}
          />
          <ProductCard
            image="./sample-image.jpg"
            name="White T-Shirt"
            price={50}
            quantity={2}
          />
        </div>
      </div>
    );
  }
}

export default Women;
