import { useState } from 'react'
import { Sprout, Search, Filter, Droplets, Thermometer, Sun, Clock } from 'lucide-react'

const crops = [
  {
    name: "Wheat", hindi: "गेहूं", emoji: "🌾",
    season: "Rabi", months: "Nov - Apr",
    temp: "10-25°C", water: "Medium", duration: "120-150 days",
    soil: ["Loamy", "Clay Loam"],
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"],
    tips: "Sow in November for best yield. Requires well-drained soil. Apply nitrogen fertilizer at tillering stage.",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700"
  },
  {
    name: "Rice", hindi: "चावल", emoji: "🌾",
    season: "Kharif", months: "Jun - Nov",
    temp: "20-35°C", water: "High", duration: "100-150 days",
    soil: ["Clay", "Loamy"],
    states: ["West Bengal", "Uttar Pradesh", "Punjab", "Andhra Pradesh", "Tamil Nadu"],
    tips: "Transplant seedlings after 25-30 days. Maintain 5cm water level during growth. Ideal for waterlogged areas.",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700"
  },
  {
    name: "Cotton", hindi: "कपास", emoji: "🌿",
    season: "Kharif", months: "Apr - Oct",
    temp: "21-30°C", water: "Medium", duration: "150-180 days",
    soil: ["Black Cotton", "Loamy"],
    states: ["Maharashtra", "Gujarat", "Telangana", "Madhya Pradesh", "Karnataka"],
    tips: "Requires deep black soil. Space plants 60-90cm apart. Watch for bollworm during flowering.",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700"
  },
  {
    name: "Sugarcane", hindi: "गन्ना", emoji: "🎋",
    season: "Annual", months: "Feb - Mar (plant)",
    temp: "20-35°C", water: "High", duration: "10-12 months",
    soil: ["Loamy", "Red Loam"],
    states: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Bihar"],
    tips: "Plant setts with 2-3 buds. Earthing up at 90 days is essential. Needs regular irrigation every 8-10 days.",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700"
  },
  {
    name: "Maize", hindi: "मक्का", emoji: "🌽",
    season: "Kharif", months: "Jun - Sep",
    temp: "18-27°C", water: "Medium", duration: "80-95 days",
    soil: ["Sandy Loam", "Loamy"],
    states: ["Karnataka", "Andhra Pradesh", "Maharashtra", "Bihar", "Rajasthan"],
    tips: "Short duration crop. Plant in rows 60cm apart. Apply urea in splits — at sowing and knee height stage.",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700"
  },
  {
    name: "Tomato", hindi: "टमाटर", emoji: "🍅",
    season: "Rabi / Summer", months: "Oct - Jan",
    temp: "20-27°C", water: "Medium", duration: "60-90 days",
    soil: ["Sandy Loam", "Red Soil"],
    states: ["Andhra Pradesh", "Karnataka", "Maharashtra", "Gujarat", "Madhya Pradesh"],
    tips: "Transplant at 4-leaf stage. Stake plants at 30cm height. Watch for early blight and leaf curl virus.",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700"
  },
  {
    name: "Onion", hindi: "प्याज", emoji: "🧅",
    season: "Rabi", months: "Oct - Mar",
    temp: "13-24°C", water: "Low", duration: "90-120 days",
    soil: ["Sandy Loam", "Loamy"],
    states: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Gujarat", "Rajasthan"],
    tips: "Transplant 6-week-old seedlings. Stop irrigation 10 days before harvest. Store in dry, ventilated place.",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700"
  },
  {
    name: "Soybean", hindi: "सोयाबीन", emoji: "🫘",
    season: "Kharif", months: "Jun - Oct",
    temp: "20-30°C", water: "Medium", duration: "90-120 days",
    soil: ["Black Cotton", "Loamy"],
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka"],
    tips: "Inoculate seeds with Rhizobium before sowing. Avoid waterlogging. Good rotation crop after wheat.",
    color: "bg-lime-50 border-lime-200",
    badge: "bg-lime-100 text-lime-700"
  },
  {
    name: "Potato", hindi: "आलू", emoji: "🥔",
    season: "Rabi", months: "Oct - Jan",
    temp: "15-20°C", water: "Medium", duration: "70-90 days",
    soil: ["Sandy Loam", "Loamy"],
    states: ["Uttar Pradesh", "West Bengal", "Bihar", "Punjab", "Gujarat"],
    tips: "Plant certified seed tubers. Earth up at 30 days. Harvest when leaves turn yellow. Store in cool dark place.",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700"
  },
  {
    name: "Mustard", hindi: "सरसों", emoji: "🌼",
    season: "Rabi", months: "Oct - Feb",
    temp: "10-25°C", water: "Low", duration: "90-110 days",
    soil: ["Sandy Loam", "Loamy"],
    states: ["Rajasthan", "Uttar Pradesh", "Haryana", "Madhya Pradesh", "Bihar"],
    tips: "Thinning at 15 days is important. One irrigation at flowering stage boosts yield significantly.",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800"
  },
  {
    name: "Groundnut", hindi: "मूंगफली", emoji: "🥜",
    season: "Kharif", months: "Jun - Oct",
    temp: "25-30°C", water: "Medium", duration: "90-130 days",
    soil: ["Sandy Loam", "Red Soil"],
    states: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Rajasthan"],
    tips: "Light sandy soil gives best results. Avoid waterlogging. Peg penetration stage needs adequate soil moisture.",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800"
  },
  {
    name: "Chickpea", hindi: "चना", emoji: "🫘",
    season: "Rabi", months: "Oct - Feb",
    temp: "15-25°C", water: "Low", duration: "90-100 days",
    soil: ["Sandy Loam", "Clay Loam"],
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh", "Karnataka"],
    tips: "Drought tolerant crop. Avoid excess moisture. One pre-sowing irrigation is enough in most areas.",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-700"
  },
]

