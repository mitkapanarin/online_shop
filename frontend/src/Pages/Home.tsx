import { containerSettings } from "../_Constants";
import { ProductCard } from "../components";
import { mockData } from "../components/MockData";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../store";

export const Home = () => {
  const dispatch = useDispatch();
  return (
    <div className={containerSettings}>
      <div className="grid grid-cols-3 gap-5">
        {mockData?.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            addToCartFn={(item) => dispatch(addItemToCart(item))}
            removeFromCartFn={(item) => dispatch(removeItemFromCart(item))}
          />
        ))}
      </div>
    </div>
  );
};
