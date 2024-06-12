import { Component, ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { containerSettings } from "../../../CONSTANTS/Constants";
import { RootState, changeCartModalState } from "../../../store";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import CartModal from "../../Cards/CartModal";

interface WithRouterProps {
  location: Location;
}

const withRouter = <P extends WithRouterProps>(
  WrappedComponent: ComponentType<P>,
) => {
  return (props: Omit<P, keyof WithRouterProps>) => {
    const location = useLocation();
    return <WrappedComponent {...(props as P)} location={location} />;
  };
};

interface NavbarProps extends WithRouterProps {
  isModalActive: boolean;
  cart: RootState["cart"]["cart"];
  changeCartModalState: (isActive: boolean) => void;
}

export class Navbar extends Component<NavbarProps> {
  constructor(props: NavbarProps) {
    super(props);
  }

  render() {
    const { changeCartModalState, isModalActive, cart, location } = this.props;
    const currentPath = location.pathname;
    const pathDetector = (route: string) =>
      currentPath === route
        ? "text-red-500 border-b-2 border-red-500 pb-3"
        : "text-black";

    const addDataTestIdFn = (route: string) =>
      currentPath === route
        ? "active-category-link category-link"
        : "category-link";

    return (
      <div className={`relative ${containerSettings}`}>
        <div className={`flex justify-between items-center my-4`}>
          <div className="uppercase flex gap-6">
            <Link
              to="/clothes"
              data-testid={addDataTestIdFn("/clothes")}
              className={pathDetector("/clothes")}
            >
              Clothes
            </Link>
            <Link
              to="/tech"
              data-testid={addDataTestIdFn("/tech")}
              className={pathDetector("/tech")}
            >
              Tech
            </Link>
          </div>
          <div className="">Logo</div>
          <button
            className=""
            data-testid="cart-btn"
            onClick={() => changeCartModalState(!isModalActive)}
          >
            <HiOutlineShoppingCart className="cursor-pointer" />
            <span>{cart ? cart?.length : 0}</span>
          </button>
        </div>
        {isModalActive && <CartModal />}
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  isModalActive: state.cart.isCartModalActive,
  cart: state.cart.cart,
});

const reduxDispatchProps = (dispatch: Dispatch) => ({
  changeCartModalState: (isActive: boolean) =>
    dispatch(changeCartModalState(isActive)),
});

export default connect(reduxStateProps, reduxDispatchProps)(withRouter(Navbar));
