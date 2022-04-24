import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
