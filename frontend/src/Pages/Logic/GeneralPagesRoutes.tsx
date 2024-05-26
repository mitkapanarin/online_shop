import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Layout";
import { connect } from "react-redux";
import { changeCartModalState, RootState } from "../../store";
import { containerSettings } from "../../CONSTANTS/Constants";
import { Dispatch } from "redux";

export class GeneralPagesRoutes extends Component<{
  isModalActive: boolean;
  changeCartModalState: (isActive: boolean) => void;
}> {
  handleCartClick = () => {
    const { isModalActive, changeCartModalState } = this.props;
    changeCartModalState(!isModalActive);
  };
  render() {
    const { isModalActive } = this.props;
    return (
      <div className="">
        <Navbar />
        <div
          className={`py-4 min-h-screen ${isModalActive ? "bg-gray-500 filter brightness-50 pointer-events-none" : ""}`}
        >
          <div onClick={this.handleCartClick} className={containerSettings}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}
const reduxStateProps = (state: RootState) => ({
  isModalActive: state.cartModalState.isActive,
});

const reduxDispatchProps = (dispatch: Dispatch) => ({
  changeCartModalState: (isActive: boolean) =>
    dispatch(changeCartModalState(isActive)),
});

export default connect(reduxStateProps, reduxDispatchProps)(GeneralPagesRoutes);
