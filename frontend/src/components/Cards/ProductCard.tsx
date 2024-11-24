import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { toKebabCase } from "../Text";
import { cn } from "../../utils";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ProductCardProps } from "../../_Types";

export const ProductCard = ({
  id,
  name,
  instock,
  gallery,
  prices,
  addToCartFn,
  removeFromCartFn,
}: ProductCardProps) => {
  const isSelected = useSelector((state: RootState) => state.cart);

  const [isHovered, setIsHovered] = useState(false);
  const UsdPricing = prices.find((price) => price.currency.label === "USD");

  const renderActionButton = () => {
    if (!isHovered || !instock) return null;

    const ButtonIcon = isSelected
      ? MdOutlineRemoveShoppingCart
      : MdAddShoppingCart;
    const onClickFn = isSelected ? removeFromCartFn : addToCartFn;

    return (
      <button
        type="button"
        className="cursor-pointer absolute bottom-[-20px] right-4 bg-green-400 p-3 rounded-full shadow-lg"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClickFn();
        }}
      >
        <ButtonIcon className="text-2xl text-white" />
      </button>
    );
  };

  return (
    <Link
      to={`/products/${id}`}
      className={cn("capitalize shadow rounded-sm p-3", "hover:shadow-lg")}
      id={id}
      data-testid={`product-${toKebabCase(name)}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => !instock && e.preventDefault()}
    >
      <div className="relative">
        <img
          src={gallery[0] ?? "/no-image.png"}
          alt={name}
          className={cn("w-full h-72 object-cover", {
            "filter brightness-50": !instock,
          })}
        />
        {!instock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-light">
            Out of Stock
          </div>
        )}
        {renderActionButton()}
      </div>
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <div className="flex items-center justify-between">
        <h6 className="text-md font-medium text-gray-700">
          {UsdPricing?.currency?.symbol} {UsdPricing?.amount}
        </h6>
        <p
          className={cn("text-sm font-semibold", {
            "text-gray-600": instock,
            "text-red-600": !instock,
          })}
        >
          {instock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </Link>
  );
};
