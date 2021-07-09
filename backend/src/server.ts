import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { connectDB } from './database/db'
import { json } from 'body-parser'
import { router } from './routes/router'
dotenv.config()

const app: Application = express()

// Middleware
app.use(helmet())
app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:8080', 'http://localhost:4200']
}))
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

if (!process.env.PORT) {
  process.exit(1)
}

// call and connect to DB
connectDB()

// Server Listening
app.listen(process.env.PORT || 5000, () => {
  console.log(`server start running at port ${process.env.PORT}`)
  console.log(`Server is Live here -> http://localhost:${process.env.PORT}`)
})