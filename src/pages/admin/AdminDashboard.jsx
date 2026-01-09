import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-blue-900 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          to="/admin/orders"
          className="border border-blue-200 rounded-xl p-6 hover:shadow transition bg-white"
        >
          <h2 className="text-xl font-medium mb-2">View Orders</h2>
          <p className="text-sm text-gray-600">
            See all customer orders and their status
          </p>
        </Link>

        <Link
          to="/admin/add-design"
          className="border border-blue-200 rounded-xl p-6 hover:shadow transition bg-white"
        >
          <h2 className="text-xl font-medium mb-2">Add Product</h2>
          <p className="text-sm text-gray-600">
            Add new embroidery designs
          </p>
        </Link>

        <Link
          to="/admin/manageproducts"
          className="border border-blue-200 rounded-xl p-6 hover:shadow transition bg-white"
        >
          <h2 className="text-xl font-medium mb-2">Manage Products</h2>
          <p className="text-sm text-gray-600">
            Edit / delete designs
          </p>
        </Link>

        
      </div>
    </div>
  );
}