const seasons = ['All', 'Kharif', 'Rabi', 'Annual']
const waterLevels = ['All', 'Low', 'Medium', 'High']

export default function Crops() {
  const [search, setSearch] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('All')
  const [selectedWater, setSelectedWater] = useState('All')
  const [expanded, setExpanded] = useState(null)

  const filtered = crops.filter(crop => {
    const matchSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.hindi.includes(search) ||
      crop.soil.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchSeason = selectedSeason === 'All' || crop.season.includes(selectedSeason)
    const matchWater = selectedWater === 'All' || crop.water === selectedWater
    return matchSearch && matchSeason && matchWater
  })

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-emerald-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sprout className="text-white w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-green-900">Crop Recommendations</h1>
        <p className="text-gray-500 mt-2">Find the best crops for your soil, season, and region</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-6 mb-8">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search crops by name, Hindi name, or soil type..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-400"
          />
        </div>

        <div className="flex flex-wrap gap-6">
          {/* Season Filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
              <Sun className="w-3 h-3" /> SEASON
            </p>
            <div className="flex gap-2">
              {seasons.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSeason(s)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedSeason === s
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Water Filter */}
          <div>
            <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
              <Droplets className="w-3 h-3" /> WATER NEED
            </p>
            <div className="flex gap-2">
              {waterLevels.map(w => (
                <button
                  key={w}
                  onClick={() => setSelectedWater(w)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    selectedWater === w
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500 mb-4 px-1">
        Showing <span className="font-semibold text-green-700">{filtered.length}</span> crops
      </p>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((crop, i) => (
          <div
            key={i}
            className={`border-2 ${crop.color} rounded-3xl p-5 cursor-pointer hover:shadow-md transition-all`}
            onClick={() => setExpanded(expanded === i ? null : i)}
          >
            {/* Top */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{crop.emoji}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg leading-none">{crop.name}</h3>
                  <p className="text-gray-500 text-sm">{crop.hindi}</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${crop.badge}`}>
                {crop.season}
              </span>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/70 rounded-xl p-2 text-center">
                <Thermometer className="w-3 h-3 text-red-400 mx-auto mb-0.5" />
                <p className="text-xs text-gray-500">Temp</p>
                <p className="text-xs font-semibold text-gray-700">{crop.temp}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-2 text-center">
                <Droplets className="w-3 h-3 text-blue-400 mx-auto mb-0.5" />
                <p className="text-xs text-gray-500">Water</p>
                <p className="text-xs font-semibold text-gray-700">{crop.water}</p>
              </div>
              <div className="bg-white/70 rounded-xl p-2 text-center">
                <Clock className="w-3 h-3 text-green-500 mx-auto mb-0.5" />
                <p className="text-xs text-gray-500">Season</p>
                <p className="text-xs font-semibold text-gray-700">{crop.months.split(' - ')[0]}</p>
              </div>
            </div>

            {/* Soil Tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {crop.soil.map((s, j) => (
                <span key={j} className="text-xs bg-white/80 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>

            {/* Expand */}
            {expanded === i && (
              <div className="mt-3 pt-3 border-t border-gray-200/60 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">📅 GROWING PERIOD</p>
                  <p className="text-sm text-gray-700">{crop.months} · {crop.duration}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">🗺️ BEST STATES</p>
                  <p className="text-sm text-gray-700">{crop.states.join(', ')}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">💡 FARMING TIPS</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{crop.tips}</p>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-400 mt-3 text-center">
              {expanded === i ? '▲ Show less' : '▼ Tap to see details'}
            </p>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Sprout className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <p className="text-lg font-medium text-gray-500">No crops found</p>
          <p className="text-sm text-gray-400 mt-1">Try a different search or filter</p>
        </div>
      )}

    </div>
  )
}