import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    fetch(`${API_BASE_URL}/api/orders/admin`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/api/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });

    fetchOrders();
  };

  /* ✅ DELETE ORDER (ADMIN) */
  const deleteOrder = async (orderId) => {
  if (!window.confirm("Delete this order permanently?")) return;

  await fetch(`${API_BASE_URL}/api/orders/admin/${orderId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  fetchOrders(); // refresh list
};


  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Admin Orders</h1>

      {orders.map(order => (
        <div
          key={order._id}
          className={`border rounded-xl p-4 mb-6 ${
            order.status === "cancelled"
              ? "bg-red-50 border-red-300"
              : "border-blue-200"
          }`}
        >
          <div className="flex gap-6">
            {/* PRODUCT IMAGE */}
            <img
              src={order.designId?.imageUrl}
              alt={order.designId?.name}
              className="w-32 h-32 object-cover rounded border"
            />

            <div className="flex-1 space-y-2">
              <h3 className="font-medium text-blue-900 text-lg">
                {order.designId?.name}
              </h3>

              <p className="text-sm">
                <strong>Customer:</strong>{" "}
                {order.userId?.name} ({order.userId?.email})
              </p>

              <p className="text-sm">
                <strong>Status:</strong>{" "}
                <span className="capitalize">{order.status}</span>
              </p>

              <p className="text-sm">
                <strong>Size:</strong> {order.size}
              </p>

              <p className="text-sm">
                <strong>Price:</strong> ₹{order.price}
              </p>

              {/* THREAD DETAILS */}
<div className="mt-3">
  <p className="font-medium text-sm mb-1">
    Thread Details
  </p>

  {order.threadColors?.length > 0 ? (
    order.threadColors.map((t, i) => {
      const areaName = t.area || t.label || "Flower";
      const codeName = t.code || "";
      const colorHex = t.hex || t.color || "#ccc";

      return (
        <div
          key={i}
          className="flex items-center gap-3 text-sm"
        >
          <span className="font-medium">
            {areaName}
          </span>

          {codeName && (
            <span className="font-semibold text-blue-900">
              {codeName}
            </span>
          )}

          <span
            className="w-4 h-4 rounded border"
            style={{ backgroundColor: colorHex }}
          />
        </div>
      );
    })
  ) : (
    <p className="text-sm italic text-gray-500">
      No thread colors selected
    </p>
  )}
</div>

{/* MEASUREMENTS */}
{order.measurements && (
  <div className="mt-3">
    <p className="font-medium text-sm mb-1">
      Customer Measurements (cm)
    </p>

    <div className="grid grid-cols-1 gap-x-8 text-sm">
      <p>Blouse Height: {order.measurements.blouseHeight}</p>
      <p>Back Neck: {order.measurements.backNeck}</p>
      <p>Front Neck: {order.measurements.frontNeck}</p>
      <p>Hands Height: {order.measurements.handsHeight}</p>
      <p>Hands Loose: {order.measurements.handsLoose}</p>
    </div>
  </div>
)}


              {/* BLOUSE FABRIC */}
              <div className="mt-3 flex items-center gap-3">
                <p className="font-medium text-sm">
                  Blouse Fabric Color:
                </p>
                <div
                  className="w-5 h-5 rounded border"
                  style={{ backgroundColor: order.fabricColor }}
                />
                <span className="text-sm">{order.fabricColor}</span>
              </div>

              {/* NOTES */}
              {order.notes && (
                <div className="mt-3">
                  <p className="font-medium text-sm">
                    Notes from Customer:
                  </p>
                  <p className="text-sm italic">{order.notes}</p>
                </div>
              )}

              {/* STATUS CONTROL */}
              {order.status !== "cancelled" && (
                <select
                  value={order.status}
                  onChange={e =>
                    updateStatus(order._id, e.target.value)
                  }
                  className="mt-4 border p-2 rounded"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              )}

              {/* ❌ DELETE ORDER */}
              <button
                onClick={() => deleteOrder(order._id)}
                className="mt-4 text-red-600 underline text-sm"
              >
                Delete Order
              </button>

              {order.status === "cancelled" && (
                <p className="text-red-600 mt-2 font-medium">
                  Order cancelled by customer
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
