import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import ReviewsPage from "./components/ReviewsPage";
import "./scss/style.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/reviews/:productId" element={<ReviewsPage />} />
        <Route path="/" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
