import { Link } from 'react-router-dom'
import { CloudSun, MessageSquareText, Sprout, TrendingUp, ShieldCheck, Mic } from 'lucide-react'
import farmBg from "../assets/images/farm-bg.jpg";
import useLanguageStore from '../store/languageStore'
import useThemeStore from '../store/themeStore'

const features = [
  {
    icon: <MessageSquareText className="w-7 h-7 text-green-600" />,
    titleKey: "aiFarmingAssistant",
    descKey: "aiFarmingDesc",
    bg: "bg-green-50",
    darkBg: "bg-green-900/30"
  },
  {
    icon: <CloudSun className="w-7 h-7 text-blue-500" />,
    titleKey: "liveWeather",
    descKey: "liveWeatherDesc",
    bg: "bg-blue-50",
    darkBg: "bg-blue-900/30"
  },
  {
    icon: <Sprout className="w-7 h-7 text-emerald-600" />,
    titleKey: "cropRecommendations",
    descKey: "cropRecommendationsDesc",
    bg: "bg-emerald-50",
    darkBg: "bg-emerald-900/30"
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-orange-500" />,
    titleKey: "farmingAdvice",
    descKey: "farmingAdviceDesc",
    bg: "bg-orange-50",
    darkBg: "bg-orange-900/30"
  },
  {
    icon: <ShieldCheck className="w-7 h-7 text-purple-500" />,
    titleKey: "trustedReliable",
    descKey: "trustedReliableDesc",
    bg: "bg-purple-50",
    darkBg: "bg-purple-900/30"
  },
  {
    icon: <Mic className="w-7 h-7 text-red-500" />,
    titleKey: "voiceSupport",
    descKey: "voiceSupportDesc",
    bg: "bg-red-50",
    darkBg: "bg-red-900/30"
  }
]

export default function Home() {
  const { t } = useLanguageStore()
  const { isDarkMode } = useThemeStore()

  return (
    <div className="relative h-[90vh]">

      {/* Hero Section */}
      <section
  className="relative min-h-screen bg-cover bg-center bg-no-repeat text-white"
  style={{
  backgroundImage: `linear-gradient(
    to right,
    rgba(0,0,0,.75),
    rgba(0,0,0,.55),
    rgba(0,0,0,.15)
  ), url(${farmBg})`,
  backgroundPosition: "right center",
  backgroundSize: "cover",
}}
>
  

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">

    <div className="max-w-3xl">
            <span className="inline-block bg-green-500/30 border border-green-400/40 text-green-100 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              {t('builtForFarmers')}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t('smartFarmingStartsHere')} <br />
              <span className="text-yellow-300">{t('startsHere')}</span>
            </h1>
            <p className="text-green-100 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              {t('heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-8 py-3.5 rounded-xl text-center transition-colors text-lg">
                {t('startForFree')}
              </Link>
              <Link to="/chat" className="border-2 border-white/40 hover:border-white text-white font-semibold px-8 py-3.5 rounded-xl text-center transition-colors text-lg">
                {t('tryAIChat')}
              </Link>
            </div>
          </div>
        </div>

        
      </section>

      {/* Stats */}
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-[#f9f6f0]'} py-12 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "10,000+", labelKey: "farmersHelped" },
              { value: "15+", labelKey: "cropTypes" },
              { value: "24/7", labelKey: "aiAvailable" },
              { value: "Free", labelKey: "toUse" },
            ].map((stat, i) => (
              <div key={i} className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-green-100'} rounded-2xl p-6 text-center shadow-sm border transition-colors`}>
                <div className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-700'}`}>{stat.value}</div>
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={`${isDarkMode ? 'bg-gray-900' : 'bg-[#f9f6f0]'} py-16 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('everythingFarmerNeeds')}</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg max-w-xl mx-auto`}>{t('onePlatform')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`${isDarkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-green-50 hover:shadow-md'} rounded-2xl p-6 shadow-sm border transition-all`}>
                <div className={`${isDarkMode ? f.darkBg : f.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className={`font-bold text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t(f.titleKey)}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`${isDarkMode ? 'bg-green-900' : 'bg-green-800'} text-white py-16 transition-colors`}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('readyToFarm')}</h2>
          <p className="text-green-200 text-lg mb-8">{t('joinThousands')}</p>
          <Link to="/register" className="bg-yellow-400 hover:bg-yellow-300 text-green-900 font-bold px-10 py-4 rounded-xl text-lg inline-block transition-colors">
            {t('createFreeAccount')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-gray-950 text-green-400' : 'bg-green-900 text-green-300'} py-8 transition-colors`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sprout className={`w-5 h-5 ${isDarkMode ? 'text-green-500' : 'text-green-400'}`} />
            <span className="font-bold text-white text-lg">KrishiMitra</span>
          </div>
          <p className="text-sm">{t('builtWithLove')}</p>
        </div>
      </footer>

    </div>
  )
}