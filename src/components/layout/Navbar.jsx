
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, Sprout, LogOut, LayoutDashboard } from 'lucide-react'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { farmer, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="text-white w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-green-800 text-lg leading-none block">Kisaan AI</span>
              <span className="text-xs text-green-600 leading-none">Smart Farming Assistant</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Home</Link>
            <Link to="/weather" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Weather</Link>
            <Link to="/chat" className="text-gray-600 hover:text-green-700 font-medium transition-colors">AI Chat</Link>
            <Link to="/crops" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Crops</Link>
            <Link to="/advice" className="text-gray-600 hover:text-green-700 font-medium transition-colors">Advice</Link>
          </div>

          {/* Auth Buttons — Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {farmer ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-green-700 font-medium hover:text-green-800 transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  {farmer.fullName.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-green-700 font-medium hover:text-green-800 transition-colors">Login</Link>
                <Link to="/register" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-600">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-green-100 flex flex-col gap-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-700 font-medium py-1">Home</Link>
            <Link to="/weather" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-700 font-medium py-1">Weather</Link>
            <Link to="/chat" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-700 font-medium py-1">AI Chat</Link>
            <Link to="/crops" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-700 font-medium py-1">Crops</Link>
            <Link to="/advice" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-green-700 font-medium py-1">Advice</Link>
            <div className="flex gap-3 pt-2">
              {farmer ? (
                <>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-green-700 font-medium">Dashboard</Link>
                  <button onClick={handleLogout} className="text-red-600 font-medium">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-green-700 font-medium">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">Get Started</Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}