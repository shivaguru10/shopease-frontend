import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover rounded"
      />

      <div className="mt-3">
        <h3 className="font-semibold text-lg">{product.name}</h3>

        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mt-3">
          <span className="text-blue-600 font-bold">
            ₹{product.price}
          </span>

          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
