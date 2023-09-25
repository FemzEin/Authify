import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// Middleware for protecting routes by verifying JWT tokens
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Retrieve the JWT token from the request's cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify and decode the JWT token using the secret from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user associated with the decoded user ID and exclude their password
      req.user = await User.findById(decoded.userId).select('-password');

      // Move to the next middleware or route handler
      next();
    } catch (error) {
      // If token verification fails, log the error, return a 401 status, and throw an error
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    // If there is no token in the request, return a 401 status and throw an error
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Export the 'protect' middleware for use in other parts of the application
export { protect };
