import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Define the structure of the user schema
const userSchema = mongoose.Schema(
  {
    // User's name, which is required
    name: {
      type: String,
      required: true,
    },
    // User's email, which is required and must be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // User's password, which is required
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Enable timestamps to automatically track creation and update times
    timestamps: true,
  }
);

// Method to match user-entered password with the hashed password stored in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  // Use bcrypt to compare the entered password with the stored hashed password
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware for encrypting the user's password using bcrypt before saving to the database
userSchema.pre('save', async function (next) {
  // Check if the password has been modified; if not, move to the next middleware
  if (!this.isModified('password')) {
    next();
  }

  // Generate a salt and hash the password using bcrypt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Create a User model based on the user schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
export default User;
