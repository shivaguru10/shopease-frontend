import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Order Placed Successfully 🎉
      </h1>

      <Link
        to="/"
        className="text-blue-600 underline"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
