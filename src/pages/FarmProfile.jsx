import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const soilTypes = ["Clay", "Sandy", "Loamy", "Black Cotton", "Red", "Alluvial"];
const cropOptions = ["Wheat", "Rice", "Onion", "Cotton", "Sugarcane", "Soybean", "Maize", "Tomato", "Potato", "Gram", "Turmeric", "Groundnut"];

export default function FarmProfile() {
  const [profile, setProfile] = useState({ soilType: "", farmSize: "", cropsGrown: "" });
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/farmer/profile").then((res) => {
      const data = res.data;
      setProfile({ soilType: data.soilType || "", farmSize: data.farmSize || "" });
      setSelectedCrops(data.cropsGrown ? data.cropsGrown.split(",") : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const toggleCrop = (crop) => {
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put("/farmer/profile", {
        soilType: profile.soilType,
        farmSize: parseFloat(profile.farmSize),
        cropsGrown: selectedCrops.join(","),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      alert("Failed to save. Please try again.");
    }
    setSaving(false);
  };

  if (loading) return <div className="flex justify-center items-center h-64 text-green-700">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-green-800 mb-1">🌾 Farm Profile</h1>
      <p className="text-gray-500 text-sm mb-6">This info helps AI give you better advice</p>

      {/* Soil Type */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Soil Type</label>
        <div className="flex flex-wrap gap-2">
          {soilTypes.map((soil) => (
            <button
              key={soil}
              onClick={() => setProfile({ ...profile, soilType: soil })}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                profile.soilType === soil
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
              }`}
            >
              {soil}
            </button>
          ))}
        </div>
      </div>

      {/* Farm Size */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Farm Size (acres)</label>
        <input
          type="number"
          min="0"
          step="0.5"
          value={profile.farmSize}
          onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="e.g. 2.5"
        />
      </div>

      {/* Crops */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Crops You Grow</label>
        <div className="flex flex-wrap gap-2">
          {cropOptions.map((crop) => (
            <button
              key={crop}
              onClick={() => toggleCrop(crop)}
              className={`px-3 py-1.5 rounded-full text-sm border transition ${
                selectedCrops.includes(crop)
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 border-gray-300 hover:border-green-400"
              }`}
            >
              {selectedCrops.includes(crop) ? "✓ " : ""}{crop}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
      >
        {saving ? "Saving..." : "Save Farm Profile"}
      </button>

      {success && (
        <div className="mt-4 text-center text-green-700 font-medium">
          ✅ Profile saved! AI will now use this for better advice.
        </div>
      )}
    </div>
  );
}