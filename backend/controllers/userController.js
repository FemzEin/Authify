import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// Authentication endpoint for users
// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  // Extract email and password from the request body
  const { email, password } = req.body;

  // Find a user with the provided email
  const user = await User.findOne({ email });

  // Check if the user exists and the password matches
  if (user && (await user.matchPassword(password))) {
    // Generate a token for the user and send it in the response
    generateToken(res, user._id);

    // Respond with user information, excluding the password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If authentication fails, return an error response
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// User registration endpoint
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  // Extract name, email, and password from the request body
  const { name, email, password } = req.body;

  // Check if a user with the provided email already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    // Return an error if the user already exists
    res.status(400);
    throw new Error('User already exists');
  }

  // Create a new user with the provided information
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // Generate a token for the newly registered user and send it in the response
    generateToken(res, user._id);

    // Respond with user information, excluding the password
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // If user creation fails, return an error response
    res.status(400);
    throw Error('Invalid user data');
  }
});

// User logout endpoint
// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  // Clear the JWT cookie to log the user out
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

// User profile retrieval endpoint
// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Find the user's profile based on the user ID
  const user = await User.findById(req.user._id);

  if (user) {
    // Respond with the user's profile information, excluding the password
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    // Return an error if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// User profile update endpoint
// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  // Find the user's profile based on the user ID
  const user = await User.findById(req.user._id);

  if (user) {
    // Update user information based on the request data
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user information
    const updatedUser = await user.save();

    // Respond with the updated user information, excluding the password
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    // Return an error if the user is not found
    res.status(404);
    throw new Error('User not found');
  }
});

// Export the defined functions for use in other parts of the application
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
