// Libraries
import express from 'express'
// Middlewares
import { isAuth } from '../middleware/isAuth'
// Controllers
import { authPage, logIn, logout, signUp } from '../controllers/userController'

export const router = express.Router()

// Public Routes
router.post('/register', signUp)
router.post('/login', logIn)

// Protected Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuth, authPage)

