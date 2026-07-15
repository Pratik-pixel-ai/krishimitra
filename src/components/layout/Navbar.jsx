import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Sprout, LogOut, LayoutDashboard, Moon, Sun, Globe } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useLanguageStore from '../../store/languageStore'
import useThemeStore from '../../store/themeStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { language, setLanguage, t } = useLanguageStore()
  const { isDarkMode, toggleDarkMode } = useThemeStore()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
  ]

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/weather', label: t('weather') },
    { to: '/chat', label: t('aiChat') },
    { to: '/diagnose', label: t('plantDoctor') },
    { to: '/crops', label: t('crops') },
    { to: '/advice', label: t('advice') },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <div className="sticky top-0 z-40 px-3 sm:px-6 pt-3">
      <nav
        className={`km-nav-float max-w-6xl mx-auto px-4 sm:px-5 transition-colors duration-500 shadow-[0_8px_30px_-12px_rgba(16,24,16,0.18)] border ${
          isDarkMode ? 'glass-dark border-white/10' : 'glass border-white/50'
        }`}
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="bg-gradient-to-br from-[#2E7D32] to-[#66BB6A] p-2 rounded-xl shadow-md shadow-green-900/20">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <div>
              <span className={`font-display font-bold text-lg leading-none block ${isDarkMode ? 'text-green-300' : 'text-[#1B5E20]'}`}>
                KrishiMitra
              </span>
              <span className={`text-[11px] leading-none ${isDarkMode ? 'text-green-500/80' : 'text-green-600/80'}`}>
                Smart Farming Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center gap-1 rounded-full p-1 ${isDarkMode ? 'bg-white/5' : 'bg-black/5'}`}>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive(l.to)
                    ? isDarkMode
                      ? 'bg-green-600/30 text-green-300 shadow-sm'
                      : 'bg-white text-[#1B5E20] shadow-sm font-semibold'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-white hover:bg-white/12'
                      : 'text-gray-700 hover:text-[#1B5E20] hover:bg-white/80'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Settings */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`border rounded-full pl-3 pr-7 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 appearance-none cursor-pointer transition-colors ${
                  isDarkMode ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-white/80 text-gray-700 border-gray-200 hover:border-green-400'
                }`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <Globe className={`absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            <button
              onClick={toggleDarkMode}
              className={`btn-magnetic p-2.5 rounded-full transition-colors border ${
                isDarkMode
                  ? 'bg-white/5 text-amber-300 hover:bg-white/15 border-white/10'
                  : 'bg-white/80 text-gray-700 hover:bg-white border-gray-200 hover:border-green-400'
              }`}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2 ml-2">
            {farmer ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-1.5 font-medium text-sm px-3 py-2 rounded-full transition-colors ${
                    isDarkMode ? 'text-green-300 hover:bg-white/10' : 'text-[#1B5E20] hover:bg-white/70 border border-transparent hover:border-green-200'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {farmer.fullName.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-magnetic flex items-center gap-1.5 font-medium text-sm px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors border border-red-200/30"
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`font-medium text-sm px-4 py-2 rounded-full transition-colors border ${
                    isDarkMode
                      ? 'text-green-300 hover:bg-white/10 border-white/10'
                      : 'text-[#1B5E20] hover:bg-white/70 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {t('login')}
                </Link>
                <Link to="/register" className="btn-pill btn-primary text-sm px-5 py-2.5">
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden p-2 rounded-full transition-colors ${isDarkMode ? 'text-gray-200 bg-white/5 hover:bg-white/10' : 'text-gray-700 bg-white/60 hover:bg-white'}`}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden pb-4 pt-2 border-t flex flex-col gap-1 ${isDarkMode ? 'border-white/10' : 'border-gray-200/60'}`}>
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setIsOpen(false)}
                className={`font-medium py-2.5 px-3 rounded-xl transition-colors ${
                  isActive(l.to)
                    ? isDarkMode ? 'bg-green-700/30 text-green-300' : 'bg-green-50 text-green-800 font-semibold'
                    : isDarkMode ? 'text-gray-300 hover:text-green-300 hover:bg-white/5' : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className={`flex gap-3 pt-3 mt-1 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200/60'}`}>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 appearance-none cursor-pointer ${isDarkMode ? 'bg-white/5 text-gray-200 border-white/10' : 'bg-white text-gray-700 border-gray-200'}`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <button onClick={toggleDarkMode} className={`p-2 rounded-xl border ${isDarkMode ? 'bg-white/5 text-amber-300 border-white/10' : 'bg-white text-gray-600 border-gray-200'}`}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-3 pt-3">
              {farmer ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-green-300' : 'text-green-700'} font-medium`}>{t('dashboard')}</Link>
                  <button onClick={handleLogout} className="text-red-500 font-medium">{t('logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-green-300' : 'text-green-700'} font-medium`}>{t('login')}</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="btn-pill btn-primary px-5 py-2 text-sm">{t('getStarted')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
