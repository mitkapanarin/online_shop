import { Component } from "react";
import { IDataFetch } from "../types/interface";
import {
  addItemToCart,
  removeItemFromCart,
  resetCartItems,
  RootState,
} from "../store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import ReactHtmlParser from "react-html-parser";

interface IProductDetailsProps {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
  resetCart: () => void;
}

interface IProductDetailsState {
  id: string | null;
  data: IDataFetch["data"]["products"] | null;
  isLoading: boolean;
  isError: boolean;
}

const url = "http://localhost:8000";
const endpoint = "/graphql";

class ProductDetails extends Component<
  IProductDetailsProps,
  IProductDetailsState
> {
  constructor(props: IProductDetailsProps) {
    super(props);
    this.state = {
      id: null,
      data: null,
      isLoading: true,
      isError: false,
    };
  }

  componentDidMount() {
    // Extract the ID from the URL
    const domain = window.location.pathname;
    const id = domain.substring(domain.lastIndexOf("/") + 1);

    // Update the state with the extracted ID
    this.setState({ id });

    fetch(url + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        query: "{ products { id name instock gallery description brand } }",
      }),
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
        this.setState({ data: result.data.products, isLoading: false });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({ isError: true, isLoading: false });
      });
  }

  render() {
    const { isLoading, isError, data, id } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error fetching data</div>;
    }

    const product = data?.find((product) => product.id === id);

    if (!product) {
      return <div>Product not found</div>;
    }

    return (
      <div className="grid grid-cols-2">
        <div className="left">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-2 flex flex-col gap-3">
              {product.gallery?.length !== 1 &&
                product.gallery?.map((_, index) => (
                  <img
                    className="cursor-pointer"
                    src={product.gallery[index + 1] || "/no-image.png"}
                    alt={`product gallery image ${index}`}
                  />
                ))}
            </div>
            <img
              className="col-span-10 cursor-pointer"
              src={product.gallery[0] || "/no-image.png"}
              alt={product.name}
            />
          </div>
        </div>
        <div className="right">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p>{ReactHtmlParser(product.description)}</p>
          {/* Add more product details as needed */}
          <button onClick={() => this.props.incrementFn(product.id, 1)}>
            Add to Cart
          </button>
          <button onClick={() => this.props.decrementFn(product.id, 1)}>
            Remove from Cart
          </button>
          <button onClick={() => this.props.resetCart()}>Reset Cart</button>
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
    dispatch(addItemToCart({ id, quantity })),
  decrementFn: (id: string, quantity: number) =>
    dispatch(removeItemFromCart({ id, quantity })),
  resetCart: () => dispatch(resetCartItems()),
});

export default connect(reduxStateProps, reduxDispatchProps)(ProductDetails);
