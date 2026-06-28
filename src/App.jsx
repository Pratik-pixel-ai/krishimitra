import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Weather from './pages/Weather'
import Crops from './pages/Crops'
import Advice from './pages/Advice'
import Dashboard from './pages/Dashboard'
import useAuthStore from './store/authStore'

function ProtectedRoute({ children }) {
  const { token } = useAuthStore()
  return token ? children : <Navigate to="/login" replace />
}

function GuestRoute({ children }) {
  const { token } = useAuthStore()
  return !token ? children : <Navigate to="/dashboard" replace />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<GuestRoute><Register /></GuestRoute>} />
          <Route path="login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="weather" element={<Weather />} />
          <Route path="crops" element={<Crops />} />
          <Route path="advice" element={<Advice />} />
          <Route path="chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
          <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App