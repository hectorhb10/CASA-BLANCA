import { FaPhone } from "react-icons/fa6";
import { CartButton } from "./CartButton";

export const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <img
          src="./img/logo/CASA-BLANCA-2.png"
          alt="CASA BLANCA"
          className="header-banner"
        />

        <div className="header-right">
          <span className="header-phone">
            <FaPhone />
            <span>(33) 3948 7234</span>
          </span>

          <CartButton />
        </div>
      </div>
    </header>
  );
};
