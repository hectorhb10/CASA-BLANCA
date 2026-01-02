import "../styles/footer.css";
import { FaWhatsapp, FaMoneyBillWave, FaMobile } from "react-icons/fa6";
import { useCart } from "../context/CartContext";

const WHATSAPP_NUMBER = "523339487234";

export default function Footer() {
  const { setIsCartOpen } = useCart();

  const whatsappMessage = encodeURIComponent(
    "Hola 👋, me gustaría recibir información sobre mis pedidos en CASA BLANCA."
  );

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Columna 1 */}
        <div className="footer-col">
          <img
            src="./img/logo/CASA-BLANCA.png"
            alt="CASA BLANCA"
            className="footer-logo"
          />

          <p className="footer-text">
            Lunes a Viernes de 9:00 a.m. - 5:00 p.m.
          </p>

          <p className="footer-text">
            Contactanos para recibir actualizaciones sobre nuestros productos y
            descuentos.
          </p>

          {/* WhatsApp social */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-whatsapp"
          >
            <FaWhatsapp />
          </a>
        </div>

        {/* Columna 2 */}
        <div className="footer-col">
          <h4>CASA BLANCA</h4>
          <ul>
            <li>
              <button
                className="footer-link-btn"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Contáctenos
              </button>
            </li>
          </ul>
        </div>

        {/* Columna 3 */}
        <div className="footer-col">
          <h4>MI CUENTA</h4>
          <ul>
            <li>
              <button
                className="footer-link-btn"
                onClick={() => setIsCartOpen(true)}
              >
                Ver carrito
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <p>
          © 2026 CASA BLANCA. Todos los derechos reservados. Desarrollado por HB
          Studios.
        </p>

        <div className="footer-payments">
          <span className="footer-icon-text">
            <span className="icon">
              <FaMoneyBillWave />
            </span>
            Efectivo
          </span>
          <span className="footer-icon-text">
            <span className="icon">
              <FaMobile />
            </span>
            Transferencia
          </span>
        </div>
      </div>
    </footer>
  );
}
