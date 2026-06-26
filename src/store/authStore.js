import { create } from 'zustand'

const useAuthStore = create((set) => ({
  farmer: JSON.parse(localStorage.getItem('farmer')) || null,
  token: localStorage.getItem('token') || null,

  login: (farmer, token) => {
    localStorage.setItem('farmer', JSON.stringify(farmer))
    localStorage.setItem('token', token)
    set({ farmer, token })
  },

  logout: () => {
    localStorage.removeItem('farmer')
    localStorage.removeItem('token')
    set({ farmer: null, token: null })
  }
}))

export default useAuthStore