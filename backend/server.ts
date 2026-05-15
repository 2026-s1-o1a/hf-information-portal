import app from './src/app.js'
import { disconnectDB } from './src/config/db.js'

const port = 3000

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

// Handle unhandled promise rejections
process.on('unhandledRejection', async err => {
  console.error('Unhandled Rejection:', err)

  server.close(async () => {
    await disconnectDB()
    process.exit(1)
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', async err => {
  console.error('Uncaught Exception:', err)

  server.close(async () => {
    await disconnectDB()
    process.exit(1)
  })
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Shutting down gracefully.')

  server.close(async () => {
    await disconnectDB()
    process.exit(0)
  })
})