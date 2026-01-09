import { useState } from "react";
import API_BASE_URL from "../../config/api";

export default function AddDesign() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [neckType, setNeckType] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE_URL}/api/designs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          category,
          neckType, // already normalized
          price: Number(price),
          imageUrl
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to add design");
        return;
      }

      setMessage("Design added successfully");
      setName("");
      setCategory("");
      setNeckType("");
      setPrice("");
      setImageUrl("");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold text-blue-900 mb-6">
        Add New Design
      </h1>

      {message && (
        <p className="text-green-600 mb-4">{message}</p>
      )}

      {error && (
        <p className="text-red-600 mb-4">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Design Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          placeholder="Category (Traditional, Bridal...)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
          required
        />

        {/* ✅ NECK TYPE DROPDOWN (BULLETPROOF) */}
        <select
          value={neckType}
          onChange={(e) => setNeckType(e.target.value)}
          className="w-full border p-2"
          required
        >
          <option value="">Select Neck Type</option>
          <option value="u-shaped-neck">U Shaped Neck</option>
          <option value="round-neck">Round Neck</option>
          <option value="star-neck">Star Neck</option>
          <option value="pot-neck">Pot Neck</option>
          <option value="boat-neck">Boat Neck</option>
        </select>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2"
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-2 rounded"
        >
          Add Design
        </button>
      </form>
    </div>
  );
}
