type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

interface WhatsAppOrderParams {
  cart: CartItem[];
  customerName: string;
  customerPhone: string;
  businessPhone: string;
  subtotal: number;
}

export const sendWhatsAppOrder = ({
  cart,
  customerName,
  customerPhone,
  businessPhone,
  subtotal,
}: WhatsAppOrderParams) => {
  if (!cart.length) return;

  const orderId = Date.now();

  const products = cart
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} x${item.quantity} - $${(
          item.price * item.quantity
        ).toFixed(2)} MXN`
    )
    .join("\n");

  const message = `
*NUEVO PEDIDO*
------------------
Número de pedido: ${orderId}

Cliente: ${customerName}
Teléfono: ${customerPhone}

Pedido:
${products}

------------------
Subtotal: $${subtotal.toFixed(2)} MXN
Total: $${subtotal.toFixed(2)} MXN
`;

  const encodedMessage = encodeURIComponent(message);

  // negocio
  window.open(
    `https://wa.me/${businessPhone}?text=${encodedMessage}`,
    "_blank"
  );

  // cliente
  window.open(
    `https://wa.me/52${customerPhone}?text=${encodedMessage}`,
    "_blank"
  );
};
