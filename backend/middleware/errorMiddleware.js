// Middleware for handling 404 Not Found errors
const notFound = (req, res, next) => {
  // Create a new Error with a message indicating the requested URL
  const error = new Error(`Not Found - ${req.originalUrl}`);
  
  // Set the response status to 404 (Not Found) and pass the error to the next middleware
  res.status(404);
  next(error);
};

// Middleware for handling various types of errors and providing appropriate responses
const errorHandler = (err, req, res, next) => {
  // Determine the HTTP status code for the response, defaulting to 500 (Internal Server Error)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
  // Get the error message from the 'err' object
  let message = err.message;

  // If the error is a Mongoose CastError with kind 'ObjectId', treat it as a 404 (Resource not found) error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Send a JSON response with the determined status code and error message
  res.status(statusCode).json({
    message: message,
    
    // In production mode, do not include the error stack trace for security reasons
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// Export the 'notFound' and 'errorHandler' middleware functions for use in other parts of the application
export { notFound, errorHandler };
