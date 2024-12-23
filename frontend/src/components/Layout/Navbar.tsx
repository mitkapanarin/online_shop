import React from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { containerSettings } from "../../_Constants";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { CartModal } from "../Cards";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const currentPath = location.pathname;

  const pathDetector = (route: string) =>
    currentPath === route
      ? "text-red-500 border-b-2 border-red-500 pb-3"
      : "text-black";

  const addDataTestIdFn = (route: string) =>
    currentPath === route ? "active-category-link" : "category-link";

  const [modalState, setModalState] = React.useState<boolean>(false);

  return (
    <>
      {/* Overlay */}
      {modalState && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setModalState(false)}
          data-testid="cart-overlay"
        ></div>
      )}
      <div className={`relative ${containerSettings}`}>
        <div className={`flex justify-between items-center my-4`}>
          <div className="uppercase flex gap-6">
            <Link
              to="/"
              data-testid={addDataTestIdFn("/")}
              className={pathDetector("/")}
            >
              Home
            </Link>
            <Link
              to="/all"
              data-testid={addDataTestIdFn("/all")}
              className={pathDetector("/all")}
            >
              All
            </Link>
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
          <img src="/store-logo.svg" alt="" />
          <div data-testid="cart-btn-container">
            <button
              className="cart-btn"
              data-testid="cart-btn"
              onClick={() => setModalState(!modalState)}
            >
              <HiOutlineShoppingCart className="cursor-pointer" />
              <span>{cart ? cart.length : 0}</span>
            </button>
          </div>
        </div>
        {modalState && (
          <div className="relative z-50">
            <CartModal />
          </div>
        )}
      </div>
    </>
  );
};
