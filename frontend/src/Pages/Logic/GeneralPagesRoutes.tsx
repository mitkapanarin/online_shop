import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Layout";
import CartModal from "../../components/Cards/CartModal";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { containerSettings } from "../../CONSTANTS/Constants";

export class GeneralPagesRoutes extends Component<{
  isModalActive: boolean;
}> {
  render() {
    const { isModalActive } = this.props;
    console.log(this.props.isModalActive);
    return (
      <div className="">
        <Navbar />
        <div className={`relative`}>
          {!isModalActive && <CartModal />}
          <div
            className={`py-4 min-h-screen ${!isModalActive ? "bg-gray-500 filter brightness-50 pointer-events-none" : ""}`}
          >
            <div className={containerSettings}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const reduxStateProps = (state: RootState) => ({
  isModalActive: state.cartModalState.isActive,
});

export default connect(reduxStateProps, {})(GeneralPagesRoutes);
