import sql from 'mssql/msnodesqlv8.js'
import { connectDB } from '../config/db.js'

// Return true or false based on user existing
const userExists = async email => {
  try {
    // Connect to the database
    const pool = await connectDB()

    // Create a request object
    const request = pool.request()

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email)

    // Query the database to check if user exists
    console.log(email)
    const result = await request.query(`SELECT 1 FROM Users WHERE email = @Email`)

    // Return true if user exists, otherwise false
    return result.recordset.length > 0
  } catch (error) {
    console.error('Error checking user existence:', error)
    throw error
  }
}

// Return user id by email
const getUserIdByEmail = async email => {
  try {
    // Connect to the database
    const pool = await connectDB()

    // Create a request object
    const request = pool.request()

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email)

    // Query the database to get user id by email
    const result = await request.query(`SELECT userId FROM Users WHERE email = @Email`)

    // Check if the user exists, and return the user id if found
    if (result.recordset.length === 0) {
      throw new Error('User not found')
    }

    // Return userId
    return result.recordset[0].userId
  } catch (error) {
    console.error('Error getting userId by email:', error)
    throw error
  }
}

// Create user and returns user id
const createUser = async userData => {
  const {
    email,
    firstName,
    lastName,
    hashedPassword,
    role,
    requestedRole,
    verificationStatus,
    verificationData,
  } = userData

  if (
    !firstName ||
    !lastName ||
    !email ||
    !hashedPassword ||
    !role ||
    !requestedRole ||
    !verificationStatus
  ) {
    throw new Error('Missing required user fields')
  }

  let transaction

  try {
    // Connect to the database
    const pool = await connectDB()

    transaction = new sql.Transaction(pool)
    await transaction.begin()

    // Create a request object
    const request = new sql.Request(transaction)

    // Add the parameters to the request object
    request.input('Email', sql.VarChar, email)
    request.input('FirstName', sql.VarChar, firstName)
    request.input('LastName', sql.VarChar, lastName)
    request.input('Role', sql.VarChar, role)
    request.input('RequestedRole', sql.VarChar, requestedRole)
    request.input('VerificationStatus', sql.VarChar, verificationStatus)
    request.input('VerificationData', sql.NVarChar(sql.MAX), JSON.stringify(verificationData || {}))

    // Query the database to insert user by firstname, lastname, and email
    const result = await request.query(`
  INSERT INTO Users (
    email,
    firstName,
    lastName,
    role,
    requestedRole,
    verificationStatus,
    verificationData
  )
  OUTPUT INSERTED.userId
  VALUES (
    @Email,
    @FirstName,
    @LastName,
    @Role,
    @RequestedRole,
    @VerificationStatus,
    @VerificationData
  )
`)
    const userId = result.recordset[0].userId

    // Call createUserCredentials() to create user credentials for the user
    await createUserCredentials(userId, hashedPassword, transaction)

    await transaction.commit()

    return userId
  } catch (error) {
    // if (transaction && !transaction._aborted) {
    //   await transaction.rollback()
    // }
    console.error('Error creating user:', error)
    throw error
  }
}

// Create user credentials
const createUserCredentials = async (userId, hashedPassword, transaction) => {
  try {
    // Check if there is a transaction
    if (!transaction) {
      throw new Error('Transaction is required for createUserCredentials')
    }
    // Create a request object
    const request = new sql.Request(transaction)

    // Add the parameters to the request object
    request.input('UserId', sql.UniqueIdentifier, userId)
    request.input('HashedPassword', sql.VarChar, hashedPassword)

    // Query the database to insert user credentials by user id and hashed password
    await request.query(
      `INSERT INTO UserCredentials (userId, hashedPassword) VALUES (@UserId, @HashedPassword)`
    ) // NEED TO CHANGE
  } catch (error) {
    console.error('Error creating user credentials:', error)
    throw error
  }
}

// Return hashed password by email
const getHashedPasswordByEmail = async email => {
  try {
    // Get user id by email
    const userId = await getUserIdByEmail(email)

    // Check if user exists
    if (!userId) {
      throw new Error('User not found')
    }

    // Connect to the database
    const pool = await connectDB()

    // Create a request object
    const request = pool.request()

    // Add the parameter to the request object
    request.input('UserId', sql.UniqueIdentifier, userId)

    // Query the database to get hashed password by email
    const result = await request.query(
      `SELECT hashedPassword FROM UserCredentials WHERE userId = @UserId`
    )

    // Check if the user credentials exists, and return the hashed password if found
    if (result.recordset.length === 0) {
      throw new Error('User credentials not found')
    }

    // Return hashedPassword
    return result.recordset[0].hashedPassword
  } catch (error) {
    console.error('Error getting password hash by email:', error)
    throw error
  }
}

// Return user by id
const getUserById = async userId => {
  try {
    // Connect to the database
    const pool = await connectDB()

    // Create a request object
    const request = pool.request()

    // Add the parameter to the request object
    request.input('UserId', sql.UniqueIdentifier, userId)

    // Query the database to get the user
    const result = await request.query(`SELECT * FROM Users WHERE userId = @UserId`)

    // Check if the user exists, and return the user details
    if (result.recordset.length === 0) {
      throw new Error('User credentials not found')
    }

    // Return user
    return result.recordset[0]
  } catch (error) {
    console.error('Error getting user by id:', error)
    throw error
  }
}

// USER ROLES WILL BE SELECTED WITH CHECKBOXES
// CHECKBOXES WILL APPEAR ON NEW PAGE AFTER SIGN up
// USER COMPLETES SIGN UP PAGE -> NAVIGATED TO NEXT PAGE WHERE THEY SELECT DESIRED ROLES
const addUserRoles = async (userId, roleIds) => {
  try {
    // Connect to the database
    const pool = await connectDB()

    // Ensure roleIds is an array
    const roles = Array.isArray(roleIds) ? roleIds : [roleIds]

    // Start a transaction for multiple inserts
    const transaction = new sql.Transaction(pool)
    await transaction.begin()

    try {
      for (const roleId of roles) {
        const insertRequest = new sql.Request(transaction)
        insertRequest.input('userId', sql.UniqueIdentifier, userId)
        insertRequest.input('roleId', sql.Int, roleId)

        // Check if already exists (optional)
        const checkRequest = new sql.Request(transaction)
        checkRequest.input('userId', sql.UniqueIdentifier, userId)
        checkRequest.input('roleId', sql.Int, roleId)

        const checkResult = await checkRequest.query(`
          SELECT * FROM UsersRoles 
          WHERE userId = @userId AND roleId = @roleId
        `)

        if (checkResult.recordset.length === 0) {
          await insertRequest.query(`
            INSERT INTO UsersRoles (userId, roleId) 
            VALUES (@userId, @roleId)
          `)
        }
      }

      await transaction.commit()

      return {
        success: true,
        message: `${roles.length} role(s) assigned successfully`,
      }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  } catch (error) {
    console.error('Error adding user roles:', error)
    throw error
  }
}

// Return user by email
const getUserByEmail = async email => {
  try {
    // Connect to the database
    const pool = await connectDB()

    // Create a request object
    const request = pool.request()

    // Add the parameter to the request object
    request.input('Email', sql.VarChar, email)

    // Query the database to get user id by email
    const result = await request.query(`SELECT * FROM Users WHERE email = @Email`)

    // Check if the user exists, and return the user id if found
    if (result.recordset.length === 0) {
      return null
    }

    // Return user
    return result.recordset[0]
  } catch (error) {
    console.error('Error getting user by email:', error)
    throw error
  }
}

export { userExists, createUser, getHashedPasswordByEmail, getUserById, getUserByEmail }
