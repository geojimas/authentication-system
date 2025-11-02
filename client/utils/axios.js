import axios from 'axios'

export const BASE_API_URLS = [
  { name: 'Development', endpoint: 'http://localhost:5000/api' },
  { name: 'Production', endpoint: 'https://authentication-system-yopy.onrender.com/api' }
]

const api = axios.create({
  baseURL: BASE_API_URLS[1].endpoint,
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
