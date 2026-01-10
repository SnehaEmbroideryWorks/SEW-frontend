import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import ColorSwatchGrid from "../Components/ColorSwatchGrid";
import API_BASE_URL from "../config/api";
import THREAD_CATALOGUE from "../constants/threadCatalogue";

export default function DesignDetail() {
  const { designId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdded, setIsAdded] = useState(false);


  /* THREAD COLORS (FINAL STRUCTURE) */
  const [threadColors, setThreadColors] = useState([
    { area: "Flower", code: "", hex: "#000000" }
  ]);
  const [activeThreadIndex, setActiveThreadIndex] = useState(null);

  /* FABRIC */
  const [fabricImage, setFabricImage] = useState(null);
  const [fabricColor, setFabricColor] = useState("#ffffff");

   /* MEASUREMENTS (NEW) */
  const [measurements, setMeasurements] = useState({
    blouseHeight: "",
    backNeck: "",
    frontNeck: "",
    handsHeight: "",
    handsLoose: ""
  });
  const [notes, setNotes] = useState("");

  /* FETCH DESIGN */
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/designs/${designId}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Design not found");
          return;
        }

        setDesign(data.design || data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDesign();
  }, [designId]);

  /* THREAD COLOR UPDATE (FIXED) */
  const updateThreadColor = (selectedColor) => {
    setThreadColors(prev =>
      prev.map((t, i) =>
        i === activeThreadIndex
          ? {
              ...t,
              code: selectedColor.name, // 1.LL
              hex: selectedColor.hex    // #f3e1ed
            }
          : t
      )
    );
    setActiveThreadIndex(null);
  };

  if (loading) return <p className="p-6 text-center">Loading design...</p>;
  if (error || !design)
    return <p className="p-6 text-center text-red-600">{error}</p>;

  const cartItem = {
    designId: design._id,
    name: design.name,
    neckType: design.neckType,
    price: Number(design.basePrice),
    measurements,
    imageUrl: design.imageUrl,
    fabricColor,
    fabricImage,
    threadColors,
    notes
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* DESIGN IMAGE */}
        <img
          src={design.imageUrl}
          alt={design.name}
          className="rounded-xl shadow-lg w-full"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-semibold text-blue-900 mb-1">
            {design.name}
          </h1>

          <p className="text-blue-700 mb-2 capitalize">
            {design.neckType?.replace("-", " ")}
          </p>

          <p className="text-lg font-medium mb-6">
            ₹{design.basePrice}
          </p>

          {/* THREAD COLORS */}
          <h3 className="font-medium mb-3">Thread Colors</h3>

          {threadColors.map((item, index) => (
            <div
              key={index}
              className="border border-blue-200 rounded p-3 mb-3"
            >
              <input
                type="text"
                placeholder="Area (Flower, Border...)"
                value={item.area}
                onChange={e => {
                  const copy = [...threadColors];
                  copy[index].area = e.target.value;
                  setThreadColors(copy);
                }}
                className="w-full border p-2 mb-2"
              />

              <div className="flex items-center justify-between">
                <div
                  className="w-8 h-8 border rounded"
                  style={{ backgroundColor: item.hex }}
                />
                <button
                  onClick={() => setActiveThreadIndex(index)}
                  className="text-sm underline text-blue-800"
                >
                  Choose Color
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={() =>
              setThreadColors([
                ...threadColors,
                { area: "", code: "", hex: "#000000" }
              ])
            }
            className="text-sm underline text-blue-800 mb-6"
          >
            + Add another thread color
          </button>

          {/* FABRIC PICKER — VISUALLY HIGHLIGHTED */}
          <h3 className="font-medium mt-8 mb-2">Blouse Fabric</h3>

          <div className="border-2 border-dashed border-blue-400 bg-blue-50 rounded-lg p-4">
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Upload fabric image
            </label>

            <input
              type="file"
              accept="image/*"
              className="w-full border border-blue-300 rounded px-3 py-2 bg-white cursor-pointer"
              onChange={e => {
                const file = e.target.files[0];
                if (!file) return;
                setFabricImage(URL.createObjectURL(file));
              }}
            />

            {fabricImage && (
              <div className="mt-4">
                <img
                  ref={imgRef}
                  src={fabricImage}
                  hidden
                  onLoad={() => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    const img = imgRef.current;
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                  }}
                />

                <p className="text-sm mt-3 mb-1 text-blue-800">
                  Click on the fabric to pick color
                </p>

                <canvas
                  ref={canvasRef}
                  className="border-2 border-blue-400 rounded cursor-crosshair max-w-full"
                  onClick={e => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    const rect = canvas.getBoundingClientRect();
                    const x = Math.floor((e.clientX - rect.left) * (canvas.width / rect.width));
                    const y = Math.floor((e.clientY - rect.top) * (canvas.height / rect.height));
                    const pixel = ctx.getImageData(x, y, 1, 1).data;
                    const hex = `#${[pixel[0], pixel[1], pixel[2]]
                      .map(v => v.toString(16).padStart(2, "0"))
                      .join("")}`;
                    setFabricColor(hex);
                  }}
                />

                <div className="flex items-center gap-3 mt-3">
                  <div className="w-6 h-6 rounded border" style={{ backgroundColor: fabricColor }} />
                  <span className="text-sm font-medium">{fabricColor}</span>
                </div>
              </div>
            )}
          </div>

          {/* MEASUREMENTS FORM */}
          <h3 className="font-medium mb-3">Measurements (cm)</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["blouseHeight", "Blouse Height"],
              ["backNeck", "Back Neck"],
              ["frontNeck", "Front Neck"],
              ["handsHeight", "Hands Height"],
              ["handsLoose", "Hands Loose"]
            ].map(([key, label]) => (
              <input
                key={key}
                type="number"
                placeholder={label}
                value={measurements[key]}
                onChange={e =>
                  setMeasurements({
                    ...measurements,
                    [key]: e.target.value
                  })
                }
                className="border p-2 rounded"
              />
            ))}
          </div>


          {/* NOTES */}
          <h3 className="w-full  p-2 mt-2">**Add Phone Number</h3>
          <textarea
            rows={3}
            className="w-full border p-2 mt-2"
            placeholder="Add your phone number & notes for designer"
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          {/* ACTIONS */}
          <div className="flex gap-4 mt-6">
            <button
  onClick={() => {
    if (!isAdded) {
      addToCart(cartItem);
      setIsAdded(true);
    } else {
      setIsAdded(false);
      // UI toggle only — actual cart remove can be added later
    }
  }}
  className={`border px-4 py-2 ${
    isAdded ? "bg-green-600 text-white" : ""
  }`}
>
  {isAdded ? "Added ✓" : "Add to Cart"}
</button>


            <button
              onClick={() => {
                addToCart(cartItem);
                setIsAdded(true);
                navigate("/order-summary");
              }}
              className="bg-blue-900 text-white px-4 py-2"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* THREAD COLOR POPUP */}
      {activeThreadIndex !== null && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-[520px] max-h-[70vh] overflow-y-auto ">
            <div className="flex justify-between">
                <h3 className="font-medium mb-4">Choose Thread Color</h3>
              <button
                onClick={() => setActiveThreadIndex(null)}
                className=" underline text-red-800 text-sm"
              >
                Cancel
              </button>
            </div>
            <div className="text-sm pb-3">
              <p>**NOTE these colors are just close resemblance to original thread colors</p>
            </div>
            <div className="grid grid-cols-10 gap-3">
              <ColorSwatchGrid
                colors={THREAD_CATALOGUE}
                selectedColor={threadColors[activeThreadIndex].hex}
                onSelect={updateThreadColor}
              />
            </div>

            <button
              onClick={() => setActiveThreadIndex(null)}
              className="mt-6 underline text-blue-800 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}




