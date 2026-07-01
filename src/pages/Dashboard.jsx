import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import useLanguageStore from '../store/languageStore'
import api from '../services/api'
import {
  Sprout, MessageSquareText, CloudSun, BookOpen, LogOut, User, Tractor,
  Droplets, Wind, ArrowUpRight, Sparkles, MapPin, MapPinOff, Send, Loader2,
} from 'lucide-react'

const cropLabelKeys = {
  Wheat: 'fpCropWheat', Rice: 'fpCropRice', Onion: 'fpCropOnion', Cotton: 'fpCropCotton',
  Sugarcane: 'fpCropSugarcane', Soybean: 'fpCropSoybean', Maize: 'fpCropMaize', Tomato: 'fpCropTomato',
  Potato: 'fpCropPotato', Gram: 'fpCropGram', Turmeric: 'fpCropTurmeric', Groundnut: 'fpCropGroundnut',
}

const getWeatherEmoji = (code) => {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 49) return '🌫️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '❄️'
  if (code <= 82) return '🌦️'
  if (code <= 99) return '⛈️'
  return '🌤️'
}

const getWeatherDescKey = (code) => {
  if (code === 0) return 'wxClearSky'
  if (code <= 3) return 'wxPartlyCloudy'
  if (code <= 49) return 'wxFoggy'
  if (code <= 67) return 'wxRainy'
  if (code <= 77) return 'wxSnowfall'
  if (code <= 82) return 'wxRainShowers'
  if (code <= 99) return 'wxThunderstorm'
  return 'wxCloudy'
}

