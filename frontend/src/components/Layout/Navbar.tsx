import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { containerSettings } from "../../_Constants";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { CartModal } from "../Cards";
import { ICategory } from "../../_Types";
import { useGetAllProductsQuery } from "../../store/API/fetchDataAPI";

export const Navbar: React.FC = () => {
  const location = useLocation();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const { data, isLoading } = useGetAllProductsQuery();
  const currentPath = location.pathname;

  const pathDetector = (route: string) =>
    currentPath === route
      ? "text-green-600 border-b-2 border-green-500 pb-3"
      : "text-black";

  const addDataTestIdFn = (route: string) =>
    currentPath === route ? "active-category-link" : "category-link";

  const [modalState, setModalState] = React.useState<boolean>(false);

  const prevCartLength = React.useRef(cart.length);

  useEffect(() => {
    if (cart.length > prevCartLength.current) {
      setModalState(true);
    }
    prevCartLength.current = cart.length;
  }, [cart]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={`relative ${containerSettings}`}>
        <div className={`flex justify-between items-center my-4`}>
          {modalState && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setModalState(false)}
              data-testid="cart-overlay"
              style={{ zIndex: 30 }}
            ></div>
          )}
          <div className="uppercase flex gap-6">
            {data?.data?.categories.map((category: ICategory) => (
              <Link
                key={category.name}
                to={`/${category.name.toLowerCase()}`}
                data-testid={addDataTestIdFn(`/${category.name.toLowerCase()}`)}
                className={pathDetector(`/${category.name.toLowerCase()}`)}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <img src="/store-logo.svg" alt="" />
          <div
            data-testid="cart-btn-container"
            style={{ position: "relative", zIndex: 40 }}
          >
            <button
              className="cart-btn"
              data-testid="cart-btn"
              onClick={() => setModalState(!modalState)}
              style={{ position: "relative", zIndex: 41 }}
            >
              <HiOutlineShoppingCart className="cursor-pointer" />
              <span>{cart ? cart.length : 0}</span>
            </button>
            {cart && cart.length > 0 && (
              <div
                data-testid="cart-summary"
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  backgroundColor: "white",
                  padding: "5px",
                  border: "1px solid #ccc",
                  zIndex: 42,
                }}
              >
                {cart.length === 1 ? "1 item" : `${cart.length} items`}
              </div>
            )}
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
