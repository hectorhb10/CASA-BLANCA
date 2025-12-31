import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegRectangleXmark, FaWhatsapp, FaXmark } from "react-icons/fa6";
import "../styles/cartSidebar.css";
import { sendWhatsAppOrder } from "../services/whatsappOrder.service";

export default function CartSidebar() {
  const { cart, setCart, isCartOpen, setIsCartOpen } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleRemove = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const formatSize = (size: number, unit: "liter" | "piece") => {
    if (unit === "liter") {
      return `${size} L`;
    }

    return `${size} pz`;
  };

  const handleOrder = () => {
    if (!name.trim() || phone.length < 10) {
      alert("Ingresa nombre y teléfono válidos");
      return;
    }

    sendWhatsAppOrder({
      cart,
      customerName: name,
      customerPhone: phone,
      businessPhone: "523339487234", // TU NÚMERO
      subtotal,
    });
  };

  if (!isCartOpen) return null;

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      {/* Cerrar */}
      <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
        <FaXmark />
      </button>

      <h2>Mi Carrito</h2>

      {/* Carrito vacío */}
      {cart.length === 0 && <p className="cart-empty">Tu carrito está vacío</p>}

      {/* Productos */}
      {cart.length > 0 && (
        <div className="cart-items-container">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <p>{item.name}</p>
                <p>Cantidad: {item.quantity}</p>
                <p>Tamaño: {formatSize(item.size, item.unit)}</p>
                <p style={{ color: "#00bcd4", fontWeight: 600 }}>
                  ${item.price * item.quantity} MXN
                </p>
              </div>

              <img src={item.image} alt={item.name} />

              <button
                className="cart-item-remove"
                onClick={() => handleRemove(item.id)}
              >
                <FaXmark />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Formulario */}
      {cart.length > 0 && (
        <div className="cart-form">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      )}

      {/* Subtotal */}
      {cart.length > 0 && (
        <div className="cart-footer">
          <p>Subtotal: ${subtotal.toFixed(2)} MXN</p>
        </div>
      )}

      {/* Botones */}
      {cart.length > 0 && (
        <div className="cart-buttons">
          <button className="cart-btn-delete" onClick={handleClearCart}>
            <FaRegRectangleXmark />
            Eliminar
          </button>

          <button
            className="cart-btn-complete"
            onClick={handleOrder}
            disabled={!name || !phone}
          >
            <FaWhatsapp />
            Hacer Pedido
          </button>
        </div>
      )}
    </div>
  );
}
