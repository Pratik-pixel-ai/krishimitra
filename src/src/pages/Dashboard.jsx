import { useNavigate, Link } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import {
  Sprout, MessageSquareText, CloudSun, BookOpen, LogOut, User, Tractor,
  Droplets, Wind, ArrowUpRight, TrendingUp, TrendingDown, Sparkles,
  AlertTriangle, Send,
} from 'lucide-react'

export default function Dashboard() {
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()
  const { isDarkMode } = useThemeStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const farmScore = 92

  const features = [
    { icon: MessageSquareText, title: 'AI Chat', desc: 'Ask anything about farming', link: '/chat', tint: 'from-green-500 to-emerald-600' },
    { icon: CloudSun, title: 'Weather', desc: 'Live weather for your area', link: '/weather', tint: 'from-sky-400 to-blue-500' },
    { icon: Sprout, title: 'Crops', desc: 'Best crops for your soil', link: '/crops', tint: 'from-emerald-500 to-teal-600' },
    { icon: BookOpen, title: 'Advice', desc: 'Expert farming tips', link: '/advice', tint: 'from-amber-400 to-orange-500' },
    { icon: Tractor, title: 'Farm Profile', desc: 'Your soil, size & crops', link: '/farm-profile', tint: 'from-lime-500 to-green-600' },
  ]

  const insights = [
    { icon: Droplets, label: 'Water Today', value: 'Moderate irrigation recommended', tint: 'text-sky-500 bg-sky-500/10' },
    { icon: Sprout, label: 'Fertilizer Tomorrow', value: 'Apply Urea top-dressing', tint: 'text-green-600 bg-green-500/10' },
    { icon: AlertTriangle, label: 'Disease Risk', value: 'Low this week', tint: 'text-amber-500 bg-amber-500/10' },
  ]

  const market = [
    { name: 'Wheat', price: '₹2,275', change: '+3.2%', up: true },
    { name: 'Cotton', price: '₹6,840', change: '-1.1%', up: false },
    { name: 'Soybean', price: '₹4,510', change: '+0.8%', up: true },
  ]

  const cardBase = isDarkMode ? 'km-card' : 'km-card'

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

      {/* Greeting + AI prompt hero */}
      <div className="km-rise bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#66BB6A] text-white rounded-[28px] p-7 sm:p-9 mb-6 relative overflow-hidden shadow-xl shadow-green-900/20">
        <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -left-6 -bottom-16 w-48 h-48 bg-amber-300/10 rounded-full blur-2xl" />

        <div className="relative flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6">
          <div>
            <p className="text-green-100/90 text-sm mb-1">Good Morning 🌱</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold">{farmer?.fullName}</h1>
            <p className="text-green-100/80 mt-1 text-sm">{farmer?.district}, {farmer?.state}</p>

            <Link
              to="/chat"
              className="mt-5 flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-2xl pl-4 pr-2 py-2.5 max-w-md group"
            >
              <Sparkles className="w-4 h-4 text-amber-200 shrink-0" />
              <span className="text-sm text-white/90 flex-1">How can KrishiMitra help today?</span>
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

      {/* Bento grid: Weather / Farm Score / Market */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Weather widget */}
        <div className={`km-card km-card-hover km-rise km-delay-1 p-5 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>Weather</span>
            <CloudSun className="w-5 h-5 text-sky-500" />
          </div>
          <div className="flex items-end gap-2">
            <span className="font-mono-km text-3xl font-semibold">29°</span>
            <span className={`text-sm pb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Partly Cloudy</span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs">
            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Droplets className="w-3.5 h-3.5 text-sky-400" /> 72% humidity
            </span>
            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <Wind className="w-3.5 h-3.5 text-sky-400" /> 11 km/h
            </span>
          </div>
        </div>

        {/* Farm Score - circular ring */}
        <div className={`km-card km-card-hover km-rise km-delay-2 p-5 flex items-center gap-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <svg width="76" height="76" viewBox="0 0 100 100" className="shrink-0 -rotate-90">
            <circle cx="50" cy="50" r="45" fill="none" stroke={isDarkMode ? '#1f2a22' : '#E8F5E9'} strokeWidth="9" />
            <circle
              cx="50" cy="50" r="45" fill="none"
              stroke="url(#scoreGrad)" strokeWidth="9" strokeLinecap="round"
              strokeDasharray="283" strokeDashoffset={283 - (283 * farmScore) / 100}
              className="km-ring-animate"
            />
            <defs>
              <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#66BB6A" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
            </defs>
          </svg>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Farm Score</span>
            <p className="font-mono-km text-2xl font-bold leading-tight mt-1">{farmScore}%</p>
            <p className="text-xs text-green-600 font-medium">Excellent</p>
          </div>
        </div>

        {/* Market prices */}
        <div className={`km-card km-card-hover km-rise km-delay-3 p-5 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Market Prices</span>
            <span className="w-2 h-2 rounded-full bg-green-500 km-pulse" />
          </div>
          <div className="space-y-2">
            {market.map((m) => (
              <div key={m.name} className="flex items-center justify-between text-sm">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{m.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono-km font-medium">{m.price}</span>
                  <span className={`flex items-center gap-0.5 text-xs font-semibold ${m.up ? 'text-green-600' : 'text-red-500'}`}>
                    {m.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {m.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <h2 className={`font-display text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>Today's AI Insights</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {insights.map((ins, i) => (
          <div key={i} className={`km-card km-card-hover km-rise p-5 km-delay-${i + 1}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${ins.tint}`}>
              <ins.icon className="w-5 h-5" />
            </div>
            <p className={`text-xs font-semibold uppercase tracking-wide ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>{ins.label}</p>
            <p className={`text-sm font-medium mt-1 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>{ins.value}</p>
          </div>
        ))}
      </div>

      {/* Feature Grid */}
      <h2 className={`font-display text-lg font-bold mb-3 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>What do you need today?</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <Link
            key={i}
            to={f.link}
            className={`km-card km-card-hover km-rise km-delay-${(i % 6) + 1} p-6 group`}
          >
            <div className={`bg-gradient-to-br ${f.tint} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-900/10 group-hover:rotate-6 transition-transform duration-300`}>
              <f.icon className="w-7 h-7 text-white" />
            </div>
            <div className="flex items-center justify-between">
              <h3 className={`font-display font-bold text-base ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{f.title}</h3>
              <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{f.desc}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}
