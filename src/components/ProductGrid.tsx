type Product = {
  name: string;
  image: string;
};

type Props = {
  onAddToCart: (product: Product) => void;
};

export default function ProductGrid({ onAddToCart }: Props) {
  const products: Product[] = [
    { name: "Jabón Multiusos", image: "/img/jabon.png" },
  ];

  return (
    <div className="grid">
      {products.map((p) => (
        <div key={p.name} className="card">
          <img src={p.image} />
          <h4>{p.name}</h4>
          <button onClick={() => onAddToCart(p)}>Añadir al carrito</button>
        </div>
      ))}
    </div>
  );
}
