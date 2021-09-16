import { NextFunction, Request, Response } from 'express'
import { GeneralError } from '../utils/error'

export const handleErrors = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof GeneralError) {
    return res.status(error.getCode()).json({
      status: res.statusCode,
      error: error,
      message: error.message,
    })
  }
  return res.status(500).json({
    status: res.statusCode,
    error: error,
    message: error.message,
  })
}
