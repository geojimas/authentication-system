// Libraries
import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

// Error handler
import { Authorized, BadRequest } from '../utils/error'

// Check the user if is Authenticated
export const isAuth = (req: any, _res: Response, next: NextFunction): void => {
  // take the jwt cookie from headers
  const authHeader: string | undefined = req.headers['cookie']

  // if token exists then split
  const token = authHeader ? authHeader && authHeader.split('=')[1] : ''
  if (!token) throw new Authorized('Access denied. Not authorized...')

  try {
    const jwtSecretKey: string = process.env.SECRET_KEY ? process.env.SECRET_KEY : ''
    const decoded = jwt.verify(token, jwtSecretKey)
    req.user = decoded

    return next()
  } catch (error) {
    next(error)
    if (error.message === 'jwt expired') {
      throw new BadRequest('jwt token has expired..')
    } else {
      throw new Authorized('Invalid auth token...')
    }
  }
}
