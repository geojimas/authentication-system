// Libraries
import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
// Models
import { User } from '../models/User'
// Validation
import { userData } from '../validation/validation'
// Middlewares
import { createToken, maxAge } from '../middleware/createToken'
// Interfaces
import { UserInterface } from '../types/UserInterface'
// Error Handler
import { BadRequest, Conflict, NotFound } from '../utils/error'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'

// Only auth Users can access this page
export const authPage = (_req: Request, res: Response): object => {
  return res.status(StatusCodes.OK).json({
    message: 'You are successfully Authenticated! , Only Auth Users watch this!',
  })
}

// Sign up Page
export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation User Input
    const { error } = userData.validate(req.body)
    if (error) throw new BadRequest(error.details[0].message)

    // read from body
    const { name, email, password } = req.body

    // check if user already exist
    const oldUser: UserInterface | null = await User.findOne({ email })

    if (oldUser) {
      throw new Conflict('This Email is already in used...')
    } else {
      // encrypt the password
      const salt: string = await bcrypt.genSalt(10)
      const encryptedPassword: string = await bcrypt.hash(password, salt)

      // create user
      const user: UserInterface = await User.create({
        name: name,
        email: email.toLowerCase(),
        password: encryptedPassword,
      })

      // Create the Token
      const token: string = createToken(user._id)
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: maxAge * 1000,
      })

      // Save the User
      await user.save()

      // Response
      return res.status(StatusCodes.CREATED).json({
        message: `User with Name '${req.body.name}' Created Successfully !`,
        user: user,
        token: token,
      })
    }
  } catch (error) {
    return next(error)
  }
}

// Login Page
export const logIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check if user already exists
    const user: UserInterface | null = await User.findOne({ email: req.body.email })
    if (!user) throw new NotFound("This User doesn't exist...")

    // Compare the passwords
    const password: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!password) throw new BadRequest('Invalid email or password...')

    // Create Token
    const token = createToken(user._id)
    res.cookie('access_token', token, { httpOnly: true, maxAge: maxAge * 1000 })

    // Response
    return res.status(StatusCodes.OK).json({
      message: `Welcome ${user.name} !`,
      User: user,
      Token: token,
    })
  } catch (error) {
    return next(error)
  }
}

// Logout User
export const logout = (_req: Request, res: Response, _next: NextFunction) => {
  return res.clearCookie('access_token').status(StatusCodes.OK).json({
    status: res.status,
    message: 'Successfully Log Out',
  })
}
