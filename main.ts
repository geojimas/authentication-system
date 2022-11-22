// Libraries
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { json } from 'body-parser'
import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

//Error handler
import { handleErrors } from './middleware/errorHandler'
// Database
import { connectDB } from './database/db'
// Router
import { router } from './routes/router'

const app: Application = express()

// Middlewares
app.use(
  cors({
    credentials: true,
    // frontend URL's
    origin: ['http://localhost:3000']
  })
)

app.use(helmet())
app.use(json())
app.use(express.urlencoded({ extended: true }))
// api prefix
app.use('/api', router)
app.use(handleErrors)

if (!parseInt(process.env.PORT as string)) {
  process.exit(1)
}

/*ENABLE THIS FOR DEPLOYMENT */

app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

// call and connect to Database
connectDB()

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
  console.log('-----------------------------')
  console.log(`server start running at port ${process.env.PORT}`)
  if (process.env.NODE_ENV === 'Localhost')
    console.log(`Server is Live here -> http://localhost:${process.env.PORT}`)
  else console.log(`Server is Live in production URL`)
})
