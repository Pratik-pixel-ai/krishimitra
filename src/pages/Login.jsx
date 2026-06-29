import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Eye, EyeOff, Phone, Lock } from 'lucide-react'
import { authService } from '../services/api'
import useAuthStore from '../store/authStore'
import useLanguageStore from '../store/languageStore'
import useThemeStore from '../store/themeStore'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { t } = useLanguageStore()
  const { isDarkMode } = useThemeStore()

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await authService.login(formData)
      login({ fullName: data.fullName, phone: data.phone, state: data.state, district: data.district }, data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors ${isDarkMode ? 'bg-gray-950' : 'bg-[#f9f6f0]'}`}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout className="text-white w-8 h-8" />
          </div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('welcomeBack')}</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{t('loginToAccount')}</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl shadow-sm border p-8 transition-colors`}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('phoneNumber')}</label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type="tel" name="phone" placeholder={t('phonePlaceholder')}
                  value={formData.phone} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                  required />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('password')}</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type={showPassword ? 'text' : 'password'} name="password"
                  placeholder={t('passwordPlaceholder')}
                  value={formData.password} onChange={handleChange}
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                  required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}>
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors text-lg mt-2">
              {loading ? t('loggingIn') : t('loginButton')}
            </button>
          </form>

          <div className={`flex items-center gap-3 my-6 ${isDarkMode ? 'border-gray-700' : ''}`}>
            <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'} text-sm`}>{t('or')}</span>
            <div className={`flex-1 h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData({ phone: '9999999999', password: 'demo123' })
            }}
            className={`w-full border-2 font-semibold py-3 rounded-xl transition-colors ${isDarkMode ? 'border-green-700 text-green-400 hover:border-green-600' : 'border-green-200 text-green-700 hover:border-green-400'}`}>
            🌾 {t('tryDemo')}
          </button>

          <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('newToKrishiMitra')}{' '}
            <Link to="/register" className={`font-semibold hover:underline ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}>{t('createFreeAccountLink')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}