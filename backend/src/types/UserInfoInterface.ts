import { Request } from 'express'

export interface IGetUserAuthInfoRequest extends Request {
  user: object | string
}
