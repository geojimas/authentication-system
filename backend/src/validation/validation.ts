import Joi from 'joi'

//----User Validation-------------

export const UserValidInfo = Joi.object({
  name: Joi.string().min(3).max(200).required(),
  email: Joi.string().email().max(200).required(),
  password: Joi.string().min(6).pattern(new RegExp('^[a-z0-9]{6,25}$')),
})
