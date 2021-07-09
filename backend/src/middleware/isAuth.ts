
import jwt from 'jsonwebtoken'
import { NextFunction, Response } from 'express'
import { IGetUserAuthInfoRequest } from 'src/types/UserInfoInterface'

export const isAuth = (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers['cookie']
  // let token : string = ''
  // if (authHeader) token  = authHeader.slice(7)
  const token = authHeader && authHeader.split('=')[1]

  if (!token) return res.status(401).json({ message: 'Access denied. Not authorized...' })

  try {
    const jwtSecretKey: string = process.env.JWT_TOKEN || ''
    const decoded = jwt.verify(token, jwtSecretKey)
    req.user = decoded // IGetUserAuthInfoRequest Interface
    return next()

  } catch (error) {
    console.log(error)
    if (error.message === 'jwt expired') {
      return res.status(400).json({ message: 'jwt token has expired.' })
    } else {
      return res.status(400).json({ message: 'Invalid auth token...' })
    }
  }
}