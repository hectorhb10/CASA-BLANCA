import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import ToastAlert from "./components/ToastAlert";
import CartSidebar from "./components/CartSideBar";

export default function App() {
  return (
    <>
      <Header />
      <CartSidebar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/producto/:name" element={<ProductDetail />} />
      </Routes>
      <ToastAlert />
    </>
  );
}
