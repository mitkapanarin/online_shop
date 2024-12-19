import { containerSettings } from "../_Constants";
import { ProductCard } from "../components";
import { withDataAndState } from "./_Template";

export const Home = withDataAndState(
  ({
    data,
    isLoading,
    isError,
    addToCartFn,
    removeFromCartFn,
    updateCartItemQuantityFn,
    updateCartItemAttributeFn,
  }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (isError) {
      return <div>Error...</div>;
    }

    return (
      <div className={containerSettings}>
        <div className="grid grid-cols-3 gap-5">
          {data?.data?.products?.map((item) => (
            <ProductCard
              key={item.id}
              {...item}
              addToCartFn={addToCartFn}
              removeFromCartFn={removeFromCartFn}
              updateCartItemQuantityFn={updateCartItemQuantityFn}
              updateCartItemAttributeFn={updateCartItemAttributeFn}
            />
          ))}
        </div>
      </div>
    );
  },
);
