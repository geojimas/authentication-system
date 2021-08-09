import { model, Schema } from 'mongoose'
import { UserInterface } from 'src/types/UserInterface'

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model<UserInterface>('User', userSchema)

export default User
