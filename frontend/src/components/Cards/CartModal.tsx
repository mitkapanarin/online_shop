import { Component } from "react";
import CartCard from "./CartCard";
import { RootState } from "../../store";
import { IDataFetch } from "../../types/interface";
import { templateReduxConnector } from "../../Pages/Template/PageTemplate";
import { toKebabCase } from "../../CONSTANTS/Constants";

const url = "http://localhost:8000";
const endpoint = "/graphql";
const allProductsQuery =
  "{ products { id name instock attributes { id name items { id displayValue value __typename } type __typename } gallery description brand prices { amount __typename currency { label symbol __typename } } } }";

export interface ICartModalProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
  resetCart: () => void;
}

interface IProductPageState {
  data: IDataFetch | null;
  isLoading: boolean;
  isError: boolean;
}

export class CartModal extends Component<ICartModalProps, IProductPageState> {
  constructor(props: ICartModalProps) {
    super(props);
    this.state = {
      data: null,
      isLoading: false,
      isError: false,
    };
  }

  componentDidMount() {
    fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ query: allProductsQuery }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        if (result.errors) {
          throw new Error("Error in GraphQL query");
        }
        this.setState({ data: result, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ isError: true, isLoading: false });
      });
  }

  render() {
    const { cartState, incrementFn, decrementFn, resetCart } = this.props;

    const { data, isLoading, isError } = this.state;

    if (isLoading) {
      return <h3>Cart Data Loading...</h3>;
    }

    if (isError) {
      return <h3>Error fetching cart data</h3>;
    }

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
            const product = data?.data?.products?.find((p) => p.id === item.id);
            if (!product) {
              return;
            }
            return (
              <div
                data-testid={`cart-item-attribute-${toKebabCase(product.name)}-selected`}
              >
                <CartCard
                  key={item.id}
                  {...product}
                  image={product.gallery[0]}
                  quantity={item.quantity}
                  price={product?.prices[0]?.amount || 0}
                  stock={product?.instock}
                  attributes={product?.attributes}
                  currency={product?.prices[0]?.currency?.symbol || "$"}
                  incrementFn={() => incrementFn(item.id, 1)}
                  decrementFn={() => decrementFn(item.id, 1)}
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
              Total ${""}
              {cartState.reduce((acc, item) => {
                const product = data?.data?.products?.find(
                  (p) => p.id === item.id,
                );
                if (!product) {
                  return acc;
                }
                return acc + product.prices[0].amount * item.quantity;
              }, 0)}
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
  }
}

export default templateReduxConnector(CartModal);
