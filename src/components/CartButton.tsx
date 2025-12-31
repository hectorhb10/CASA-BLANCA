import { useCart } from "../context/CartContext";
import { FaBagShopping } from "react-icons/fa6";
import "../styles/cartButton.css";

export function CartButton() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
      <FaBagShopping />
      {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
    </button>
  );
}
