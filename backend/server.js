import express from 'express'
import sql from 'mssql/msnodesqlv8.js';
import { connectDB, disconnectDB } from './src/config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Import Routes
import authRoutes from './src/routes/authRoutes.js'

// Load environment
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies to be sent and received
}));

// Enable parsing of cookies for incoming requests, making cookies available in req.cookies
app.use(cookieParser());

// Start express server and listen for requests on the specified port
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// Enable parsing of incoming JSON request bodies and URL-encoded request bodies (form submission)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", authRoutes);

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exceptionn:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.error("SIGTERM recieved, shutting down gracefully:");
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
