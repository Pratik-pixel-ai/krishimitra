// Language-independent crop data: ids, filter codes, and visual styling.
// Translated display content (name, tips, pest names, states, etc.) lives in
// src/data/translations/crops.<lang>.js, keyed by the `id` below.

export const cropsBase = [
  {
    id: "wheat", emoji: "🌾",
    seasonCode: "rabi", waterCode: "medium", soilCodes: ["loamy", "clay", "clay-loam"],
    profitCode: "high",
    color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-700", accent: "#ca8a04",
  },
  {
    id: "rice", emoji: "🌾",
    seasonCode: "kharif", waterCode: "high", soilCodes: ["clay", "loamy"],
    profitCode: "medium",
    color: "bg-green-50 border-green-200", badge: "bg-green-100 text-green-700", accent: "#16a34a",
  },
  {
    id: "cotton", emoji: "🌿",
    seasonCode: "kharif", waterCode: "medium", soilCodes: ["black-cotton", "loamy"],
    profitCode: "high",
    color: "bg-blue-50 border-blue-200", badge: "bg-blue-100 text-blue-700", accent: "#2563eb",
  },
  {
    id: "sugarcane", emoji: "🎋",
    seasonCode: "annual", waterCode: "high", soilCodes: ["loamy", "red-loam", "alluvial"],
    profitCode: "high",
    color: "bg-emerald-50 border-emerald-200", badge: "bg-emerald-100 text-emerald-700", accent: "#059669",
  },
  {
    id: "maize", emoji: "🌽",
    seasonCode: "kharif", waterCode: "medium", soilCodes: ["sandy-loam", "loamy", "alluvial"],
    profitCode: "medium",
    color: "bg-orange-50 border-orange-200", badge: "bg-orange-100 text-orange-700", accent: "#ea580c",
  },
  {
    id: "tomato", emoji: "🍅",
    seasonCode: "rabi-summer", waterCode: "medium", soilCodes: ["sandy-loam", "red", "loamy"],
    profitCode: "high-volatile",
    color: "bg-red-50 border-red-200", badge: "bg-red-100 text-red-700", accent: "#dc2626",
  },
  {
    id: "onion", emoji: "🧅",
    seasonCode: "rabi", waterCode: "low", soilCodes: ["sandy-loam", "loamy", "red"],
    profitCode: "medium-volatile",
    color: "bg-purple-50 border-purple-200", badge: "bg-purple-100 text-purple-700", accent: "#9333ea",
  },
  {
    id: "soybean", emoji: "🫘",
    seasonCode: "kharif", waterCode: "medium", soilCodes: ["black-cotton", "loamy", "clay-loam"],
    profitCode: "medium",
    color: "bg-lime-50 border-lime-200", badge: "bg-lime-100 text-lime-700", accent: "#65a30d",
  },
  {
    id: "potato", emoji: "🥔",
    seasonCode: "rabi", waterCode: "medium", soilCodes: ["sandy-loam", "loamy", "alluvial"],
    profitCode: "medium",
    color: "bg-amber-50 border-amber-200", badge: "bg-amber-100 text-amber-700", accent: "#d97706",
  },
  {
    id: "mustard", emoji: "🌼",
    seasonCode: "rabi", waterCode: "low", soilCodes: ["sandy-loam", "loamy", "alluvial"],
    profitCode: "high",
    color: "bg-yellow-50 border-yellow-200", badge: "bg-yellow-100 text-yellow-800", accent: "#b45309",
  },
  {
    id: "groundnut", emoji: "🥜",
    seasonCode: "kharif", waterCode: "medium", soilCodes: ["sandy-loam", "red", "alluvial"],
    profitCode: "high",
    color: "bg-orange-50 border-orange-200", badge: "bg-orange-100 text-orange-800", accent: "#c2410c",
  },
  {
    id: "chickpea", emoji: "🫘",
    seasonCode: "rabi", waterCode: "low", soilCodes: ["sandy-loam", "clay-loam", "black-cotton"],
    profitCode: "medium",
    color: "bg-teal-50 border-teal-200", badge: "bg-teal-100 text-teal-700", accent: "#0d9488",
  },
]

// Filter option codes (display labels come from languageStore via t())
export const seasonCodes = ["all", "kharif", "rabi", "annual"]
export const waterCodes = ["all", "low", "medium", "high"]
export const soilCodes = ["all", "clay", "sandy", "loamy", "black-cotton", "red", "alluvial", "sandy-loam"]
