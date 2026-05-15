import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5174',
    credentials: true,
  })
)

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)

export default app