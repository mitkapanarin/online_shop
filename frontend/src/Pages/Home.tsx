import { containerSettings } from "../_Constants";
import { ProductCard } from "../components";
import { mockData } from "../components/MockData";

export const Home = () => {
  return (
    <div className={containerSettings}>
      <div className="grid grid-cols-3 gap-5">
        {mockData?.map((item) => (
          <ProductCard
            key={item.id}
            {...item}
            addToCartFn={() => console.log("xx")}
            removeFromCartFn={() => console.log("dsdjn")}
          />
        ))}
      </div>
    </div>
  );
};
