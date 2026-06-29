import { useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import useAuthStore from '../store/authStore'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sprout, Eye, EyeOff, User, Phone, MapPin, Lock } from 'lucide-react'
import useLanguageStore from '../store/languageStore'
import useThemeStore from '../store/themeStore'

const states = ["Andhra Pradesh","Bihar","Gujarat","Haryana","Karnataka","Madhya Pradesh","Maharashtra","Punjab","Rajasthan","Tamil Nadu","Uttar Pradesh","West Bengal"]

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '', phone: '', state: '', district: '', password: ''
  })
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
      const data = await authService.register(formData)
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
          <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}>{t('createAccount')}</h1>
          <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{t('joinKrishiMitra')}</p>
        </div>

        <div className={`${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-green-100'} rounded-3xl shadow-sm border p-8 transition-colors`}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('fullName')}</label>
              <div className="relative">
                <User className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type="text" name="fullName" placeholder={t('fullNamePlaceholder')}
                  value={formData.fullName} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                  required />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('phoneNumber')}</label>
              <div className="relative">
                <Phone className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type="tel" name="phone" placeholder={t('phonePlaceholderReg')}
                  value={formData.phone} onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                  required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('state')}</label>
                <div className="relative">
                  <MapPin className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  <select name="state" value={formData.state} onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                    required>
                    <option value="">{t('select')}</option>
                    {states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('district')}</label>
                <input type="text" name="district" placeholder={t('districtPlaceholder')}
                  value={formData.district} onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent placeholder-gray-400 transition-colors ${isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-200' : 'bg-white border-gray-200 text-gray-800'}`}
                  required />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('password')}</label>
              <div className="relative">
                <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                <input type={showPassword ? 'text' : 'password'} name="password"
                  placeholder={t('createStrongPassword')}
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
              {loading ? t('creatingAccount') : t('createAccountButton')}
            </button>
          </form>

          <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {t('alreadyHaveAccount')}{' '}
            <Link to="/login" className={`font-semibold hover:underline ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-700'}`}>{t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  )
}