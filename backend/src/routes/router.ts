// Libraries
import express from 'express'
// Middlewares
import { isAuth } from '../middleware/isAuth'
// Controllers
import { authPage, logIn, logout, signUp } from '../controllers/userController'
import { StatusCodes } from 'http-status-codes'

export const router = express.Router()

// Public Routes
router.post('/register', signUp)
router.post('/login', logIn)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuth, authPage)

// Catch all route
router.get('*', (req, res) => {
  // Response
  return res.status(StatusCodes.NOT_FOUND).json({
    message: `Requested URL '${req.path}' not founded !`,
    solution: 'Please navigate to /api/dashboard'
  })
})
