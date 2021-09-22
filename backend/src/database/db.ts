import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('MongoDB connected Successfully!')
    console.log(`Host: ${conn.connection.host}`)
  } catch (error) {
    process.exit(1)
  }
}
