import { useEffect, useState } from "react";
import API_BASE_URL from "../config/api";

const steps = ["New", "In Progress", "Completed"];

export default function OrderTracking() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/orders/my`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  if (orders.length === 0) {
    return <p className="p-6">No orders to track</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">Order Tracking</h1>

      {orders.map(order => {
        const currentStep = steps.indexOf(order.status);

        return (
          <div
            key={order._id}
            className="border border-blue-200 rounded-xl p-6 mb-6 bg-white"
          >
            <h2 className="text-lg font-semibold text-blue-900">
              {order.designId?.name || "Design"}
            </h2>

            <p className="text-sm text-gray-600 mb-4">
              Order ID: {order._id}
            </p>

            {/* STATUS TIMELINE */}
            <div className="flex items-center gap-4">
              {steps.map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      index <= currentStep
                        ? "bg-blue-900"
                        : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`text-sm ${
                      index <= currentStep
                        ? "text-blue-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>

                  {index !== steps.length - 1 && (
                    <div className="w-10 h-[2px] bg-gray-300 mx-2" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
