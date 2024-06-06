import { Component } from "react";
import ProductCard from "../components/Cards/ProductCard";
import { addItemToCart, removeItemFromCart, RootState } from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IDataFetch, IProduct } from "../types/interface";

const url = "http://localhost:8000";
const endpoint = "/graphql";
const query =
  "{ categories { id name __typename } products { id name instock gallery description brand __typename } }";

interface IKidsPageProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
}

interface IKidsPageState {
  data: IDataFetch | null;
  isLoading: boolean;
  isError: boolean;
}

export class Kids extends Component<IKidsPageProps, IKidsPageState> {
  constructor(props: IKidsPageProps) {
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
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ data, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ isError: true, isLoading: false });
      });
  }

  render() {
    const { data, isLoading, isError } = this.state;
    const { cartState, incrementFn, decrementFn } = this.props;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error fetching data</div>;
    }

    return (
      <div className="my-8">
        <h1 className="text-center font-semibold text-3xl my-4">
          Kids Clothing
        </h1>
        <div className="grid grid-cols-3 gap-5">
          {data?.data?.products?.map((product: IProduct, index: number) => (
            <ProductCard
              key={index}
              id={product?.id}
              name={product?.name}
              price={10}
              image={product?.gallery[0]}
              stock={1}
              isSelected={
                cartState.find((item) => product.id === item.id) ? true : false
              }
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
});

export default connect(reduxStateProps, reduxDispatchProps)(Kids);
