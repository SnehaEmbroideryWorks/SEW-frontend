import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-12 text-center">
        <h2 className="text-2xl font-semibold text-blue-900">
          Your cart is empty
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-blue-900 mb-8">
        Your Cart
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
                src={item.imageUrl || item.image}
                alt={item.name}
                className="w-32 h-40 object-cover rounded-lg border"
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
                    ₹{Number(item.price)}
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

      <div className="mt-10 text-right">
        <button
          onClick={() => navigate("/order-summary")}
          className="bg-blue-900 text-white px-6 py-3 rounded"
        >
          Proceed to Order Summary
        </button>
      </div>
    </div>
  );
}





