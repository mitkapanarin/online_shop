import { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";
import { IProductCardProps } from "../types/interface";

export class Women extends Component {
  data: IProductCardProps[] = [
    {
      id: "1",
      name: "White T-Shirt",
      image: "./sample-image.jpg",
      price: 25,
      quantity: 10,
    },
    {
      id: "2",
      name: "second White T-Shirt",
      image: "./sample-image.jpg",
      price: 25,
      quantity: 10,
    },
    {
      id: "3",
      name: "third White T-Shirt",
      image: "./sample-image.jpg",
      price: 25,
      quantity: 10,
    },
  ];

  render() {
    return (
      <div>
        <h1>Womens clothing</h1>

        <div className="grid grid-cols-3 gap-5">
          {this.data?.map((product: IProductCardProps) => (
            <ProductCard {...product} />
          ))}
        </div>
      </div>
    );
  }
}

export default Women;
