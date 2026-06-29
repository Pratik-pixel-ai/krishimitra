import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import useThemeStore from '../../store/themeStore'

export default function Layout() {
  const { isDarkMode } = useThemeStore()

  return (
    <div className={`min-h-screen transition-colors ${isDarkMode ? 'bg-gray-950' : 'bg-[#f9f6f0]'}`}>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
