import { Component } from "react";
import { IProductCardProps } from "../../types/interface";

export class ProductCard extends Component<IProductCardProps> {
  render() {
    const { image, name, price, quantity, id } = this.props;
    return (
      <div className="capitalize" id={id}>
        <div className="relative">
          <img
            src={image}
            alt={name}
            className={`w-full h-72 object-cover ${quantity === 0 ? "filter brightness-50" : ""}`}
          />
          {quantity === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-light">
              Out of Stock
            </div>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-4">{name}</h3>
        <h6 className="text-md font-medium text-gray-700">$ {price}</h6>
        <p className="text-sm text-gray-600">Quantity: {quantity}</p>
      </div>
    );
  }
}

export default ProductCard;
