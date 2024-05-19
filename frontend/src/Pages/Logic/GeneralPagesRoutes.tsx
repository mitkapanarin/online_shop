import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "../../components/Layout";

export class GeneralPagesRoutes extends Component {
  render() {
    return (
      <div className="container max-w-7xl mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  }
}

export default GeneralPagesRoutes;
