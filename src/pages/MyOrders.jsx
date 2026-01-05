import { useEffect, useState } from "react";
import api from "../services/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api.get("/orders/myorders");
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded p-4"
            >
              <p>
                <b>Order ID:</b> {order._id}
              </p>
              <p>
                <b>Status:</b> {order.orderStatus}
              </p>
              <p>
                <b>Total:</b> ₹{order.totalPrice}
              </p>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
