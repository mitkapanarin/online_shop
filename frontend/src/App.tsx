import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Clothes, Error, Home, ProductDetails, Tech } from "./Pages";
import { Navbar } from "./components";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/all" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
