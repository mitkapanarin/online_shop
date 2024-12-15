import { Link } from "react-router-dom";
import { MdAddShoppingCart, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import { useState } from "react";
import { cn } from "../../utils";
import { RootState } from "../../store";
import { IProductCard } from "../../_Types";

export const ProductCard = ({
  id,
  name,
  instock,
  gallery,
  prices,
  addToCartFn,
  // removeFromCartFn,
}: IProductCard) => {
  const [isHovered, setIsHovered] = useState(false);
  const isSelected = useSelector((state: RootState) =>
    state.cart.cart.some((item) => item.id === id),
  );
  const usdPrice = prices.find((price) => price.currency.label === "USD");

  const handleCartAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelected) {
      // removeFromCartFn({ id, quantity: -1 });
    } else {
      addToCartFn({ id, quantity: 1 });
    }
  };

  return (
    <Link
      to={instock ? `/products/${id}` : "#"}
      className={cn("capitalize shadow rounded-sm p-3 hover:shadow-lg", {
        "cursor-not-allowed": !instock,
      })}
      data-testid={`product-${name.toLowerCase().replace(/\s+/g, "-")}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        {isHovered && instock && (
          <button
            type="button"
            className="absolute bottom-[-20px] right-4 bg-green-400 p-3 rounded-full shadow-lg"
            onClick={handleCartAction}
          >
            {isSelected ? (
              <MdOutlineRemoveShoppingCart className="text-2xl text-white" />
            ) : (
              <MdAddShoppingCart className="text-2xl text-white" />
            )}
          </button>
        )}
      </div>
      <h3 className="text-lg font-semibold mt-4">{name}</h3>
      <div className="flex items-center justify-between">
        <h6 className="text-md font-medium text-gray-700">
          {usdPrice?.currency?.symbol} {usdPrice?.amount}
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
