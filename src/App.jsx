import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShopPage from "./pages/ShopPage";
import ProductDetail from "./pages/ProductDetail";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}
