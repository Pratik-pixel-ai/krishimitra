import { useState, useEffect } from 'react'
import { Sprout, Search, Droplets, Thermometer, Sun, Clock, MapPin, ChevronDown, ChevronUp, IndianRupee, Leaf, AlertTriangle, TrendingUp } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import api from '../services/api'

const crops = [
  {
    name: "Wheat", hindi: "गेहूं", emoji: "🌾",
    season: "Rabi", months: "Nov - Apr",
    temp: "10-25°C", water: "Medium", duration: "120-150 days",
    soil: ["Loamy", "Clay", "Clay Loam"],
    states: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"],
    tips: "Sow in November for best yield. Requires well-drained soil. Apply nitrogen fertilizer at tillering stage.",
    msp: "₹2,275/quintal (2024-25)",
    yield: "35-45 quintals/acre",
    pest: "Rust, Aphids, Termites",
    profit: "High",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    accent: "#ca8a04",
  },
  {
    name: "Rice", hindi: "चावल", emoji: "🌾",
    season: "Kharif", months: "Jun - Nov",
    temp: "20-35°C", water: "High", duration: "100-150 days",
    soil: ["Clay", "Loamy"],
    states: ["West Bengal", "Uttar Pradesh", "Punjab", "Andhra Pradesh", "Tamil Nadu"],
    tips: "Transplant seedlings after 25-30 days. Maintain 5cm water level during growth. Ideal for waterlogged areas.",
    msp: "₹2,300/quintal (2024-25)",
    yield: "20-30 quintals/acre",
    pest: "Stem Borer, Brown Planthopper, Blast",
    profit: "Medium",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-700",
    accent: "#16a34a",
  },
  {
    name: "Cotton", hindi: "कपास", emoji: "🌿",
    season: "Kharif", months: "Apr - Oct",
    temp: "21-30°C", water: "Medium", duration: "150-180 days",
    soil: ["Black Cotton", "Loamy"],
    states: ["Maharashtra", "Gujarat", "Telangana", "Madhya Pradesh", "Karnataka"],
    tips: "Requires deep black soil. Space plants 60-90cm apart. Watch for bollworm during flowering.",
    msp: "₹7,121/quintal (2024-25)",
    yield: "8-12 quintals/acre",
    pest: "Bollworm, Whitefly, Mealybug",
    profit: "High",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    accent: "#2563eb",
  },
  {
    name: "Sugarcane", hindi: "गन्ना", emoji: "🎋",
    season: "Annual", months: "Feb - Mar (plant)",
    temp: "20-35°C", water: "High", duration: "10-12 months",
    soil: ["Loamy", "Red Loam", "Alluvial"],
    states: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Bihar"],
    tips: "Plant setts with 2-3 buds. Earthing up at 90 days is essential. Needs regular irrigation every 8-10 days.",
    msp: "₹340/quintal (FRP 2024-25)",
    yield: "300-400 quintals/acre",
    pest: "Top Shoot Borer, Pyrilla, Red Rot",
    profit: "High",
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-700",
    accent: "#059669",
  },
  {
    name: "Maize", hindi: "मक्का", emoji: "🌽",
    season: "Kharif", months: "Jun - Sep",
    temp: "18-27°C", water: "Medium", duration: "80-95 days",
    soil: ["Sandy Loam", "Loamy", "Alluvial"],
    states: ["Karnataka", "Andhra Pradesh", "Maharashtra", "Bihar", "Rajasthan"],
    tips: "Short duration crop. Plant in rows 60cm apart. Apply urea in splits — at sowing and knee height stage.",
    msp: "₹2,090/quintal (2024-25)",
    yield: "20-28 quintals/acre",
    pest: "Fall Armyworm, Stem Borer, Aphids",
    profit: "Medium",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
    accent: "#ea580c",
  },
  {
    name: "Tomato", hindi: "टमाटर", emoji: "🍅",
    season: "Rabi / Summer", months: "Oct - Jan",
    temp: "20-27°C", water: "Medium", duration: "60-90 days",
    soil: ["Sandy Loam", "Red Soil", "Loamy"],
    states: ["Andhra Pradesh", "Karnataka", "Maharashtra", "Gujarat", "Madhya Pradesh"],
    tips: "Transplant at 4-leaf stage. Stake plants at 30cm height. Watch for early blight and leaf curl virus.",
    msp: "Market-linked",
    yield: "80-120 quintals/acre",
    pest: "Early Blight, Leaf Curl Virus, Whitefly",
    profit: "High (volatile)",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-700",
    accent: "#dc2626",
  },
  {
    name: "Onion", hindi: "प्याज", emoji: "🧅",
    season: "Rabi", months: "Oct - Mar",
    temp: "13-24°C", water: "Low", duration: "90-120 days",
    soil: ["Sandy Loam", "Loamy", "Red Soil"],
    states: ["Maharashtra", "Karnataka", "Madhya Pradesh", "Gujarat", "Rajasthan"],
    tips: "Transplant 6-week-old seedlings. Stop irrigation 10 days before harvest. Store in dry, ventilated place.",
    msp: "Market-linked",
    yield: "60-80 quintals/acre",
    pest: "Thrips, Purple Blotch, Downy Mildew",
    profit: "Medium (volatile)",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    accent: "#9333ea",
  },
  {
    name: "Soybean", hindi: "सोयाबीन", emoji: "🫘",
    season: "Kharif", months: "Jun - Oct",
    temp: "20-30°C", water: "Medium", duration: "90-120 days",
    soil: ["Black Cotton", "Loamy", "Clay Loam"],
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka"],
    tips: "Inoculate seeds with Rhizobium before sowing. Avoid waterlogging. Good rotation crop after wheat.",
    msp: "₹4,892/quintal (2024-25)",
    yield: "8-12 quintals/acre",
    pest: "Girdle Beetle, Stem Fly, Yellow Mosaic",
    profit: "Medium",
    color: "bg-lime-50 border-lime-200",
    badge: "bg-lime-100 text-lime-700",
    accent: "#65a30d",
  },
  {
    name: "Potato", hindi: "आलू", emoji: "🥔",
    season: "Rabi", months: "Oct - Jan",
    temp: "15-20°C", water: "Medium", duration: "70-90 days",
    soil: ["Sandy Loam", "Loamy", "Alluvial"],
    states: ["Uttar Pradesh", "West Bengal", "Bihar", "Punjab", "Gujarat"],
    tips: "Plant certified seed tubers. Earth up at 30 days. Harvest when leaves turn yellow. Store in cool dark place.",
    msp: "Market-linked",
    yield: "80-120 quintals/acre",
    pest: "Late Blight, Colorado Beetle, Aphids",
    profit: "Medium",
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    accent: "#d97706",
  },
  {
    name: "Mustard", hindi: "सरसों", emoji: "🌼",
    season: "Rabi", months: "Oct - Feb",
    temp: "10-25°C", water: "Low", duration: "90-110 days",
    soil: ["Sandy Loam", "Loamy", "Alluvial"],
    states: ["Rajasthan", "Uttar Pradesh", "Haryana", "Madhya Pradesh", "Bihar"],
    tips: "Thinning at 15 days is important. One irrigation at flowering stage boosts yield significantly.",
    msp: "₹5,650/quintal (2024-25)",
    yield: "6-10 quintals/acre",
    pest: "Aphids, Alternaria Blight, Sawfly",
    profit: "High",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
    accent: "#b45309",
  },
  {
    name: "Groundnut", hindi: "मूंगफली", emoji: "🥜",
    season: "Kharif", months: "Jun - Oct",
    temp: "25-30°C", water: "Medium", duration: "90-130 days",
    soil: ["Sandy Loam", "Red Soil", "Alluvial"],
    states: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Rajasthan"],
    tips: "Light sandy soil gives best results. Avoid waterlogging. Peg penetration stage needs adequate soil moisture.",
    msp: "₹6,783/quintal (2024-25)",
    yield: "6-10 quintals/acre",
    pest: "Leaf Miner, Root Rot, Tikka Disease",
    profit: "High",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-800",
    accent: "#c2410c",
  },
  {
    name: "Chickpea", hindi: "चना", emoji: "🫘",
    season: "Rabi", months: "Oct - Feb",
    temp: "15-25°C", water: "Low", duration: "90-100 days",
    soil: ["Sandy Loam", "Clay Loam", "Black Cotton"],
    states: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Uttar Pradesh", "Karnataka"],
    tips: "Drought tolerant crop. Avoid excess moisture. One pre-sowing irrigation is enough in most areas.",
    msp: "₹5,440/quintal (2024-25)",
    yield: "6-8 quintals/acre",
    pest: "Pod Borer, Wilt, Dry Root Rot",
    profit: "Medium",
    color: "bg-teal-50 border-teal-200",
    badge: "bg-teal-100 text-teal-700",
    accent: "#0d9488",
  },
]

