import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { cart, cartCount } = useCart();
  const [phone, setPhone] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!phone) {
      alert("Por favor ingresa tu número de teléfono");
      return;
    }

    // Crear mensaje de WhatsApp
    const message = `Hola, quiero hacer un pedido:\n\n${cart
      .map(
        (item) =>
          `- ${item.name} x${item.quantity} = $${
            item.price * item.quantity
          } MXN`
      )
      .join("\n")}\n\nTotal: $${total} MXN\nTeléfono: ${phone}`;

    const whatsappNumber = "521XXXXXXXXXX"; // número de WhatsApp destino
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  const { setCart } = useCart();

  const handleRemove = (id: number) => {
    // Eliminar item completo si se equivoca
    setCart(cart.filter((item) => item.id !== id));
  };

  if (cart.length === 0) return <p>Tu carrito está vacío.</p>;

  return (
    <div style={{ maxWidth: 800, margin: "20px auto", padding: "0 16px" }}>
      <h2>Mi Pedido ({cartCount} productos)</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {cart.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 8,
              gap: 12,
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 60, height: 60, objectFit: "contain" }}
            />
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>{item.name}</p>
              <p style={{ margin: 0 }}>
                Cantidad: {item.quantity} | Total: ${item.price * item.quantity}{" "}
                MXN
              </p>
            </div>
            <button
              style={{
                background: "red",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "4px 8px",
                cursor: "pointer",
              }}
              onClick={() => handleRemove(item.id)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 20,
          padding: 12,
          borderTop: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <p style={{ fontWeight: 600 }}>Total a pagar: ${total} MXN</p>

        <input
          type="tel"
          placeholder="Tu número de teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <button
          onClick={handleOrder}
          style={{
            padding: 10,
            borderRadius: 6,
            background: "#00bcd4",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Hacer pedido
        </button>
      </div>
    </div>
  );
}
