import jwt from 'jsonwebtoken'

export const maxAge = 3 * 24 * 60 * 60

export const createToken = (id: any) => {
  const jwtSecretKey: string = process.env.JWT_TOKEN || ''
  return jwt.sign({ id }, jwtSecretKey, { algorithm: 'HS256', expiresIn: maxAge })
}
