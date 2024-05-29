import { Component } from "react";
import { IProductCardProps, IProductOnCartStats } from "../../types/interface";
import { MdAddShoppingCart } from "react-icons/md";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

export class ProductCard extends Component<
  IProductCardProps & IProductOnCartStats,
  { isHovered: boolean }
> {
  constructor(props: IProductCardProps & IProductOnCartStats) {
    super(props);
    this.state = {
      isHovered: false,
    };
  }

  handleMouseEnter = () => {
    this.setState({ isHovered: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovered: false });
  };

  render() {
    const {
      image,
      name,
      price,
      stock,
      id,
      isSelected,
      addToCartFn,
      removeFromCartFn,
    } = this.props;
    const { isHovered } = this.state;

    return (
      <div
        className="capitalize"
        id={id}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            className={`w-full h-72 object-cover ${stock === 0 ? "filter brightness-50" : ""}`}
          />
          {stock === 0 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-light">
              Out of Stock
            </div>
          )}
          {isHovered && isSelected == false && stock > 0 && (
            <button
              type="button"
              className="cursor-pointer absolute bottom-[-20px] right-4 bg-green-400 p-3 rounded-full shadow-lg"
              onClick={addToCartFn}
            >
              <MdAddShoppingCart className="text-2xl text-white" />
            </button>
          )}

          {isHovered && isSelected == true && stock > 0 && (
            <button
              type="button"
              className="cursor-pointer absolute bottom-[-20px] right-4 bg-green-400 p-3 rounded-full shadow-lg"
              onClick={removeFromCartFn}
            >
              <MdOutlineRemoveShoppingCart className="text-2xl text-white" />
            </button>
          )}
        </div>
        <h3 className="text-lg font-semibold mt-4">{name}</h3>
        <h6 className="text-md font-medium text-gray-700">$ {price}</h6>
        <p className="text-sm text-gray-600">stock: {stock}</p>
      </div>
    );
  }
}

export default ProductCard;
