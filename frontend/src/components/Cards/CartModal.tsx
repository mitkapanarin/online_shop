import { Component } from "react";
import CartCard from "./CartCard";
import { RootState } from "../../store";
import { IDataFetch } from "../../types/interface";
import { templateReduxConnector } from "../../Pages/Template/PageTemplate";

const url = "http://localhost:8000";
const endpoint = "/graphql";
const allProductsQuery =
  "{ categories { id name __typename } products { id name instock gallery description brand __typename } }";

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
      <div className="absolute right-0 t-0 p-3 min-h-[300px] w-[300px] z-10 bg-white">
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
              <CartCard
                key={item.id}
                {...product}
                image={product.gallery[0]}
                quantity={item.quantity}
                price={10}
                stock={product?.instock}
                currency={"$"}
                incrementFn={() => incrementFn(item.id, 1)}
                decrementFn={() => decrementFn(item.id, 1)}
              />
            );
          })}
        </div>
        {cartState.length > 0 && (
          <button
            className="bg-emerald-400 px-4 py-1 rounded-md w-full my-3"
            onClick={resetCart}
          >
            Reset Cart
          </button>
        )}
      </div>
    );
  }
}

export default templateReduxConnector(CartModal);
