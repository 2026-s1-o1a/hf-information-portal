import bcrypt from 'bcryptjs'

import {
  userExists,
  createUser,
  getHashedPasswordByEmail,
  getUserByEmail,
  getUserRoles,
  createRoleApplication,
  getPendingVerificationRequests,
  getPendingVerificationRequestsByUserId,
  approveRoleApplication,
  rejectRoleApplication,
} from '../models/userModel.js'

import { generateToken } from '../utils/generateToken.js'

// Create normal patient account
const signup = async (req, res) => {
  const { email, firstName, lastName, password } = req.body

  // Simple validation
  if (!email || !firstName || !lastName || !password) {
    return res.status(400).json({
      error: 'INVALID_INPUT',
      message: 'All fields are required',
    })
  }

  try {
    // Check if user exists
    const existingUser = await userExists(email)

    if (existingUser) {
      return res.status(409).json({
        error: 'USER_ALREADY_EXISTS',
        message: 'An account with this email already exists.',
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, salt)

    // Prepare user data
    const userData = {
      email,
      firstName,
      lastName,
      hashedPassword,
    }

    // Create user
    const userId = await createUser(userData)

    // Generate JWT
    generateToken(userId, res)

    // Return response
    return res.status(201).json({
      success: true,

      user: {
        id: userId,
        email,
        firstName,
        lastName,
        roles: ['patient'],
      },
    })
  } catch (error) {
    console.error('Sign-up error:', error)

    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'Something went wrong',
    })
  }
}

// Handle sign-in
const signin = async (req, res) => {
  const { email, password } = req.body

  // Simple validation
  if (!email || !password) {
    return res.status(400).json({
      error: 'MISSING_CREDENTIALS',
      message: 'Email and password are required',
    })
  }

  try {
    // Check if user exists
    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, await getHashedPasswordByEmail(email))

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password',
      })
    }

    // Get all approved roles
    const roles = await getUserRoles(user.userId)

    // Generate JWT
    generateToken(user.userId, res)

    // Return successful response
    res.status(200).json({
      success: true,

      data: {
        user: {
          id: user.userId,

          email: user.email,

          firstName: user.firstName,
          lastName: user.lastName,

          roles,
        },
      },
    })
  } catch (error) {
    console.error('Sign-in error:', error)

    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: 'Something went wrong',
    })
  }
}

// Handle sign-out
const signout = async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).json({
    success: true,
  })
}

// Return authenticated user
const getUser = async (req, res) => {
  try {
    const roles = await getUserRoles(req.user.userId)

    const pendingRequests = await getPendingVerificationRequestsByUserId(req.user.userId)

    const pendingRoles = pendingRequests.map(request => request.requestedRole)

    res.json({
      id: req.user.userId,

      email: req.user.email,

      firstName: req.user.firstName,

      lastName: req.user.lastName,

      roles,

      pendingRoles,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Failed to load user',
    })
  }
}

// Apply for roles
const applyForRole = async (req, res) => {
  try {
    const { requestedRole, verificationData } = req.body

    if (!requestedRole) {
      return res.status(400).json({
        message: 'Requested role is required',
      })
    }

    await createRoleApplication(req.user.userId, requestedRole, verificationData)

    res.status(201).json({
      success: true,
      message: 'Role application submitted',
    })
  } catch (error) {
    console.error(error)

    return res.status(400).json({
      message: error.message,
    })
  }
}

// Return pending role applications
const getVerificationRequests = async (req, res) => {
  try {
    const requests = await getPendingVerificationRequests()

    const parsedRequests = requests.map(request => ({
      ...request,

      verificationData: JSON.parse(request.verificationData || '{}'),
    }))

    res.status(200).json(parsedRequests)
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch requests',
    })
  }
}

// Approve application
const approveRequest = async (req, res) => {
  try {
    const { applicationId } = req.body

    await approveRoleApplication(applicationId, req.user.userId)

    res.status(200).json({
      success: true,
      message: 'Application approved',
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}

// Reject application
const rejectRequest = async (req, res) => {
  try {
    const { applicationId } = req.body

    await rejectRoleApplication(applicationId, req.user.userId)

    res.status(200).json({
      success: true,
      message: 'Application rejected',
    })
  } catch (error) {
    console.error(error)

    res.status(400).json({
      message: error.message,
    })
  }
}

export {
  signup,
  signin,
  signout,
  getUser,
  applyForRole,
  getVerificationRequests,
  approveRequest,
  rejectRequest,
}
