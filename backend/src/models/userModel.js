import sql from 'mssql/msnodesqlv8.js';
import { connectDB, disconnectDB } from '../config/db.js'


// Return true or false based on user existing
const userExists = async (email) => {
  try {
    // Connect to the database
    await connectDB();

    // Create a request object
    const request = new sql.Request();

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email);

    // Query the database to check if user exists
    const result = await request.query(`SELECT 1 FROM Users WHERE email = @Email`);

    // Return true if user exists, otherwise false
    return result.recordset.length > 0;

  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};

// Return user id by email
const getUserIdByEmail = async (email) => {
  try {
    // Connect to the database
    await connectDB();

    // Create a request object
    const request = new sql.Request();

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email);

    // Query the database to get user id by email
    const result = await request.query(`SELECT userId FROM Users WHERE email = @Email`);

    // Check if the user exists, and return the user id if found
    if (result.recordset.length === 0) {
      throw new Error('User not found');
    }

    // Return userId
    return result.recordset[0].userId;

  } catch (error) {
    console.error("Error getting userId by email:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};

// Create user and returns user id
const createUser = async (userData) => {
  const { firstName, lastName, email, hashedPassword } = userData;

  if (!firstName || !lastName || !email || !hashedPassword) {
    throw new Error("Missing required user fields");
  }

  let transaction;

  try {
    // Connect to the database
    await connectDB();

    // Ensures that both operations succeed or fail (Create User & Create User Credentials)
    transaction = new sql.Transaction();
    await transaction.begin();

    // Create a request object
    const request = new sql.Request(transaction);

    // Add the parameters to the request object
    request.input('FirstName', sql.VarChar, firstName);
    request.input('LastName', sql.VarChar, lastName);
    request.input('Email', sql.VarChar, email);

    // Query the database to insert user by firstname, lastname, and email
    const result = await request.query(`INSERT INTO Users (firstName, lastName, email) OUTPUT INSERTED.userId VALUES (@FirstName, @LastName, @Email)`);

    const userId = result.recordset[0].userId;

    // Call createUserCredentials() to create user credentials for the user
    await createUserCredentials(userId, hashedPassword, transaction)

    await transaction.commit();

    return userId;

  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Error creating user:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};


// Create user credentials
const createUserCredentials = async (userId, hashedPassword, transaction) => {
  try {

    // Check if there is a transaction
    if (!transaction) {
      throw new Error("Transaction is required for createUserCredentials");
    }
    // Create a request object
    const request = new sql.Request(transaction);

    // Add the parameters to the request object
    request.input('UserId', sql.UniqueIdentifier, userId);
    request.input('HashedPassword', sql.VarChar, hashedPassword);

    // Query the database to insert user credentials by user id and hashed password
    await request.query(`INSERT INTO UserCredentials (userId, hashedPassword) VALUES (@UserId, @HashedPassword)`); // NEED TO CHANGE

  } catch (error) {
    console.error("Error creating user credentials:", error);
    throw error;
  }
};


// Return hashed password by email
const getHashedPasswordByEmail = async (email) => {
  try {
    // Get user id by email
    const userId = await getUserIdByEmail(email);

    // Check if user exists
    if (!userId) {
      throw new Error('User not found');
    }

    // Connect to the database
    await connectDB();

    // Create a request object
    const request = new sql.Request();

    // Add the parameter to the request object
    request.input('UserId', sql.UniqueIdentifier, userId);

    // Query the database to get hashed password by email
    const result = await request.query(`SELECT hashedPassword FROM UserCredentials WHERE userId = @UserId`);

    // Check if the user credentials exists, and return the hashed password if found
    if (result.recordset.length === 0) {
      throw new Error('User credentials not found');
    }

    // Return hashedPassworrd
    return result.recordset[0].hashedPassword;

  } catch (error) {
    console.error("Error getting password hash by email:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};


// Return user by id
const getUserById = async (userId) => {
  try {
    // Connect to the database
    await connectDB();

    // Create a request object
    const request = new sql.Request();

    // Add the parameter to the request object
    request.input('UserId', sql.UniqueIdentifier, userId);

    // Query the database to get the user
    const result = await request.query(`SELECT * FROM Users WHERE userId = @UserId`);

    // Check if the user exists, and return the user details
    if (result.recordset.length === 0) {
      throw new Error('User credentials not found');
    }

    // Return user
    return result.recordset[0];

  } catch (error) {
    console.error("Error getting user by id:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};


// Return user by email
const getUserByEmail = async (email) => {
  try {
    // Connect to the database
    await connectDB();

    // Create a request object
    const request = new sql.Request();

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email);

    // Query the database to get user id by email
    const result = await request.query(`SELECT * FROM Users WHERE email = @Email`);

    // Check if the user exists, and return the user id if found
    if (result.recordset.length === 0) {
      return null;
    }

    // Return user
    return result.recordset[0];

  } catch (error) {
    console.error("Error getting user by email:", error);
    throw error;

  } finally {
    await disconnectDB();
  }
};

export { userExists, createUser, getHashedPasswordByEmail, getUserById, getUserByEmail }