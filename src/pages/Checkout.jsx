import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("India");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔒 Require login
  if (!user) {
    navigate("/login");
    return null;
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const placeOrderHandler = async () => {
    if (!address || !city || !postalCode) {
      setError("Please fill all address fields");
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        orderItems: cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: {
          address,
          city,
          postalCode,
          country,
        },
        paymentMethod: "COD",
        totalPrice,
      };

      await api.post("/orders", orderData);

      clearCart();               // 🧹 clear cart
      navigate("/order-success"); // redirect
    } catch (err) {
      setError(err.response?.data?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Form */}
        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        {/* Order Summary */}
        <div className="border rounded p-4">
          <h3 className="font-bold mb-3">Order Summary</h3>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm mb-2"
            >
              <span>
                {item.name} × {item.qty}
              </span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}

          <hr className="my-3" />

          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={placeOrderHandler}
            disabled={loading}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            {loading ? "Placing Order..." : "Place Order (COD)"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
