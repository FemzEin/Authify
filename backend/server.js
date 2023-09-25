// Import necessary modules and libraries
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';

// Load environment variables from a .env file
dotenv.config();

// Import the 'connectDB' function to establish a database connection
import connectDB from './config/db.js';

// Import 'cookieParser' and custom error handling middleware
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Import user-related routes
import userRoutes from './routes/userRoutes.js';

// Define the port for the server, defaulting to 4000
const port = process.env.PORT || 4000;

// Establish a connection to the database
connectDB();

// Create an Express application
const app = express();

// Enable parsing of JSON requests
app.use(express.json());

// Enable parsing of URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Enable parsing of cookies using 'cookieParser'
app.use(cookieParser());

// Define routes related to users
app.use('/api/users', userRoutes);

// Serve static files and the main application page in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')
  );
} else {
  // In development, provide a simple response for the root URL
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Use the 'notFound' and 'errorHandler' middleware for handling errors
app.use(notFound);
app.use(errorHandler);

// Start the server and listen on the defined port
app.listen(port, () => console.log(`Server started on port ${port}`));
