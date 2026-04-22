import bcrypt from 'bcryptjs';
import { userExists, createUser, getHashedPasswordByEmail, getUserByEmail } from '../models/userModel.js'
import { generateToken } from '../utils/generateToken.js'


// Create user and user credential
const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Simple Validation
  if (!firstName || !lastName || !email || !password) {
  return res.status(400).json({
    error: "INVALID_INPUT",
    message: "All fields are required"
  });
}

  try {
    // Check if user exists
    const user = await userExists(email);

    if (user) {
      return res.status(409).json({
        error: "USER_ALREADY_EXISTS",
        message: "An account with this email already exists."
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Prepare user data
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      hashedPassword: hashedPassword
    };

    // Create the user and return userId
    const userId = await createUser(userData);

    // Generate JWT Token
    const token = generateToken(userId, res)

    // Return successful response
    return res.status(201).json({
      success: true,
      data: {
        user: {
          id: userId,
          email: email,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Sign-up error:", error);
    
    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Something went wrong"
    });
  }
};

// Handle user sign-in and return a JWT token
const signin = async (req, res) => {
  const { email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({
      error: "MISSING_CREDENTIALS",
      message: "Email and password are required",
    });
  }

  try {
    // Check if user exists
    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, await getHashedPasswordByEmail(email));

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      });
    }

    // Generate JWT Token
    const token = generateToken(user.userId, res)

    // Return successful response
    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user.userId,
          email: user.email,
        },
        token,
      },
    });

  } catch (error) {
    console.error("Sign-in error:", error);

    return res.status(500).json({
      error: "SERVER_ERROR",
      message: "Something went wrong",
    });
  }
};

// Handle sign-out by removing JWT token
const signout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    success: true,
  });
};

// Return user data via authenticateToken.js
const getUser = (req, res) => {
  res.json({ firstName: req.user.firstName, lastName: req.user.lastName });
};

export { signup, signin, signout, getUser };