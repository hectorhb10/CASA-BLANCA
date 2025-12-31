import type { Product } from "../types/Product";
import { Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import { useState } from "react";
import "../styles/products.css";

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

export default function ProductCard({ product, addToCart }: Props) {
  const [loading, setLoading] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      addToCart(product);
      setLoading(false);
    }, 2000); // spinner 2 segundos
  };

  return (
    <div className="product-card">
      <Link to={`/producto/${product.name}`} className="product-link">
        {product.isNew && <span className="product-badge">NUEVO</span>}

        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">
            ${product.price} MXN - ${product.price * 5} MXN
          </p>
        </div>
      </Link>

      {/* Botón + spinner */}
      <button
        className="add-to-cart"
        onClick={handleAdd}
        disabled={loading}
        aria-label="Añadir al carrito"
      >
        {!loading && <FaBagShopping />}
        {loading && <span className="spinner-inner" />}
      </button>
    </div>
  );
}
