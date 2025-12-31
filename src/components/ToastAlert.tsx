import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/toast.css";

export default function ToastAlert() {
  const { toastOpen, toastProduct, closeToast } = useCart();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    if (toastOpen && toastProduct) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(closeToast, 300);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [toastOpen, toastProduct, closeToast]);

  if (!toastOpen || !toastProduct) return null;

  return (
    <div className={`toast ${visible ? "show" : "hide"}`}>
      <img
        src={toastProduct.image}
        alt={toastProduct.name}
        className="toast-img"
      />
      <div className="toast-content">
        <h4>{toastProduct.name}</h4>
        <p>Se ha agregado al carrito</p>
        <div className="toast-buttons">
          <button onClick={() => setIsCartOpen(true)}>Ver carrito</button>
          <button onClick={() => navigate("/checkout")}>Hacer pedido</button>
        </div>
      </div>
    </div>
  );
}
