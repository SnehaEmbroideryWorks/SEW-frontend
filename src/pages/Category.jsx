import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_BASE_URL from "../config/api";

export default function Category() {
  const { neckType } = useParams();
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/designs`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch designs");
          return;
        }

        // filter by neckType from DB
        const filtered = data.designs.filter(
          d =>
            d.neckType.toLowerCase().replace(/\s+/g, "-") === neckType
        );

        setDesigns(filtered);
        setFilteredDesigns(filtered);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [neckType]);

  // 🔍 Bullet-proof search logic
  useEffect(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      setFilteredDesigns(designs);
      return;
    }

    const result = designs.filter(d =>
      d.name.toLowerCase().includes(keyword) ||
      (d.category && d.category.toLowerCase().includes(keyword)) ||
      (d.neckType && d.neckType.toLowerCase().includes(keyword))
    );

    setFilteredDesigns(result);
  }, [search, designs]);

  if (loading) {
    return <p className="p-6 text-center">Loading designs...</p>;
  }

  if (error) {
    return <p className="p-6 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-semibold text-blue-900 mb-4 capitalize">
        {neckType.replace("-", " ")} Designs
      </h1>

      {/* 🔍 SEARCH BAR */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by design name or category..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      </div>

      {filteredDesigns.length === 0 ? (
        <p className="text-center text-gray-600">
          No designs match your search.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDesigns.map(design => (
            <Link
              key={design._id}
              to={`/design/${design._id}`}
              className="border border-blue-200 rounded-xl overflow-hidden hover:shadow transition bg-white"
            >
              <img
                src={design.imageUrl}
                alt={design.name}
                className="w-full h-64 object-cover"
              />

              <div className="p-4 text-center">
                <h3 className="font-medium text-blue-900">
                  Design Number:-  "{design.name}"
                </h3>
                <p className="text-md text-gray-600 mt-1">
                  Price:- ₹{design.basePrice}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
