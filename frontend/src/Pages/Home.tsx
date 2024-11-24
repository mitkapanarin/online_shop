import { containerSettings } from "../_Constants";
import { ProductCard } from "../components";
import { useDataHOC } from "./_Template";

export const Home = useDataHOC(
  ({ mockData, isLoading, isError, addToCartFn, removeFromCartFn }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error...</div>;
    }

    return (
      <div className={containerSettings}>
        <div className="grid grid-cols-3 gap-5">
          {mockData?.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              addToCartFn={addToCartFn}
              removeFromCartFn={removeFromCartFn}
            />
          ))}
        </div>
      </div>
    );
  },
);