export default function Dashboard() {
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()
  const { isDarkMode } = useThemeStore()
  const { t, language } = useLanguageStore()

  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  const [weather, setWeather] = useState(null)
  const [weatherLoading, setWeatherLoading] = useState(false)
  const [weatherError, setWeatherError] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const features = [
    { icon: MessageSquareText, title: t('dashFeatureChatTitle'), desc: t('dashFeatureChatDesc'), link: '/chat', tint: 'from-green-500 to-emerald-600' },
    { icon: CloudSun, title: t('dashFeatureWeatherTitle'), desc: t('dashFeatureWeatherDesc'), link: '/weather', tint: 'from-sky-400 to-blue-500' },
    { icon: Sprout, title: t('dashFeatureCropsTitle'), desc: t('dashFeatureCropsDesc'), link: '/crops', tint: 'from-emerald-500 to-teal-600' },
    { icon: BookOpen, title: t('dashFeatureAdviceTitle'), desc: t('dashFeatureAdviceDesc'), link: '/advice', tint: 'from-amber-400 to-orange-500' },
    { icon: Tractor, title: t('dashFeatureFarmProfileTitle'), desc: t('dashFeatureFarmProfileDesc'), link: '/farm-profile', tint: 'from-lime-500 to-green-600' },
  ]

  // Load the farmer's real profile (soil type, farm size, crops grown)
  useEffect(() => {
    api.get('/farmer/profile')
      .then(res => setProfile(res.data || {}))
      .catch(() => setProfile({}))
      .finally(() => setProfileLoading(false))
  }, [])

  // Fetch real weather for the farmer's own district/state — only once we know a location exists
  useEffect(() => {
    const location = farmer?.district || farmer?.state
    if (!location) return

    setWeatherLoading(true)
    setWeatherError('')

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`)
      .then(res => res.json())
      .then(geoData => {
        if (!geoData.results || geoData.results.length === 0) throw new Error('not found')
        const { latitude, longitude } = geoData.results[0]
        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`)
      })
      .then(res => res.json())
      .then(data => setWeather(data.current))
      .catch(() => setWeatherError(t('dashCouldNotLoadWeather')))
      .finally(() => setWeatherLoading(false))
  }, [farmer?.district, farmer?.state, language])

  // Real profile-completion score, based only on what the farmer has actually filled in
  const cropsGrown = profile?.cropsGrown ? profile.cropsGrown.split(',').filter(Boolean) : []
  const profileFields = [!!profile?.soilType, !!profile?.farmSize, cropsGrown.length > 0]
  const filledCount = profileFields.filter(Boolean).length
  const completionPct = profileLoading ? 0 : Math.round((filledCount / profileFields.length) * 100)
  const completionLabel = filledCount === 0 ? t('dashNotStarted') : filledCount === profileFields.length ? t('dashComplete') : t('dashInProgress')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

      {/* Greeting + AI prompt hero */}
      <div className="km-rise bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#66BB6A] text-white rounded-[28px] p-7 sm:p-9 mb-6 relative overflow-hidden shadow-xl shadow-green-900/20">
        <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-6 -bottom-16 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div>
            <p className="text-green-100/90 text-sm mb-1">{t('dashWelcome')}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">{farmer?.fullName}</h1>
            {(farmer?.district || farmer?.state) && (
              <p className="text-green-100/80 mt-1 text-sm">{[farmer?.district, farmer?.state].filter(Boolean).join(', ')}</p>
            )}

            <Link
              to="/chat"
              className="mt-5 flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-2xl pl-4 pr-2 py-2.5 max-w-md group"
            >
              <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="text-sm text-white/90 flex-1">{t('dashAskPrompt')}</span>
              <span className="bg-white text-[#1B5E20] p-2 rounded-full group-hover:scale-105 transition-transform">
                <Send className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3 self-start">
            <div className="bg-white/15 w-12 h-12 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <button
              onClick={handleLogout}
              className="btn-magnetic bg-white/15 hover:bg-white/25 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Bento grid: Weather / Profile Completion / Your Crops — all real data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">

        {/* Weather widget — only real data, only if we have a location */}
        <div className={`km-card km-card-hover km-rise km-delay-1 p-5 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('dashWeather')}</span>
            <CloudSun className="w-5 h-5 text-sky-500" />
          </div>

          {!(farmer?.district || farmer?.state) ? (
            <div className="flex flex-col items-start gap-2">
              <MapPinOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('dashNoLocationSet')}</p>
              <Link to="/weather" className="text-xs font-semibold text-green-600 hover:underline">{t('dashCheckWeatherCity')}</Link>
            </div>
          ) : weatherLoading ? (
            <div className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Loader2 className="w-4 h-4 animate-spin" /> {t('dashFetchingWeather')}
            </div>
          ) : weatherError ? (
            <p className={`text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>{weatherError}</p>
          ) : weather ? (
            <>
              <div className="flex items-end gap-2">
                <span className="font-mono-km text-3xl font-semibold">{Math.round(weather.temperature_2m)}°</span>
                <span className={`text-sm pb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t(getWeatherDescKey(weather.weather_code))} {getWeatherEmoji(weather.weather_code)}</span>
              </div>
              <div className="flex items-center gap-4 mt-3 text-xs">
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Droplets className="w-3.5 h-3.5 text-sky-400" /> {weather.relative_humidity_2m}% {t('dashHumiditySuffix')}
                </span>
                <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Wind className="w-3.5 h-3.5 text-sky-400" /> {Math.round(weather.wind_speed_10m)} km/h
                </span>
              </div>
              <p className={`flex items-center gap-1 text-[11px] mt-3 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                <MapPin className="w-3 h-3" /> {farmer?.district || farmer?.state}
              </p>
            </>
          ) : null}
        </div>

        {/* Farm Profile completeness — real, computed from actual saved profile */}
        <Link
          to="/farm-profile"
          className={`km-card km-card-hover km-rise km-delay-2 p-5 flex items-center gap-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}
        >
          {profileLoading ? (
            <Loader2 className={`w-6 h-6 animate-spin ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
          ) : (
            <svg width="76" height="76" viewBox="0 0 100 100" className="shrink-0 -rotate-90">
              <circle cx="50" cy="50" r="45" fill="none" stroke={isDarkMode ? '#1f2a22' : '#E8F5E9'} strokeWidth="9" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="url(#scoreGrad)" strokeWidth="9" strokeLinecap="round"
                strokeDasharray="283" strokeDashoffset={283 - (283 * completionPct) / 100}
                className="km-ring-animate"
              />
              <defs>
                <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#66BB6A" />
                  <stop offset="100%" stopColor="#2E7D32" />
                </linearGradient>
              </defs>
            </svg>
          )}
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('dashFarmProfile')}</span>
            <p className="font-mono-km text-2xl font-bold leading-tight mt-1">{profileLoading ? '—' : `${completionPct}%`}</p>
            <p className={`text-xs font-medium ${completionPct === 100 ? 'text-green-600' : isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>{profileLoading ? '' : completionLabel}</p>
          </div>
        </Link>

        {/* Your Crops — real, from saved profile */}
        <div className={`km-card km-card-hover km-rise km-delay-3 p-5 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">{t('dashYourCrops')}</span>
            <Sprout className="w-5 h-5 text-green-500" />
          </div>
          {profileLoading ? (
            <Loader2 className={`w-4 h-4 animate-spin ${isDarkMode ? 'text-gray-500' : 'text-gray-300'}`} />
          ) : cropsGrown.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {cropsGrown.map((c) => (
                <span key={c} className={`text-xs font-medium px-2.5 py-1 rounded-full ${isDarkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-50 text-green-700'}`}>{cropLabelKeys[c] ? t(cropLabelKeys[c]) : c}</span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-2">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('dashNoCropsAdded')}</p>
              <Link to="/farm-profile" className="text-xs font-semibold text-green-600 hover:underline">{t('dashAddYourCrops')}</Link>
            </div>
          )}
        </div>
      </div>

      {/* Feature Grid */}
      <h2 className={`font-display text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t('dashWhatDoYouNeed')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {features.map((f, i) => (
          <Link
            key={i}
            to={f.link}
            className={`km-card km-card-hover km-rise km-delay-${(i % 6) + 1} p-5 sm:p-6 group active:scale-[0.98] transition-transform`}
          >
            <div className={`bg-gradient-to-br ${f.tint} w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-900/10 group-hover:rotate-6 transition-transform duration-300`}>
              <f.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`font-display font-bold text-sm sm:text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{f.title}</h3>
              <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-xs sm:text-sm mt-1`}>{f.desc}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}
