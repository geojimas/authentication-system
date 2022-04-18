import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 1000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json'},
})

export { client }
