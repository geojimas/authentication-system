// Libraries
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

export const maxAge: number = 3 * 24 * 60 * 60 // 3 days

export const createToken = (id: mongoose.Types.ObjectId): string => {
  const jwtSecretKey: string = process.env.SECRET_KEY || ''
  return jwt.sign({ id }, jwtSecretKey, { algorithm: 'HS256', expiresIn: maxAge })
}
