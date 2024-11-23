import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components/Layout";
import { connect } from "react-redux";
import { changeCartModalState, RootState } from "../../store";
import { containerSettings } from "../../CONSTANTS/Constants";
import { Dispatch } from "redux";

export interface IGeneralPagesRoutesProps {
  isModalActive: boolean;
  changeCartModalState: (isActive: boolean) => void;
}

export class GeneralPagesRoutes extends Component<IGeneralPagesRoutesProps> {
  constructor(props: IGeneralPagesRoutesProps) {
    super(props);
  }

  render() {
    const { isModalActive, changeCartModalState } = this.props;
    return (
      <div className="">
        <Navbar />
        <div
          onClick={() => changeCartModalState(false)}
          className={`py-4 min-h-screen ${isModalActive && "bg-gray-500 filter brightness-50"}`}
        >
          <div
            className={`${containerSettings} ${isModalActive && "pointer-events-none"}`}
          >
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
}

const reduxStateProps = (state: RootState) => ({
  isModalActive: state.cart.isCartModalActive,
});

const reduxDispatchProps = (dispatch: Dispatch) => ({
  changeCartModalState: (isActive: boolean) =>
    dispatch(changeCartModalState(isActive)),
});

export default connect(reduxStateProps, reduxDispatchProps)(GeneralPagesRoutes);
