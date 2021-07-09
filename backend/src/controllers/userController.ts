import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { UserValidInfo } from '../validation/validation'
import { createToken, maxAge } from '../middleware/createToken'

export const authPage = async (_req: Request, res: Response) => {
  res.status(200).json({
    message: 'Only Auth Users watch this',
  })
}

export const signUp = async (req: Request, res: Response): Promise<object> => {
  // Validation User Input
  const { error } = UserValidInfo.validate(req.body)
  if (error) return res.status(400).json({ message: error.details[0].message })

  // read from body
  const { name, email, password } = req.body

  try {
    // create user
    const user = await User.create({ name, email, password })

    // Create Token
    const token = createToken(user._id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

    // encrypt the password
    const salt: string = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    return res.status(200).json({
      message: `User with Name '${req.body.name}' Created Successfully !`,
      user: user,
      token: token,
    })
  } catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

export const logIn = async (req: Request, res: Response): Promise<object> => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(404).json({ message: 'User not found...' })

    const password: boolean = await bcrypt.compare(req.body.password, user.password)
    if (!password) return res.status(400).json({ message: 'Invalid email or password...' })

    // Create Token
    const token = createToken(user._id)
    res.cookie('access_token', token, { httpOnly: true, maxAge: maxAge * 1000 })

    return res.status(200).json({
      message: `Welcome Back ${user.name} !`,
      User: user,
      Token: token,
    })
  } catch (error) {
    return res.status(500).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
}

export const logOut = (_req: Request, res: Response): object => {
  return res.clearCookie('access_token').status(200).json({
    status: res.status,
    message: 'Successfully Log Out',
  })
}
