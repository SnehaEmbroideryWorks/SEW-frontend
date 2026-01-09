import API_BASE_URL from "../config/api";
import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function OrderSummary() {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login", { state: { from: "/order-summary" } });
        return;
      }

      for (const item of cartItems) {
        await fetch(`${API_BASE_URL}/api/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            designId: item.designId,
            threadColors: item.threadColors,
            fabricColor: item.fabricColor,
            measurements: item.measurements,
            referenceImage: item.fabricImage,
            notes: item.notes,
            price: item.price
          })
        });
      }

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert("Order failed. Please try again.");
      console.error(err);
    }
  };

  if (cartItems.length === 0) {
    return <p className="p-6 text-center">No items to summarize</p>;
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-blue-900 mb-8">
        Order Summary
      </h1>

      <div className="space-y-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="border border-blue-200 rounded-xl p-6 bg-white"
          >
            <div className="flex gap-6 items-start">

              {/* PRODUCT IMAGE */}
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-28 h-36 object-cover rounded-lg border"
              />

              {/* DETAILS */}
              <div className="flex-1 flex justify-between">
                {/* LEFT */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-blue-900">
                    {item.name}
                  </h3>

                  {item.neckType && (
                    <p className="text-sm capitalize">
                      {item.neckType.replace("-", " ")}
                    </p>
                  )}

                  <p className="text-sm">
                    <strong>Size:</strong> {item.size}
                  </p>

                  {/* THREAD COLORS */}
                  {item.threadColors?.length > 0 && (
                    <div className="mt-3">
                      <p className="font-medium text-sm mb-1">
                        Thread Colors
                      </p>

                      {item.threadColors.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span className="font-medium">
                            {t.area}
                          </span>
                          <span className="text-blue-900">
                            {t.code}
                          </span>
                          <span
                            className="w-4 h-4 rounded border"
                            style={{ backgroundColor: t.hex }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
{/* MEASUREMENTS */}
{item.measurements && (
  <div className="mt-3">
    <p className="font-medium text-sm mb-1">Measurements (cm)</p>

    <div className="grid grid-cols-2 gap-x-6 text-sm">
      <p>Blouse Height: {item.measurements.blouseHeight}</p>
      <p>Back Neck: {item.measurements.backNeck}</p>
      <p>Front Neck: {item.measurements.frontNeck}</p>
      <p>Hands Height: {item.measurements.handsHeight}</p>
      <p>Hands Loose: {item.measurements.handsLoose}</p>
    </div>
  </div>
)}

                  {/* FABRIC */}
                  <div className="mt-3 flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium">
                        Fabric Color
                      </p>
                      <div
                        className="w-6 h-6 rounded border"
                        style={{ backgroundColor: item.fabricColor }}
                      />
                    </div>

                    {item.fabricImage && (
                      <div>
                        <p className="text-sm font-medium">
                          Fabric Image
                        </p>
                        <img
                          src={item.fabricImage}
                          alt="Fabric"
                          className="w-14 h-14 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>

                  {/* NOTES */}
                  {item.notes && (
                    <p className="text-sm mt-3">
                      <strong>Notes:</strong> {item.notes}
                    </p>
                  )}
                </div>

                {/* RIGHT */}
                <div className="text-right">
                  <p className="text-lg font-medium">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-red-600 text-sm mt-2 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* TOTAL + ACTION */}
      <div className="mt-10 flex justify-between items-center border-t pt-6">
        <p className="text-lg font-semibold">
          Total: ₹{total}
        </p>

        <button
          onClick={placeOrder}
          className="bg-blue-900 text-white px-6 py-3 rounded"
        >
          Place Order
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Payment will be collected in person at the store.
      </p>
    </div>
  );
}

