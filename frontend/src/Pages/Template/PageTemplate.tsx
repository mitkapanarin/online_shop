import { Component } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import { IDataFetch, IProduct } from "../../types/interface";
import { connect } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  resetCartItems,
  RootState,
} from "../../store";
import { Dispatch } from "redux";

const url = "http://localhost:8000";
const endpoint = "/graphql";

interface IProductPageProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
  query: string;
  title: string;
}

interface IProductPageState {
  data: IDataFetch | null;
  isLoading: boolean;
  isError: boolean;
}

export class PageTemplate extends Component<
  IProductPageProps,
  IProductPageState
> {
  constructor(props: IProductPageProps) {
    super(props);
    this.state = {
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({ query: this.props.query }),
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
    const { data, isLoading, isError } = this.state;
    const { cartState, incrementFn, decrementFn, title } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error fetching data</div>;
    }

    console.log(data?.data?.products);

    return (
      <div className="my-8">
        <h1 className="text-center font-semibold text-3xl my-4">{title}</h1>
        <div className="grid grid-cols-3 gap-5">
          {data?.data?.products?.map((product: IProduct, index: number) => (
            <ProductCard
              currency={product?.prices[0].currency.symbol}
              key={index}
              id={product?.id}
              name={product?.name}
              price={product?.prices[0].amount}
              image={product?.gallery[0]}
              stock={product?.instock}
              isSelected={!!cartState.find((item) => product.id === item.id)}
              addToCartFn={() => incrementFn(product.id, 1)}
              removeFromCartFn={() =>
                decrementFn(
                  product.id,
                  cartState.find((item) => product.id === item.id)?.quantity ||
                    0,
                )
              }
            />
          ))}
        </div>
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  cartState: state.cart.cart,
});

const reduxDispatchProps = (dispatch: Dispatch) => ({
  incrementFn: (id: string, quantity: number) =>
    dispatch(
      addItemToCart({
        id,
        quantity,
      }),
    ),
  decrementFn: (id: string, quantity: number) =>
    dispatch(
      removeItemFromCart({
        id,
        quantity,
      }),
    ),
  resetCart: () => dispatch(resetCartItems()),
});

export const templateReduxConnector = connect(
  reduxStateProps,
  reduxDispatchProps,
);
