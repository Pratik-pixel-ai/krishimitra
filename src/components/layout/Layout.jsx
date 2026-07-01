import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import useThemeStore from '../../store/themeStore'

export default function Layout() {
  const { isDarkMode } = useThemeStore()

  return (
    <div className={`min-h-screen transition-colors duration-500 nature-canvas leaf-pattern ${isDarkMode ? 'dark' : ''}`}>
      {/* floating ambient blobs */}
      <div className="km-blob w-[420px] h-[420px] bg-green-300/40 -top-32 -left-24" />
      <div className="km-blob w-[360px] h-[360px] bg-amber-200/40 top-1/3 -right-20" style={{ animationDelay: '4s' }} />
      <div className="km-blob w-[300px] h-[300px] bg-emerald-200/40 bottom-0 left-1/4" style={{ animationDelay: '8s' }} />

      <Navbar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  )
}
