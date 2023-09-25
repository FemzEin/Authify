import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from '../controllers/userController.js';

// Import the 'protect' middleware for route protection
import { protect } from '../middleware/authMiddleware.js';

// Create an Express router
const router = express.Router();

// Route for user registration
router.post('/', registerUser);

// Route for user authentication
router.post('/auth', authUser);

// Route for user logout
router.post('/logout', logoutUser);

// Routes for user profile management, protected by the 'protect' middleware
router
  .route('/profile')
  .get(protect, getUserProfile) // Get user profile
  .put(protect, updateUserProfile); // Update user profile

// Export the router to make these routes available for use in the application
export default router;
