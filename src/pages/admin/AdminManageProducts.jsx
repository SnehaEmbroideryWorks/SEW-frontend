import { useEffect, useState } from "react";
import API_BASE_URL from "../../config/api";

const normalize = (value = "") =>
  value.toLowerCase().replace(/\s+/g, "-");

export default function AdminManageProducts() {
  const [designs, setDesigns] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    neckType: "",
    imageUrl: ""
  });

  /* FILTER STATE */
  const [search, setSearch] = useState("");
  const [neckFilter, setNeckFilter] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const token = localStorage.getItem("token");

  /* FETCH PRODUCTS */
  const fetchDesigns = async () => {
    const res = await fetch(`${API_BASE_URL}/api/designs`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    const list = data.designs || [];
    setDesigns(list);
    setFiltered(list);
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  /* APPLY FILTERS */
  useEffect(() => {
    let result = [...designs];

    if (search) {
      result = result.filter(d =>
        d.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (neckFilter !== "all") {
      result = result.filter(d =>
        normalize(d.neckType) === normalize(neckFilter)
      );
    }

    if (minPrice) {
  result = result.filter(
    d => (d.basePrice ?? d.price) >= Number(minPrice)
  );
} 
if (maxPrice) {
  result = result.filter(
    d => (d.basePrice ?? d.price) <= Number(maxPrice)
  );
}


    

    setFiltered(result);
  }, [search, neckFilter, minPrice, maxPrice, designs]);

  /* EDIT */
  const startEdit = (d) => {
    setEditingId(d._id);
    setForm({
  name: d.name,
  price: d.basePrice ?? d.price,
  neckType: d.neckType,
  imageUrl: d.imageUrl
});
  };

  const saveEdit = async (id) => {
    await fetch(`${API_BASE_URL}/api/designs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    });

    setEditingId(null);
    fetchDesigns();
  };

  const deleteDesign = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await fetch(`${API_BASE_URL}/api/designs/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });

    setDesigns(prev => prev.filter(d => d._id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Manage Products
      </h1>

      {/* FILTER BAR */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          placeholder="Search by name"
          className="border p-2 rounded"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={neckFilter}
          onChange={e => setNeckFilter(e.target.value)}
        >
          <option value="all">All Neck Types</option>
          <option value="round-neck">Round Neck</option>
          <option value="boat-neck">Boat Neck</option>
          <option value="u-shaped-neck">U Shaped Neck</option>
          <option value="pot-neck">Pot Neck</option>
          <option value="star-neck">Star Neck</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          className="border p-2 rounded"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          className="border p-2 rounded"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      {/* PRODUCT LIST (2 COLUMNS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(d => (
          <div
            key={d._id}
            className="border border-blue-200 rounded-lg p-4 flex gap-4"
          >
            <img
              src={d.imageUrl}
              alt={d.name}
              className="w-20 h-24 object-cover rounded border"
            />

            <div className="flex-1">
              {editingId === d._id ? (
                <div className="space-y-2">
                  <input
                    className="border p-2 w-full"
                    value={form.name}
                    onChange={e =>
                      setForm({ ...form, name: e.target.value })
                    }
                  />
                  <input
                    className="border p-2 w-full"
                    value={form.imageUrl}
                    onChange={e =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                  />
                  <input
                    className="border p-2 w-full"
                    value={form.neckType}
                    onChange={e =>
                      setForm({ ...form, neckType: e.target.value })
                    }
                  />
                  <input
                    className="border p-2 w-full"
                    value={form.price}
                    onChange={e =>
                      setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>
              ) : (
                <>
                  <h3 className="font-medium text-blue-900">
                    {d.name}
                  </h3>
                  <p className="text-sm capitalize">
                    {d.neckType}
                  </p>
                  <p className="text-sm font-medium">
  ₹{d.basePrice ?? d.price}
</p>

                </>
              )}
            </div>

            <div className="flex flex-col gap-2">
              {editingId === d._id ? (
                <button
                  onClick={() => saveEdit(d._id)}
                  className="text-green-700 text-sm underline"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEdit(d)}
                  className="text-blue-700 text-sm underline"
                >
                  Edit
                </button>
              )}

              <button
                onClick={() => deleteDesign(d._id)}
                className="text-red-600 text-sm underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
