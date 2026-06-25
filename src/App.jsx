import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Weather from './pages/Weather'
import Crops from './pages/Crops'
import Advice from './pages/Advice'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="chat" element={<Chat />} />
          <Route path="weather" element={<Weather />} />
          <Route path="crops" element={<Crops />} />
          <Route path="advice" element={<Advice />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App