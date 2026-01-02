import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import "../styles/product-detail.css";

export default function ProductDetail() {
  const { name } = useParams<{ name: string }>();
  const { addToCart } = useCart();

  const product = products.find((p) => p.name === name);

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  if (!product) {
    return <p className="not-found">Producto no encontrado</p>;
  }

  /* =========================
     TEXTO DE UNIDAD
  ========================= */
  const getUnitLabel = () => {
    if (product.unit === "liter") return "L";
    if (product.unit === "piece") return "pz";
    return "";
  };

  /* =========================
     AGREGAR AL CARRITO
  ========================= */
  const handleAddToCart = () => {
    if (loading) return;

    setLoading(true);

    setTimeout(() => {
      addToCart({
        ...product,
        id:
          product.unit === "liter"
            ? Number(`${product.id}${size}`)
            : product.id,
        name:
          product.unit === "liter"
            ? `${product.name} ${size}${getUnitLabel()}`
            : product.name,
        quantity,
        size: product.unit === "liter" ? size : 1,
      });

      setQuantity(1);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="product-detail-container">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link">
          Inicio
        </Link>
        {" › "}
        <Link to="/" className="breadcrumb-link">
          Productos
        </Link>
        {" › "}
        <span>{product.name}</span>
      </div>

      <div className="product-detail-grid">
        {/* Imagen */}
        <div className="product-detail-image">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>

          <p className="product-short-desc">{product.description}</p>

          <p className="product-price">${product.price} MXN</p>

          {/* Medidas (solo litros) */}
          {product.unit === "liter" && (
            <div className="product-sizes">
              <span>Medida:</span>
              {[10, 5, 1].map((l) => (
                <button
                  key={l}
                  className={size === l ? "active" : ""}
                  onClick={() => setSize(l)}
                >
                  {l} {getUnitLabel()}
                </button>
              ))}
            </div>
          )}

          {/* Cantidad */}
          <div className="product-quantity">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
              −
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)}>+</button>
          </div>

          {/* Botón agregar */}
          <button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-inner" />
                Agregando...
              </>
            ) : (
              <>
                <FaCartPlus />
                Agregar al carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
