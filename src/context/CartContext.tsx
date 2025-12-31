import { createContext, useContext, useState } from "react";
import type { Product } from "../types/Product";

type CartItem = Product & {
  quantity: number;
  unit: "liter" | "piece";
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  toastOpen: boolean;
  toastProduct: Product | null;
  closeToast: () => void;
  isCartOpen: boolean;
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }

      return [...prev, product];
    });
  };

  const closeToast = () => {
    setToastOpen(false);
    setToastProduct(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.length,
        addToCart,
        setCart,
        isCartOpen,
        setIsCartOpen,
        toastOpen,
        toastProduct,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
};
