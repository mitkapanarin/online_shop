import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Error, Home } from "./Pages";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
