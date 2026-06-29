import { create } from 'zustand'

const useThemeStore = create((set) => ({
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  setDarkMode: (isDark) => set({ isDarkMode: isDark })
}))

export default useThemeStore
