import axios from 'axios'

export const BASE_API_URLS = [
  { name: 'Localhost', endpoint: 'http://localhost:5000/api' },
  { name: 'Production', endpoint: 'https://climax245.herokuapp.com/api' }
]

const api = axios.create({
  baseURL: BASE_API_URLS[0].endpoint,
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
