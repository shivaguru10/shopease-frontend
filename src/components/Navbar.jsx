import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow">
      <Link to="/" className="text-xl font-bold text-blue-600">
        ShopEase
      </Link>

      <div className="space-x-4 flex items-center">
        {user?.isAdmin && (
          <Link to="/admin/orders" className="text-blue-600 font-medium">
            Admin Orders
          </Link>
        )}

        <Link to="/cart" className="text-gray-700">
          Cart ({cartCount})
        </Link>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>Hi, {user.name}</span>
            {user && (
              <Link to="/my-orders" className="text-gray-700">
                My Orders
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
