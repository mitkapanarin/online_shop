import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/Layout";

export class GeneralPagesRoutes extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }
}

export default GeneralPagesRoutes;
