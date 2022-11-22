import axios from 'axios'
import * as dotenv from 'dotenv'
dotenv.config()

export const BASE_API_URLS = [
  { name: 'Localhost', endpoint: 'http://localhost:5000/api' },
  { name: 'Production', endpoint: 'https://climax245.up.railway.app/api' }
]

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'Localhost' ? BASE_API_URLS[0].endpoint : BASE_API_URLS[1].endpoint,
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
