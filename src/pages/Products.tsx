import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";
import { useCart } from "../context/CartContext";

export default function Products() {
  const { addToCart } = useCart();

  return (
    <div className="products-container">
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}
