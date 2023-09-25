// Import the 'mongoose' library to interact with MongoDB.
import mongoose from 'mongoose';

// Define an asynchronous function named 'connectDB' for connecting to the database.
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB database using the provided URI in the environment variables.
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If the connection is successful, log a success message with the host information.
    console.log(`MongoDB Successfully Connected @: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during the connection attempt, log the error message.
    console.error(`Error: ${error.message}`);
    
    // Terminate the application with an exit code of 1 to indicate an error.
    process.exit(1);
  }
};

// Export the 'connectDB' function to make it available for use in other parts of the application.
export default connectDB;
