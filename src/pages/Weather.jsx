import { useState } from 'react'
import { CloudSun, Wind, Droplets, MapPin, Search, Eye, Gauge, Thermometer } from 'lucide-react'

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

const getWeatherDesc = (code) => {
  if (code === 0) return 'Clear Sky'
  if (code <= 3) return 'Partly Cloudy'
  if (code <= 49) return 'Foggy'
  if (code <= 67) return 'Rainy'
  if (code <= 77) return 'Snowfall'
  if (code <= 82) return 'Rain Showers'
  if (code <= 99) return 'Thunderstorm'
  return 'Cloudy'
}

const getFarmingAdvice = (code, temp) => {
  if (code >= 80) return "⛈️ Storm/heavy rain expected — secure equipment and avoid fieldwork today."
  if (code >= 61) return "🌧️ Rain expected — avoid spraying fertilizers. Good time to check drainage."
  if (code === 0 && temp > 35) return "☀️ Very hot day — irrigate early morning or evening. Keep livestock hydrated."
  if (code === 0) return "☀️ Clear sky — great day for spraying, harvesting, or field work."
  if (code <= 3) return "⛅ Cloudy conditions — suitable for transplanting seedlings."
  if (code <= 49) return "🌫️ Foggy conditions — wait for visibility to improve before field work."
  return "🌾 Check conditions before starting field work today."
}

const quickCities = ['Pune', 'Nagpur', 'Lucknow', 'Jaipur', 'Bhopal', 'Patna', 'Amravati', 'Nashik']

export default function Weather() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async (searchCity) => {
    const query = searchCity || city
    if (!query.trim()) return
    setLoading(true)
    setError('')
    setWeather(null)

    try {
      // Step 1: Get coordinates
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`)
      const geoData = await geoRes.json()

      if (!geoData.results || geoData.results.length === 0) throw new Error('City not found')

      const { latitude, longitude, name, country } = geoData.results[0]

      // Step 2: Get weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature,visibility,surface_pressure&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=5`
      )
      const data = await weatherRes.json()

      setWeather({ ...data, cityName: name, country })

      const daily = data.daily.time.map((date, i) => ({
        date,
        max: data.daily.temperature_2m_max[i],
        min: data.daily.temperature_2m_min[i],
        code: data.daily.weather_code[i]
      }))
      setForecast(daily)

    } catch (err) {
      setError('City not found. Please check spelling and try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') fetchWeather()
  }

  const getDayName = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-blue-500 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CloudSun className="text-white w-7 h-7" />
        </div>
        <h1 className="text-3xl font-bold text-green-900">Weather for Farmers</h1>
        <p className="text-gray-500 mt-2">Real-time weather and farming advice for your area</p>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-6 mb-6">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Enter your city or district..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-800 placeholder-gray-400"
            />
          </div>
          <button
            onClick={() => fetchWeather()}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            Search
          </button>
        </div>

        {/* Quick Cities */}
        <div className="mt-4">
          <p className="text-xs text-gray-400 font-medium mb-2">POPULAR CITIES</p>
          <div className="flex flex-wrap gap-2">
            {quickCities.map(c => (
              <button
                key={c}
                onClick={() => { setCity(c); fetchWeather(c) }}
                className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 mb-6 text-center">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-center py-16">
          <CloudSun className="w-12 h-12 mx-auto mb-3 animate-pulse text-blue-400" />
          <p className="text-gray-400">Fetching weather data...</p>
        </div>
      )}

      {/* Weather Data */}
      {weather && !loading && (
        <>
          {/* Main Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl p-8 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-blue-200" />
                  <span className="text-blue-200 text-sm">{weather.cityName}, {weather.country}</span>
                </div>
                <div className="text-7xl font-bold mb-2">
                  {Math.round(weather.current.temperature_2m)}°C
                </div>
                <div className="text-blue-100 text-lg">
                  {getWeatherDesc(weather.current.weather_code)}
                </div>
                <div className="text-blue-200 text-sm mt-1">
                  Feels like {Math.round(weather.current.apparent_temperature)}°C
                </div>
              </div>
              <div className="text-8xl">
                {getWeatherEmoji(weather.current.weather_code)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-blue-400/40">
              {[
                { icon: <Droplets className="w-4 h-4" />, label: "Humidity", value: `${weather.current.relative_humidity_2m}%` },
                { icon: <Wind className="w-4 h-4" />, label: "Wind", value: `${Math.round(weather.current.wind_speed_10m)} km/h` },
                { icon: <Eye className="w-4 h-4" />, label: "Visibility", value: `${((weather.current.visibility || 0) / 1000).toFixed(1)} km` },
                { icon: <Gauge className="w-4 h-4" />, label: "Pressure", value: `${Math.round(weather.current.surface_pressure)} hPa` },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 rounded-2xl p-3 text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-200 mb-1">{s.icon}</div>
                  <div className="text-xs text-blue-200">{s.label}</div>
                  <div className="font-bold text-sm mt-0.5">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Farming Advice */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-6">
            <p className="text-sm font-semibold text-green-800 mb-1">🌾 Farming Advice for Today</p>
            <p className="text-green-700">
              {getFarmingAdvice(weather.current.weather_code, weather.current.temperature_2m)}
            </p>
          </div>

          {/* 5 Day Forecast */}
          {forecast.length > 0 && (
            <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-6">
              <h3 className="font-bold text-gray-800 mb-4">5-Day Forecast</h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {forecast.map((day, i) => (
                  <div key={i} className="bg-blue-50 rounded-2xl p-4 text-center">
                    <p className="text-xs text-gray-500 font-medium mb-2">{getDayName(day.date)}</p>
                    <div className="text-3xl mb-2">{getWeatherEmoji(day.code)}</div>
                    <p className="font-bold text-gray-800 text-sm">{Math.round(day.max)}°C</p>
                    <p className="text-xs text-gray-400">{Math.round(day.min)}°C</p>
                    <p className="text-xs text-gray-500 mt-1">{getWeatherDesc(day.code)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Empty State */}
      {!weather && !loading && !error && (
        <div className="text-center py-16 text-gray-400">
          <CloudSun className="w-16 h-16 mx-auto mb-4 text-blue-300" />
          <p className="text-lg font-medium text-gray-500">Search your city to see weather</p>
          <p className="text-sm mt-1">Free real-time data, no signup needed</p>
        </div>
      )}

    </div>
  )
}