import { Component, ComponentType } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";

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

export class Navbar extends Component<WithRouterProps> {
  render() {
    const { location } = this.props;
    const currentPath = location.pathname;
    console.log(currentPath);

    const pathDetector = (route: string) =>
      currentPath == route
        ? "text-red-500 border-b-2 border-red-500 pb-3"
        : "text-black";

    return (
      <div className="flex justify-between my-4">
        <div className="uppercase flex gap-6">
          <Link to="/women" className={pathDetector("/women")}>
            Women
          </Link>
          <Link to="/men" className={pathDetector("/men")}>
            men
          </Link>
          <Link to="/kids" className={pathDetector("/kids")}>
            kids
          </Link>
        </div>
        <div className="">Logo</div>
        <div className="">
          <HiOutlineShoppingCart className="cursor-pointer" />
        </div>
      </div>
    );
  }
}

export default withRouter(Navbar);
