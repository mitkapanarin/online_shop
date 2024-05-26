import { Component, ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { containerSettings } from "../../../CONSTANTS/Constants";
import { RootState, changeCartModalState } from "../../../store";
import { connect } from "react-redux";

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

export class Navbar extends Component<
  WithRouterProps & {
    isModalActive: boolean;
  }
> {
  render() {
    const { location } = this.props;
    const currentPath = location.pathname;
    const pathDetector = (route: string) =>
      currentPath == route
        ? "text-red-500 border-b-2 border-red-500 pb-3"
        : "text-black";

    const addDataTestIdFn = (route: string) =>
      currentPath == route
        ? "active-category-link category-link"
        : "category-link";

    return (
      <div className={containerSettings}>
        <div className={`flex justify-between items-center my-4`}>
          <div className="uppercase flex gap-6">
            <Link
              to="/women"
              data-testid={addDataTestIdFn("/women")}
              className={pathDetector("/women")}
            >
              Women
            </Link>
            <Link
              to="/men"
              data-testid={addDataTestIdFn("/men")}
              className={pathDetector("/men")}
            >
              men
            </Link>
            <Link
              to="/kids"
              data-testid={addDataTestIdFn("/kids")}
              className={pathDetector("/kids")}
            >
              kids
            </Link>
          </div>
          <div className="">Logo</div>
          <button className="" onClick={() => console.log("cart btn clicked")}>
            <HiOutlineShoppingCart className="cursor-pointer" />
          </button>
        </div>
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  isModalActive: state.cartModalState.isActive,
});

export default connect(reduxStateProps, {
  // actions here
  changeCartModalState,
})(withRouter(Navbar));
