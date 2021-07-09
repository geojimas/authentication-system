import express from 'express'
import { isAuth } from '../middleware/isAuth'
import { authPage, logIn, logOut, signUp } from '../controllers/userController'
export const router = express.Router()

router.post('/register', signUp)

router.post('/login', logIn)

router.get('/logout', isAuth, logOut)

router.get('/dashboard', isAuth, authPage)
