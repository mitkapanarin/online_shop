import { useDataHOC } from "../../Pages/_Template";
import { toKebabCase } from "../Text";
import { CartCard } from "./CartCard";

export const CartModal = useDataHOC(
  ({
    isError,
    isLoading,
    mockData,
    state,
    addToCartFn,
    removeFromCartFn,
    resetCart,
    totalAmountInCart,
  }) => {
    if (isLoading) {
      return <h3>Cart Data Loading...</h3>;
    }

    if (isError) {
      return <h3>Error fetching cart data</h3>;
    }

    const cartState = state.cart.cart;

    return (
      <div
        data-testid="cart-total"
        className="absolute right-0 t-0 p-3 min-h-[300px] w-[300px] z-10 bg-white"
      >
        <div className="flex flex-col gap-3">
          {cartState.length === 0 && (
            <h3 className="text-center">Cart is empty</h3>
          )}
          {cartState?.map((item) => {
            const product = mockData?.find((p) => p.id === item.id);
            if (!product) {
              return;
            }
            return (
              <div
                data-testid={`cart-item-attribute-${toKebabCase(product.name)}-selected`}
                key={item.id}
              >
                <CartCard
                  {...product}
                  quantity={item.quantity}
                  incrementFn={() => addToCartFn(item)}
                  decrementFn={() => removeFromCartFn(item)}
                />
              </div>
            );
          })}
        </div>
        {cartState.length > 0 && (
          <>
            <div
              className="text-lg font-semibold text-center"
              data-testid="cart-item-amount"
            >
              Total $ {totalAmountInCart}
            </div>
            <button
              className="bg-emerald-400 px-4 py-1 rounded-md w-full my-3"
              onClick={resetCart}
            >
              Reset Cart
            </button>
          </>
        )}
      </div>
    );
  },
);
