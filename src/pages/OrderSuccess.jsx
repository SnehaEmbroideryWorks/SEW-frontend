import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center border border-blue-200 rounded-xl p-10 bg-white max-w-md">
        <h1 className="text-3xl font-semibold text-blue-900 mb-4">
          Order Placed Successfully 🎉
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your order.  
          Our team will contact you soon for further details.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Payment will be collected in person at the store.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="px-5 py-2 border border-blue-900 rounded text-blue-900"
          >
            Back to Home
          </Link>

          <Link
            to="/orders"
            className="px-5 py-2 bg-blue-900 text-white rounded"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
