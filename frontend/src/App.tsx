import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Clothes, Error, Home, Tech } from "./Pages";
import { Navbar } from "./components";

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clothes" element={<Clothes />} />
        <Route path="/tech" element={<Tech />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
