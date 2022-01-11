import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import console from 'console'
dotenv.config()

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log(`Host: ${conn.connection.host}`)
    console.log(`Name: ${conn.connection.name}`)
    console.log(`Port: ${conn.connection.port}`)
    console.log('-----------------------------')
    console.log('MongoDB connected Successfully!')
    
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
