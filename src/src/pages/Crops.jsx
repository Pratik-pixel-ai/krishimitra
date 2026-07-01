import { useState, useEffect, useMemo } from 'react'
import { Sprout, Search, Droplets, Thermometer, Sun, Clock, MapPin, ChevronDown, ChevronUp, IndianRupee, Leaf, AlertTriangle, TrendingUp } from 'lucide-react'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import api from '../services/api'
import { cropsBase, seasonCodes, waterCodes, soilCodes as soilFilterCodes } from '../data/crops/cropsBase'
import crops_en from '../data/crops/crops.en'
import crops_hi from '../data/crops/crops.hi'
import crops_mr from '../data/crops/crops.mr'

const cropTranslations = { en: crops_en, hi: crops_hi, mr: crops_mr }

const waterColorByCode = { low: 'text-sky-500', medium: 'text-blue-500', high: 'text-indigo-600' }
const profitColorByCode = {
  high: 'text-green-600',
  'high-volatile': 'text-amber-500',
  medium: 'text-blue-600',
  'medium-volatile': 'text-amber-500',
}

export default function Crops() {
  const [search, setSearch] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [selectedWater, setSelectedWater] = useState('all')
  const [selectedSoil, setSelectedSoil] = useState('all')
  const [expanded, setExpanded] = useState(null)
  const [farmSoil, setFarmSoil] = useState(null)
  const { isDarkMode } = useThemeStore()
  const { t, language } = useLanguageStore()
  const { farmer } = useAuthStore()

  // Merge language-independent base data with the translated content for the
  // current language (falls back to English for any missing field).
  const crops = useMemo(() => {
    const langData = cropTranslations[language] || cropTranslations.en
    return cropsBase.map((base) => ({
      ...base,
      ...(cropTranslations.en[base.id] || {}),
      ...(langData[base.id] || {}),
    }))
  }, [language])

  const seasonLabel = (code) => ({
    all: t('filterAll'), kharif: t('seasonKharif'), rabi: t('seasonRabi'), annual: t('seasonAnnual'),
  }[code] || code)
  const waterLabel = (code) => ({
    all: t('filterAll'), low: t('waterLow'), medium: t('waterMedium'), high: t('waterHigh'),
  }[code] || code)
  const soilLabel = (code) => ({
    all: t('filterAll'), clay: t('soilClay'), sandy: t('soilSandy'), loamy: t('soilLoamy'),
    'black-cotton': t('soilBlackCotton'), red: t('soilRed'), alluvial: t('soilAlluvial'), 'sandy-loam': t('soilSandyLoam'),
  }[code] || code)

  useEffect(() => {
    api.get('/farmer/profile').then(res => {
      if (res.data?.soilType) setFarmSoil(res.data.soilType)
    }).catch(() => {})
  }, [])

  const isSuitable = (crop) => {
    if (!farmSoil) return false
    return crop.soilCodes.some(s => s.includes(farmSoil.toLowerCase()) || farmSoil.toLowerCase().includes(s))
  }

  const filtered = crops.filter(crop => {
    const matchSearch = crop.name.toLowerCase().includes(search.toLowerCase()) ||
      crop.soil.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      crop.id.includes(search.toLowerCase())
    const matchSeason = selectedSeason === 'all' || crop.seasonCode.includes(selectedSeason)
    const matchWater = selectedWater === 'all' || crop.waterCode === selectedWater
    const matchSoil = selectedSoil === 'all' || crop.soilCodes.some(s => s.includes(selectedSoil) || selectedSoil.includes(s.split('-')[0]))
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
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('cropGuide')}</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{t('cropGuideDesc')}</p>
          </div>
        </div>

        {/* Farm soil banner */}
        {farmSoil && (
          <div className={`mt-4 border rounded-2xl px-4 py-3 flex items-center justify-between ${isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-2">
              <Leaf className={`w-4 h-4 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              <span className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>
                {t('yourSoil')} <strong>{farmSoil}</strong> — <span className={isDarkMode ? 'text-green-400' : 'text-green-600'}>{suitableCount} {t('suitableCrops')}</span>
              </span>
            </div>
            <button
              onClick={() => setSelectedSoil(farmSoil.toLowerCase())}
              className="text-xs bg-green-600 text-white px-3 py-1 rounded-full hover:bg-green-700 transition"
            >
              {t('filterByMySoil')}
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
            placeholder={t('searchPlaceholder')}
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
              {seasonCodes.map(s => (
                <button key={s} onClick={() => setSelectedSeason(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedSeason === s ? 'bg-green-600 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{seasonLabel(s)}</button>
              ))}
            </div>
          </div>

          {/* Water */}
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Droplets className="w-3 h-3" /> {t('waterNeed')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {waterCodes.map(w => (
                <button key={w} onClick={() => setSelectedWater(w)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedWater === w ? 'bg-blue-500 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{waterLabel(w)}</button>
              ))}
            </div>
          </div>

          {/* Soil */}
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Leaf className="w-3 h-3" /> {t('soilType')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {soilFilterCodes.map(s => (
                <button key={s} onClick={() => setSelectedSoil(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedSoil === s ? 'bg-amber-500 text-white' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{soilLabel(s)}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <p className={`text-sm mb-4 px-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {t('showing')} <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{filtered.length}</span> {t('crops')}
        {selectedSoil !== 'all' && <span className="text-amber-600"> {t('filteredBy')} {soilLabel(selectedSoil)} {t('soil')}</span>}
      </p>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((crop, i) => {
          const suitable = isSuitable(crop)
          const isOpen = expanded === i
          return (
            <div key={crop.id}
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
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('temp')}</p>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.temp}</p>
                  </div>
                  <div className={`rounded-2xl p-2.5 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <Droplets className={`w-3.5 h-3.5 mx-auto mb-1 ${waterColorByCode[crop.waterCode] || 'text-blue-500'}`} />
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('water')}</p>
                    <p className={`text-xs font-bold ${waterColorByCode[crop.waterCode] || (isDarkMode ? 'text-gray-300' : 'text-gray-700')}`}>{crop.water}</p>
                  </div>
                  <div className={`rounded-2xl p-2.5 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <Clock className="w-3.5 h-3.5 text-green-500 mx-auto mb-1" />
                    <p className={`text-xs leading-none mb-0.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('duration')}</p>
                    <p className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.duration.split(' ')[0]}</p>
                  </div>
                </div>

                {/* MSP + Yield row */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className={`rounded-2xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <div className="flex items-center gap-1 mb-0.5">
                      <IndianRupee className="w-3 h-3 text-green-600" />
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('mspPrice')}</p>
                    </div>
                    <p className={`text-xs font-bold leading-snug ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{crop.msp}</p>
                  </div>
                  <div className={`rounded-2xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/70'}`}>
                    <div className="flex items-center gap-1 mb-0.5">
                      <TrendingUp className="w-3 h-3 text-blue-500" />
                      <p className={`text-xs font-medium ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('avgYield')}</p>
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
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="font-semibold">{t('growing')}</span> {crop.months} &nbsp;·&nbsp; {crop.duration}</p>
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
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('bestStates')}</p>
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
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('commonPests')}</p>
                      </div>
                      <p className={`text-sm rounded-xl px-3 py-2 ${isDarkMode ? 'text-gray-300 bg-amber-900/30 border-amber-700' : 'text-gray-700 bg-amber-50 border border-amber-100'}`}>{crop.pest}</p>
                    </div>

                    {/* Tips */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-2">
                        <Leaf className="w-3.5 h-3.5 text-green-500" />
                        <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('farmingTips')}</p>
                      </div>
                      <p className={`text-sm leading-relaxed rounded-xl px-3 py-2.5 ${isDarkMode ? 'text-gray-300 bg-gray-800 border-gray-700' : 'text-gray-700 bg-white/80 border border-gray-100'}`}>{crop.tips}</p>
                    </div>

                    {/* Profit potential */}
                    <div className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 border border-gray-100'}`}>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className={`w-3.5 h-3.5 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`text-xs font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('profitPotential')}</p>
                      </div>
                      <span className={`text-sm font-bold ${profitColorByCode[crop.profitCode] || (isDarkMode ? 'text-gray-400' : 'text-gray-600')}`}>
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
          <p className={`text-lg font-semibold ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{t('noCropsMatch')}</p>
          <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('tryClearing')}</p>
          <button
            onClick={() => { setSearch(''); setSelectedSeason('all'); setSelectedWater('all'); setSelectedSoil('all') }}
            className={`mt-4 text-sm font-medium underline underline-offset-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}
          >
            {t('clearAllFilters')}
          </button>
        </div>
      )}
    </div>
  )
}