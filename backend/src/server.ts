// Libraries
import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { json } from 'body-parser'
//Error handler
import { handleErrors } from './middleware/errorHandler'
// Database
import { connectDB } from './database/db'
// Router
import { router } from './routes/router'

dotenv.config()

const app: Application = express()

// Middlewares
app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5000', 'http://localhost:8080'],
  })
)
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(handleErrors)

if (!process.env.PORT) {
  process.exit(1)
}

// call and connect to Database
connectDB()

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`server start running at port ${process.env.PORT}`)
  console.log(`Server is Live here -> http://localhost:${process.env.PORT}`)
})
