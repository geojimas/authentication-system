import { Document, ObjectId } from 'mongoose'

export interface tokenInterface extends Document {
  _id: ObjectId
}