const seasons = ['All', 'Kharif', 'Rabi', 'Annual']
const waterLevels = ['All', 'Low', 'Medium', 'High']
const profitLevels = ['All', 'High', 'Medium']
const soilTypes = ['All', 'Clay', 'Sandy', 'Loamy', 'Black Cotton', 'Red', 'Alluvial', 'Sandy Loam']

const waterColor = { Low: 'text-sky-500', Medium: 'text-blue-500', High: 'text-indigo-600' }
const waterBg = { Low: 'bg-sky-50 text-sky-700', Medium: 'bg-blue-50 text-blue-700', High: 'bg-indigo-50 text-indigo-700' }
const profitColor = { High: 'text-green-600', 'High (volatile)': 'text-amber-500', Medium: 'text-blue-600', 'Medium (volatile)': 'text-amber-500' }

export default function Crops() {
  const [search, setSearch] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('All')
  const [selectedWater, setSelectedWater] = useState('All')
  const [selectedSoil, setSelectedSoil] = useState('All')
  const [expanded, setExpanded] = useState(null)
  const [farmSoil, setFarmSoil] = useState(null)
  const { isDarkMode } = useThemeStore()
  const { t } = useLanguageStore()

  const { farmer } = useAuthStore()

  // Try to load farm profile soil type
  useEffect(() => {
    api.get('/farmer/profile').then(res => {
      if (res.data?.soilType) setFarmSoil(res.data.soilType)
    }).catch(() => {})
  }, [])

  const isSuitable = (crop) => {
    if (!farmSoil) return false
    return crop.soil.some(s => s.toLowerCase().includes(farmSoil.toLowerCase()) || farmSoil.toLowerCase().includes(s.toLowerCase()))
  }

  const filtered = crops.filter(crop => {
    const matchSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.hindi.includes(search) ||
      crop.soil.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchSeason = selectedSeason === 'All' || crop.season.includes(selectedSeason)
    const matchWater = selectedWater === 'All' || crop.water === selectedWater
    const matchSoil = selectedSoil === 'All' || crop.soil.some(s => s.toLowerCase().includes(selectedSoil.toLowerCase()) || selectedSoil.toLowerCase().includes(s.split(' ')[0].toLowerCase()))
    return matchSearch && matchSeason && matchWater && matchSoil
  })

  const suitableCount = crops.filter(isSuitable).length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center">
            <Sprout className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>Crop Guide</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Season-wise info, MSP prices & farming tips</p>
          </div>
        </div>

        {/* Farm soil banner */}
        {farmSoil && (
          <div className={`mt-4 border rounded-2xl px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-2">
              <Leaf className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                Your soil: <strong>{farmSoil}</strong> — <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{suitableCount} suitable crops highlighted</span>
              </span>
            </div>
            <button
              onClick={() => setSelectedSoil(farmSoil)}
              className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
            >
              Filter by my soil
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl shadow-sm border p-5 mb-6 transition-colors`}>
        {/* Search */}
        <div className="relative mb-4">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by crop name, Hindi name, or soil type..."
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
          />
        </div>

        <div className="flex flex-wrap gap-y-4 gap-x-6">
          {/* Season */}
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Sun className="w-3 h-3" /> {t('season')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {seasons.map(s => (
                <button key={s} onClick={() => setSelectedSeason(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedSeason === s ? 'bg-green-600 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{s}</button>
              ))}
            </div>
          </div>

          {/* Water */}
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Droplets className="w-3 h-3" /> {t('waterNeed')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {waterLevels.map(w => (
                <button key={w} onClick={() => setSelectedWater(w)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedWater === w ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{w}</button>
              ))}
            </div>
          </div>

          {/* Soil */}
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Leaf className="w-3 h-3" /> {t('soilType')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {soilTypes.map(s => (
                <button key={s} onClick={() => setSelectedSoil(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedSoil === s ? 'bg-amber-500 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm mb-4 px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        Showing <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{filtered.length}</span> crops
        {selectedSoil !== 'All' && <span className="text-amber-600"> · filtered by {selectedSoil} soil</span>}
      </p>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((crop, i) => {
          const suitable = isSuitable(crop)
          const isOpen = expanded === i
          return (
            <div key={i}
              className={`border-2 ${crop.color} rounded-3xl overflow-hidden transition-all duration-200 ${
                suitable ? 'ring-2 ring-green-400 ring-offset-1' : ''
              } hover:shadow-lg`}
            >
              {/* Suitable badge */}
              {suitable && (
                <div className="bg-green-600 text-white text-xs font-semibold text-center py-1.5 tracking-wide">
                  {t('suitableForYour')} {farmSoil} {t('soil')}
                </div>
              )}

              <div className="p-5">
                {/* Top row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl leading-none">{crop.emoji}</span>
                    <div>
                      <h3 className={`font-bold text-lg leading-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{crop.name}</h3>
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{crop.hindi}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${crop.badge}`}>
                    {crop.season}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className={`rounded-2xl p-2.5 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <Thermometer className="w-3.5 h-3.5 text-red-400 mx-auto mb-1" />
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Temp</p>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.temp}</p>
                  </div>
                  <div className={`rounded-2xl p-2.5 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <Droplets className={`w-3.5 h-3.5 mx-auto mb-1 ${waterColor[crop.water] || 'text-blue-500'}`} />
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Water</p>
                    <p className={`text-xs font-bold ${waterColor[crop.water] || (isDarkMode ? 'text-gray-300' : 'text-gray-700')}`}>{crop.water}</p>
                  </div>
                  <div className={`rounded-2xl p-2.5 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <Clock className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Duration</p>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.duration.split(' ')[0]}</p>
                  </div>
                </div>

                {/* MSP + Yield row */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className={`rounded-2xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <div className="flex items-center gap-1 mb-0.5">
                      <IndianRupee className="w-3 h-3 text-green-600" />
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>MSP Price</p>
                    </div>
                    <p className={`text-xs font-bold leading-snug ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{crop.msp}</p>
                  </div>
                  <div className={`rounded-2xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <div className="flex items-center gap-1 mb-0.5">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Avg Yield</p>
                    </div>
                    <p className={`text-xs font-bold leading-snug ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>{crop.yield}</p>
                  </div>
                </div>

                {/* Soil tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {crop.soil.map((s, j) => (
                    <span key={j} className={`text-xs px-2.5 py-0.5 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white/80 text-gray-600 border border-gray-200'}`}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Months */}
                <div className={`flex items-center gap-2 mb-4 rounded-xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/60'}`}>
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="font-semibold">Growing:</span> {crop.months} &nbsp;·&nbsp; {crop.duration}</p>
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => setExpanded(isOpen ? null : i)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl transition-colors"
                  style={{ color: crop.accent, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)' }}
                >
                  {isOpen ? <><ChevronUp className="w-3.5 h-3.5" /> {t('hideDetails')}</> : <><ChevronDown className="w-3.5 h-3.5" /> {t('fullDetails')}</>}
                </button>

                {/* Expanded section */}
                {isOpen && (
                  <div className={`mt-4 pt-4 border-t space-y-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200/60'}`}>
                    {/* States */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <MapPin className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Best States</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {crop.states.map((state, j) => (
                          <span key={j} className={`text-xs px-2.5 py-0.5 rounded-full shadow-sm ${isDarkMode ? 'bg-gray-800 text-gray-300 border-gray-700' : 'bg-white text-gray-700 border border-gray-200'}`}>
                            {state}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pest Threats */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Common Pests / Diseases</p>
                      </div>
                      <p className={`text-sm rounded-xl px-3 py-2 ${isDarkMode ? 'text-gray-300 bg-amber-900/30 border-amber-700' : 'text-gray-700 bg-amber-50 border border-amber-100'}`}>{crop.pest}</p>
                    </div>

                    {/* Tips */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Leaf className="w-3.5 h-3.5 text-green-500" />
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Farming Tips</p>
                      </div>
                      <p className={`text-sm leading-relaxed rounded-xl px-3 py-2.5 ${isDarkMode ? 'text-gray-300 bg-gray-800 border-gray-700' : 'text-gray-700 bg-white/80 border border-gray-100'}`}>{crop.tips}</p>
                    </div>

                    {/* Profit potential */}
                    <div className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border border-gray-100'}`}>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>Profit Potential</p>
                      </div>
                      <span className={`text-sm font-bold ${profitColor[crop.profit] || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
                        {crop.profit}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* No Results */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <Sprout className={`w-14 h-14 mx-auto mb-4 ${isDarkMode ? 'text-gray-700' : 'text-gray-200'}`} />
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>No crops match your filters</p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Try clearing a filter or changing your search</p>
          <button
            onClick={() => { setSearch(''); setSelectedSeason('All'); setSelectedWater('All'); setSelectedSoil('All') }}
            className={`mt-4 text-sm font-medium underline underline-offset-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  )
}
