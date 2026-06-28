import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sprout, Eye, EyeOff, Phone, Lock } from 'lucide-react'
import { authService } from '../services/api'
import useAuthStore from '../store/authStore'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ phone: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()
  const { login } = useAuthStore()

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
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="bg-green-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sprout className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-green-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2">Login to your Kisaan AI account</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="tel" name="phone" placeholder="Your registered phone number"
                  value={formData.phone} onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} name="password"
                  placeholder="Enter your password"
                  value={formData.password} onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-800 placeholder-gray-400"
                  required />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white font-bold py-3.5 rounded-xl transition-colors text-lg mt-2">
              {loading ? 'Logging in...' : 'Login to Kisaan AI'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData({ phone: '9999999999', password: 'demo123' })
            }}
            className="w-full border-2 border-green-200 hover:border-green-400 text-green-700 font-semibold py-3 rounded-xl transition-colors">
            🌾 Try Demo Account
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            New to Kisaan AI?{' '}
            <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">Create free account</Link>
          </p>
        </div>
      </div>
    </div>
  )
}