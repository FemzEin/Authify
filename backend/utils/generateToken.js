// Import the 'jsonwebtoken' library for generating JSON Web Tokens (JWTs)
import jwt from 'jsonwebtoken';

// Function for generating and setting a JWT token as a cookie in the response
const generateToken = (res, userId) => {
  // Generate a JWT token using the provided user ID and the secret from environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // Token expires in 15 days
  });

  // Set the JWT token as an HTTP-only cookie in the response
  res.cookie('jwt', token, {
    httpOnly: true, // Restricts JavaScript access to the cookie
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent Cross-Site Request Forgery (CSRF) attacks
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days expiration time in milliseconds
  });
};

// Export the 'generateToken' function to make it available for use in other parts of the application
export default generateToken;
