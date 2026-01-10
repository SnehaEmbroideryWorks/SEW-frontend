import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    fetch(`${API_BASE_URL}/api/orders/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Cancel this order?")) return;

    await fetch(`${API_BASE_URL}/api/orders/${orderId}/cancel`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` }
    });

    fetchOrders();
  };

  if (loading) return <p className="p-6">Loading orders...</p>;
  if (orders.length === 0) return <p className="p-6">No orders found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6">My Orders</h1>

      {orders.map(order => (
        <div
          key={order._id}
          className={`border rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 sm:gap-6 ${
            order.status === "cancelled"
              ? "bg-red-50 border-red-300"
              : "border-blue-200"
          }`}
        >
          {/* PRODUCT IMAGE */}
          <div className="w-full md:w-32 h-40 md:h-32 border rounded overflow-hidden flex-shrink-0">
            {order.designId?.imageUrl ? (
              <img
                src={order.designId.imageUrl}
                alt={order.designId.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-sm">
                No Image
              </div>
            )}
          </div>

          {/* DETAILS */}
          <div className="flex-1 space-y-2 text-sm sm:text-base">
            <h3 className="font-medium text-blue-900 text-base sm:text-lg">
              {order.designId?.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6">
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize">{order.status}</span>
              </p>
              <p>
                <strong>Size:</strong> {order.size}
              </p>
              <p>
                <strong>Price:</strong> ₹{order.price}
              </p>
            </div>

            {/* THREAD COLORS */}
            {order.threadColors?.length > 0 && (
              <div className="mt-3">
                <p className="font-medium text-sm mb-1">Thread Colors</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-1">
                  {order.threadColors.map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{t.area}</span>
                      <span className="text-blue-900">{t.code}</span>
                      <span
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: t.hex }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MEASUREMENTS */}
            {order.measurements && (
              <div className="mt-3">
                <p className="font-medium text-sm mb-1">Measurements (cm)</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  <p>Blouse Height: {order.measurements.blouseHeight}</p>
                  <p>Back Neck: {order.measurements.backNeck}</p>
                  <p>Front Neck: {order.measurements.frontNeck}</p>
                  <p>Hands Height: {order.measurements.handsHeight}</p>
                  <p>Hands Loose: {order.measurements.handsLoose}</p>
                </div>
              </div>
            )}

            {/* BLOUSE FABRIC COLOR */}
            <div className="mt-3 flex items-center gap-3 flex-wrap">
              <p className="font-medium text-sm">Blouse Fabric Color:</p>
              <div
                className="w-5 h-5 rounded border"
                style={{ backgroundColor: order.fabricColor }}
              />
              <span className="text-sm">{order.fabricColor}</span>
            </div>

            {/* NOTES */}
            {order.notes && (
              <div className="mt-3">
                <p className="font-medium text-sm">Your Notes:</p>
                <p className="text-sm italic break-words">{order.notes}</p>
              </div>
            )}

            {/* CANCEL */}
            {order.status !== "completed" &&
              order.status !== "cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  className="mt-3 text-red-600 underline text-sm"
                >
                  Cancel Order
                </button>
              )}
          </div>
        </div>
      ))}
    </div>
  );
}
