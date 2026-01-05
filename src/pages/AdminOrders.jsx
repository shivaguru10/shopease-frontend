import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.isAdmin) {
      api.get("/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const updateStatus = async (orderId, status) => {
    await api.put(`/orders/${orderId}/status`, { status });
    setOrders(
      orders.map((o) =>
        o._id === orderId ? { ...o, orderStatus: status } : o
      )
    );
  };

  if (!user?.isAdmin) {
    return (
      <div className="p-6 text-center text-red-500">
        Admin access only
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Orders (Admin)</h2>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">User</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Update</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border p-2">
                {order.user?.name}
              </td>
              <td className="border p-2">
                ₹{order.totalPrice}
              </td>
              <td className="border p-2">
                {order.orderStatus}
              </td>
              <td className="border p-2">
                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="border p-1"
                >
                  <option>Placed</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
