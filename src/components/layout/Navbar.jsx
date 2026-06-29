
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sprout, LogOut, LayoutDashboard, Moon, Sun, Globe } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useLanguageStore from '../../store/languageStore'
import useThemeStore from '../../store/themeStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()
  const { language, setLanguage, t } = useLanguageStore()
  const { isDarkMode, toggleDarkMode } = useThemeStore()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'mr', name: 'मराठी' },
  ]

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <nav className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} shadow-sm border-b sticky top-0 z-50 transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <div>
              <span className={`font-bold text-lg leading-none block ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>KrishiMitra</span>
              <span className={`text-xs leading-none ${isDarkMode ? 'text-green-500' : 'text-green-600'}`}>Smart Farming Assistant</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium transition-colors`}>{t('home')}</Link>
            <Link to="/weather" className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium transition-colors`}>{t('weather')}</Link>
            <Link to="/chat" className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium transition-colors`}>{t('aiChat')}</Link>
            <Link to="/crops" className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium transition-colors`}>{t('crops')}</Link>
            <Link to="/advice" className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium transition-colors`}>{t('advice')}</Link>
          </div>

          {/* Settings - Language & Dark Mode */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200'} border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <Globe className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Auth Buttons — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {farmer ? (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 font-medium transition-colors ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-800'}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {farmer.fullName.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 font-medium px-4 py-2 rounded-lg transition-colors ${isDarkMode ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400' : 'bg-red-50 hover:bg-red-100 text-red-600'}`}
                >
                  <LogOut className="w-4 h-4" />
                  {t('logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={`${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-700 hover:text-green-800'} font-medium transition-colors`}>{t('login')}</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  {t('getStarted')}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className={`md:hidden py-4 border-t flex flex-col gap-3 ${isDarkMode ? 'border-gray-800' : 'border-green-100'}`}>
            <Link to="/" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium py-1`}>{t('home')}</Link>
            <Link to="/weather" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium py-1`}>{t('weather')}</Link>
            <Link to="/chat" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium py-1`}>{t('aiChat')}</Link>
            <Link to="/crops" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium py-1`}>{t('crops')}</Link>
            <Link to="/advice" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-gray-300 hover:text-green-400' : 'text-gray-600 hover:text-green-700'} font-medium py-1`}>{t('advice')}</Link>
            
            {/* Mobile Language & Dark Mode */}
            <div className="flex gap-3 pt-2 border-t border-gray-200 mt-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none cursor-pointer ${isDarkMode ? 'bg-gray-800 text-gray-200 border-gray-700' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex gap-3 pt-2">
              {farmer ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>{t('dashboard')}</Link>
                  <button onClick={handleLogout} className={`${isDarkMode ? 'text-red-400' : 'text-red-600'} font-medium`}>{t('logout')}</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className={`${isDarkMode ? 'text-green-400' : 'text-green-700'} font-medium`}>{t('login')}</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">{t('getStarted')}</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}