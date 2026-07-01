import { useState, useEffect, useMemo } from 'react'
import { Sprout, Search, Droplets, Thermometer, Sun, Clock, MapPin, ChevronDown, ChevronUp, IndianRupee, Leaf, AlertTriangle, TrendingUp, X } from 'lucide-react'
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

function CropDetailModal({ crop, onClose, isDarkMode, t, farmSoil }) {
  const profitColor = profitColorByCode[crop.profitCode] || (isDarkMode ? 'text-gray-400' : 'text-gray-600')
  const waterColor = waterColorByCode[crop.waterCode] || 'text-blue-500'

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className={`relative z-10 w-full sm:max-w-lg rounded-t-[28px] sm:rounded-[28px] overflow-hidden shadow-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col ${isDarkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`shrink-0 flex items-center justify-between px-6 pt-6 pb-4 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-3">
            <span className="text-4xl">{crop.emoji}</span>
            <div>
              <h2 className={`text-xl font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>{crop.name}</h2>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${crop.badge}`}>{crop.season}</span>
            </div>
          </div>
          <button onClick={onClose} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5 flex-1 overflow-y-auto">
          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`rounded-2xl p-3 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Thermometer className="w-4 h-4 text-red-400 mx-auto mb-1" />
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('temp')}</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{crop.temp}</p>
            </div>
            <div className={`rounded-2xl p-3 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Droplets className={`w-4 h-4 mx-auto mb-1 ${waterColor}`} />
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('water')}</p>
              <p className={`text-sm font-bold ${waterColor}`}>{crop.water}</p>
            </div>
            <div className={`rounded-2xl p-3 text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <Clock className="w-4 h-4 text-green-500 mx-auto mb-1" />
              <p className={`text-xs mb-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('duration')}</p>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{crop.duration.split(' ')[0]}</p>
            </div>
          </div>

          {/* MSP + Yield */}
          <div className="grid grid-cols-2 gap-3">
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-100'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <IndianRupee className="w-3.5 h-3.5 text-green-600" />
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{t('mspPrice')}</p>
              </div>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-green-300' : 'text-green-800'}`}>{crop.msp}</p>
            </div>
            <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-100'}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                <p className={`text-xs font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>{t('avgYield')}</p>
              </div>
              <p className={`text-sm font-bold ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>{crop.yield}</p>
            </div>
          </div>

          {/* Growing season */}
          <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-amber-50 border border-amber-100'}`}>
            <Sun className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className={`text-xs font-semibold mb-0.5 ${isDarkMode ? 'text-gray-400' : 'text-amber-700'}`}>{t('growing')}</p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.months} &nbsp;·&nbsp; {crop.duration}</p>
            </div>
          </div>

          {/* Soil types */}
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide mb-2 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>Soil Types</p>
            <div className="flex flex-wrap gap-2">
              {crop.soil.map((s, j) => (
                <span key={j} className={`text-xs px-3 py-1 rounded-full font-medium ${isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Best States */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{t('bestStates')}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {crop.states.map((state, j) => (
                <span key={j} className={`text-xs px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-700 border border-gray-200 shadow-sm'}`}>
                  {state}
                </span>
              ))}
            </div>
          </div>

          {/* Pests */}
          <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-amber-900/25 border border-amber-800/50' : 'bg-amber-50 border border-amber-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-amber-400' : 'text-amber-700'}`}>{t('commonPests')}</p>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.pest}</p>
          </div>

          {/* Tips */}
          <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-green-900/25 border border-green-800/50' : 'bg-green-50 border border-green-100'}`}>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="w-4 h-4 text-green-500" />
              <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{t('farmingTips')}</p>
            </div>
            <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{crop.tips}</p>
          </div>

          {/* Profit */}
          <div className={`flex items-center justify-between rounded-2xl px-4 py-3 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50 border border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('profitPotential')}</p>
            </div>
            <span className={`text-sm font-bold ${profitColor}`}>{crop.profit}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Crops() {
  const [search, setSearch] = useState('')
  const [selectedSeason, setSelectedSeason] = useState('all')
  const [selectedWater, setSelectedWater] = useState('all')
  const [selectedSoil, setSelectedSoil] = useState('all')
  const [modalCrop, setModalCrop] = useState(null)
  const [farmSoil, setFarmSoil] = useState(null)
  const { isDarkMode } = useThemeStore()
  const { t, language } = useLanguageStore()
  const { farmer } = useAuthStore()

  const crops = useMemo(() => {
    const langData = cropTranslations[language] || cropTranslations.en
    return cropsBase.map((base) => ({
      ...base,
      ...(cropTranslations.en[base.id] || {}),
      ...(langData[base.id] || {}),
    }))
  }, [language])

  const seasonLabel = (code) => ({ all: t('filterAll'), kharif: t('seasonKharif'), rabi: t('seasonRabi'), annual: t('seasonAnnual') }[code] || code)
  const waterLabel = (code) => ({ all: t('filterAll'), low: t('waterLow'), medium: t('waterMedium'), high: t('waterHigh') }[code] || code)
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
  const hasActiveFilters = selectedSeason !== 'all' || selectedWater !== 'all' || selectedSoil !== 'all' || search

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-emerald-600 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20">
            <Sprout className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('cropGuide')}</h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{t('cropGuideDesc')}</p>
          </div>
        </div>

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
              className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-full hover:bg-green-700 transition font-semibold"
            >
              {t('filterByMySoil')}
            </button>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl shadow-sm border p-5 mb-6 transition-colors`}>
        <div className="relative mb-4">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 text-sm transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-gray-50 border-gray-200 text-gray-800 focus:bg-white'}`}
          />
        </div>

        <div className="flex flex-wrap gap-y-4 gap-x-6">
          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Sun className="w-3 h-3" /> {t('season')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {seasonCodes.map(s => (
                <button key={s} onClick={() => setSelectedSeason(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedSeason === s ? 'bg-green-600 text-white shadow-sm' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{seasonLabel(s)}</button>
              ))}
            </div>
          </div>

          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Droplets className="w-3 h-3" /> {t('waterNeed')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {waterCodes.map(w => (
                <button key={w} onClick={() => setSelectedWater(w)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedWater === w ? 'bg-blue-500 text-white shadow-sm' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{waterLabel(w)}</button>
              ))}
            </div>
          </div>

          <div>
            <p className={`text-xs font-semibold mb-2 flex items-center gap-1 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              <Leaf className="w-3 h-3" /> {t('soilType')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {soilFilterCodes.map(s => (
                <button key={s} onClick={() => setSelectedSoil(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedSoil === s ? 'bg-amber-500 text-white shadow-sm' : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}>{soilLabel(s)}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Results count + clear */}
      <div className="flex items-center justify-between mb-4 px-1">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {t('showing')} <span className={`font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{filtered.length}</span> {t('crops')}
          {selectedSoil !== 'all' && <span className="text-amber-600"> · {soilLabel(selectedSoil)} {t('soil')}</span>}
        </p>
        {hasActiveFilters && (
          <button
            onClick={() => { setSearch(''); setSelectedSeason('all'); setSelectedWater('all'); setSelectedSoil('all') }}
            className={`text-xs flex items-center gap-1 font-medium ${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'} transition-colors`}
          >
            <X className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Crop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((crop, i) => {
          const suitable = isSuitable(crop)
          return (
            <div key={crop.id}
              className={`border-2 ${crop.color} rounded-3xl overflow-hidden transition-all duration-200 ${
                suitable ? 'ring-2 ring-green-400 ring-offset-1' : ''
              } hover:shadow-lg hover:-translate-y-1 group`}
            >
              {suitable && (
                <div className="bg-green-600 text-white text-xs font-semibold text-center py-1.5 tracking-wide">
                  ✓ {t('suitableForYour')} {farmSoil} {t('soil')}
                </div>
              )}

              <div className="p-5">
                {/* Top row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl leading-none">{crop.emoji}</span>
                    <h3 className={`font-bold text-lg leading-tight ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>{crop.name}</h3>
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

                {/* MSP + Yield */}
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

                {/* Months */}
                <div className={`flex items-center gap-2 mb-4 rounded-xl px-3 py-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white/60'}`}>
                  <Sun className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}><span className="font-semibold">{t('growing')}</span> {crop.months} &nbsp;·&nbsp; {crop.duration}</p>
                </div>

                {/* View Details button */}
                <button
                  onClick={() => setModalCrop(crop)}
                  className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl transition-all hover:shadow-sm active:scale-95"
                  style={{ color: crop.accent, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.7)' }}
                >
                  <ChevronDown className="w-3.5 h-3.5" /> {t('fullDetails')}
                </button>
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

      {/* Detail Modal */}
      {modalCrop && (
        <CropDetailModal
          crop={modalCrop}
          onClose={() => setModalCrop(null)}
          isDarkMode={isDarkMode}
          t={t}
          farmSoil={farmSoil}
        />
      )}
    </div>
  )
}