// Libraries
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export const maxAge: number = 3 * 24 * 60 * 60 // 3 days

export const createToken = (id: mongoose.Types.ObjectId): string => {
  const jwtSecretKey: string = process.env.SECRET_KEY as string || ''
  return jwt.sign({ id }, jwtSecretKey, { algorithm: 'HS256', expiresIn: maxAge })
}