import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const {
        cartItems,
        increaseQty,
        decreaseQty,
        removeFromCart,
    } = useCart();

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    if (cartItems.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-4">
                    Your cart is empty 🛒
                </h2>
                <Link to="/" className="text-blue-600 underline">
                    Go Shopping
                </Link>
            </div>
        );
    }

    const navigate = useNavigate();

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div
                        key={item._id}
                        className="flex items-center border rounded p-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1 ml-4">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-gray-600">₹{item.price}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => decreaseQty(item._id)}
                                className="px-2 py-1 border rounded"
                            >
                                −
                            </button>

                            <span>{item.qty}</span>

                            <button
                                onClick={() => increaseQty(item._id)}
                                className="px-2 py-1 border rounded"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item._id)}
                            className="ml-4 text-red-500"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            {/* Summary */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
                <h3 className="text-xl font-bold">
                    Subtotal: ₹{subtotal}
                </h3>

                <button
                    onClick={() => navigate("/checkout")}
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Proceed to Checkout
                </button>

            </div>
        </div>
    );
};

export default Cart;
