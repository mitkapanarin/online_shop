import { connect } from "react-redux";
import { addItemToCart, removeItemFromCart, RootState } from "../store";
import { Dispatch } from "redux";
import { PageTemplate } from "./Template/PageTemplate";

// only fetch the tech and not the clothes
const techQuery =
  "{ categories { id name __typename } products { id name instock gallery description brand __typename } }";

const Tech = (props: {
  cartState: RootState["cart"]["cart"];
  incrementFn: (id: string, quantity: number) => void;
  decrementFn: (id: string, quantity: number) => void;
}) => <PageTemplate {...props} query={techQuery} title="Tech Section" />;

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

export default connect(reduxStateProps, reduxDispatchProps)(Tech);
