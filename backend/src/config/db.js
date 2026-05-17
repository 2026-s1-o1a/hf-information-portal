import sql from 'mssql/msnodesqlv8.js';
import dotenv from 'dotenv';


// Database configuration
dotenv.config();

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
  driver: process.env.DB_DRIVER,
};

let pool;

// Connnect the pool
const connectDB = async () => {
  try {
    pool = await sql.connect(config);
    console.log('Connected to SQL Server');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw new Error('Database connection failed');
  }
};

// Close the pool
const disconnectDB = async () => {
  try {
    if (pool) {
      await pool.close();
      console.log('Disconnected from SQL Server');
    }
  } catch (error) {
    console.error('Error closing the database connection:', error.message);
  }
};

export { connectDB, disconnectDB };

