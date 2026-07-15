const BASE_URL = 'https://krishimitra-backend-5dw1.onrender.com/api'

const handleResponse = async (res) => {
  const text = await res.text()
  let data = {}
  try {
    data = text ? JSON.parse(text) : {}
  } catch {
    data = { message: text || 'Something went wrong' }
  }
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
})

export const authService = {
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return handleResponse(res)
  }
}

export const aiService = {
  chat: async (message) => {
    const res = await fetch(`${BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ message })
    })
    return handleResponse(res)
  }
}

export const diagnosisService = {
  diagnose: async (imageFile, cropName) => {
    const formData = new FormData()
    formData.append('image', imageFile)
    if (cropName) formData.append('cropName', cropName)

    const res = await fetch(`${BASE_URL}/ai/diagnose`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: formData
    })
    return handleResponse(res)
  },

  getHistory: async () => {
    const res = await fetch(`${BASE_URL}/ai/diagnose/history`, {
      method: 'GET',
      headers: authHeaders()
    })
    return handleResponse(res)
  }
}

// Default axios-style api object (used by FarmProfile.jsx)
const api = {
  get: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'GET',
      headers: authHeaders()
    })
    const data = await handleResponse(res)
    return { data }
  },

  post: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(body)
    })
    const data = await handleResponse(res)
    return { data }
  },

  put: async (path, body) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(body)
    })
    const data = await handleResponse(res)
    return { data }
  },

  delete: async (path) => {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    const data = await handleResponse(res)
    return { data }
  }
}

export default api
