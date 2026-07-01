import { Link } from 'react-router-dom'
import { CloudSun, MessageSquareText, Sprout, TrendingUp, ShieldCheck, Mic, ArrowRight } from 'lucide-react'
import farmBg from "../assets/images/farm-bg.jpg"
import useLanguageStore from '../store/languageStore'
import useThemeStore from '../store/themeStore'

const features = [
  { icon: MessageSquareText, titleKey: "aiFarmingAssistant", descKey: "aiFarmingDesc", tint: "from-green-500 to-emerald-600" },
  { icon: CloudSun, titleKey: "liveWeather", descKey: "liveWeatherDesc", tint: "from-sky-400 to-blue-500" },
  { icon: Sprout, titleKey: "cropRecommendations", descKey: "cropRecommendationsDesc", tint: "from-emerald-500 to-teal-600" },
  { icon: TrendingUp, titleKey: "farmingAdvice", descKey: "farmingAdviceDesc", tint: "from-amber-400 to-orange-500" },
  { icon: ShieldCheck, titleKey: "trustedReliable", descKey: "trustedReliableDesc", tint: "from-violet-500 to-purple-600" },
  { icon: Mic, titleKey: "voiceSupport", descKey: "voiceSupportDesc", tint: "from-rose-500 to-red-600" },
]

export default function Home() {
  const { t } = useLanguageStore()
  const { isDarkMode } = useThemeStore()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[88vh] text-white rounded-[28px] sm:rounded-[40px] overflow-hidden isolate">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${farmBg})`,
            backgroundPosition: "right center",
            backgroundSize: "cover",
            filter: "brightness(1.12) saturate(1.06)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(
              to right,
              rgba(8,20,12,.70),
              rgba(8,20,12,.42),
              rgba(8,20,12,.08)
            )`,
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 flex flex-col justify-center min-h-[88vh]">
          <div className="max-w-3xl km-rise">
            <span className="inline-flex items-center gap-2 glass-hero text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Sprout className="w-3.5 h-3.5 text-green-300" />
              {t('builtForFarmers')}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight mb-6">
              {t('smartFarmingStartsHere')} <br />
              <span className="bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">{t('startsHere')}</span>
            </h1>
            <p className="text-green-50/90 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
              {t('heroDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="btn-pill bg-gradient-to-r from-amber-400 to-yellow-300 text-[#1B5E20] font-bold px-8 py-3.5 text-center text-lg shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2 group">
                {t('startForFree')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/chat" className="btn-pill glass-hero hover:bg-white/15 text-white font-semibold px-8 py-3.5 text-center text-lg transition-all">
                {t('tryAIChat')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { value: "10+", labelKey: "cropTypes" },
              { value: "24/7", labelKey: "aiAvailable" },
              { value: "Free", labelKey: "toUse" },
            ].map((stat, i) => (
              <div key={i} className={`km-card km-card-hover km-rise km-delay-${i + 1} p-6 text-center`}>
                <div className="font-mono-km text-3xl font-bold bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] bg-clip-text text-transparent">{stat.value}</div>
                <div className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mt-1`}>{t(stat.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 km-rise">
            <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${isDarkMode ? 'text-green-300' : 'text-[#1B5E20]'}`}>{t('everythingFarmerNeeds')}</h2>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg max-w-xl mx-auto`}>{t('onePlatform')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`km-card km-card-hover km-rise km-delay-${(i % 6) + 1} p-6 group`}>
                <div className={`bg-gradient-to-br ${f.tint} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-green-900/10 group-hover:rotate-6 transition-transform duration-300`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`font-display font-bold text-lg mb-2 ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>{t(f.titleKey)}</h3>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} leading-relaxed`}>{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 mx-3 sm:mx-6 mb-6">
        <div className="max-w-4xl mx-auto px-8 py-14 text-center rounded-[32px] bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#388E3C] text-white relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-amber-300/10 rounded-full blur-2xl" />
          <h2 className="font-display relative text-3xl md:text-4xl font-bold mb-4">{t('readyToFarm')}</h2>
          <p className="relative text-green-100/90 text-lg mb-8">{t('joinThousands')}</p>
          <Link to="/register" className="btn-pill relative bg-gradient-to-r from-amber-400 to-yellow-300 text-[#1B5E20] font-bold px-10 py-4 text-lg inline-block shadow-lg shadow-amber-900/20">
            {t('createFreeAccount')}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'text-green-400' : 'text-green-800'} py-8`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] p-1.5 rounded-lg">
              <Sprout className="w-4 h-4 text-white" />
            </div>
            <span className={`font-display font-bold text-lg ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>KrishiMitra</span>
          </div>
          <p className="text-sm opacity-80">{t('builtWithLove')}</p>
        </div>
      </footer>
    </div>
  )
}