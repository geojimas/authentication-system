import axios from 'axios'

const api = axios.create({
  baseURL: 'https://climax245.herokuapp.com/api',
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})

export { api }
