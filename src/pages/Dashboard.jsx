import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import useThemeStore from '../store/themeStore'
import { Sprout, MessageSquareText, CloudSun, BookOpen, LogOut, User, Tractor } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()
  const { isDarkMode } = useThemeStore()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const features = [
    { icon: <MessageSquareText className="w-7 h-7 text-green-600" />, title: "AI Chat", desc: "Ask anything about farming", link: "/chat", bg: "bg-green-50", darkBg: "bg-green-900/30" },
    { icon: <CloudSun className="w-7 h-7 text-blue-500" />, title: "Weather", desc: "Live weather for your area", link: "/weather", bg: "bg-blue-50", darkBg: "bg-blue-900/30" },
    { icon: <Sprout className="w-7 h-7 text-emerald-600" />, title: "Crops", desc: "Best crops for your soil", link: "/crops", bg: "bg-emerald-50", darkBg: "bg-emerald-900/30" },
    { icon: <BookOpen className="w-7 h-7 text-amber-500" />, title: "Advice", desc: "Expert farming tips", link: "/advice", bg: "bg-amber-50", darkBg: "bg-amber-900/30" },
    { icon: <Tractor className="w-7 h-7 text-green-700" />, title: "Farm Profile", desc: "Your soil, size & crops", link: "/farm-profile", bg: "bg-green-50", darkBg: "bg-green-900/30" },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Welcome Card */}
      <div className="bg-gradient-to-br from-green-700 to-emerald-600 text-white rounded-3xl p-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-green-200 text-sm mb-1">Welcome back 👋</p>
            <h1 className="text-3xl font-bold">{farmer?.fullName}</h1>
            <p className="text-green-200 mt-1">{farmer?.district}, {farmer?.state}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 w-12 h-12 rounded-2xl flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <button onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors">
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>What do you need today?</h2>
      <div className="grid grid-cols-2 gap-4">
        {features.map((f, i) => (
          <Link key={i} to={f.link}
            className={`${isDarkMode ? 'bg-gray-900 border-gray-800 hover:bg-gray-800' : 'bg-white border-green-100 hover:shadow-md'} rounded-3xl p-6 border transition-all`}>
            <div className={`${isDarkMode ? f.darkBg : f.bg} w-14 h-14 rounded-2xl flex items-center justify-center mb-4`}>
              {f.icon}
            </div>
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{f.title}</h3>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{f.desc}</p>
          </Link>
        ))}
      </div>

    </div>
  )
}