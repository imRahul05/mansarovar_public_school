import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { generateCustomID } from '../utils/generateCustomID.js';
import { getMe, loginUser, logoutUser, registerSuperAdmin, registerUser } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/setup-superadmin', registerSuperAdmin);

authRouter.post('/register', protect, authorizeRoles('admin', 'superadmin'), registerUser);


authRouter.post('/login',loginUser );


authRouter.post('/logout',logoutUser );


authRouter.get('/me', protect, getMe);


authRouter.put('/profile', protect, async (req, res) => {
  try {
    const { name, email, contactNumber, address, profilePicture } = req.body;
    
    // Find user
    const user = await User.findById(req.user._id);
    
    // Update fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (contactNumber) user.contactNumber = contactNumber;
    if (address) user.address = address;
    if (profilePicture) user.profilePicture = profilePicture;
    
    // Save updated user
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        _id: user._id,
        customID: user.customID,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
        contactNumber: user.contactNumber,
        address: user.address
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

authRouter.put('/password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Find user
    const user = await User.findById(req.user._id);
    
    // Check if current password matches
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }
    
    // Update password
    user.password = newPassword; // will be hashed by pre-save hook
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


authRouter.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No user found with this email'
      });
    }
    
    // Generate reset token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_RESET_SECRET || 'reset-secret-key',
      { expiresIn: '1h' }
    );
    
    // Store reset token in user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
    
    // In a real application, send email with reset link
    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    res.status(200).json({
      success: true,
      message: 'Password reset link sent to email',
      resetUrl // Only for development purposes
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

authRouter.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_RESET_SECRET || 'reset-secret-key'
    );
    
    // Find user with token
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    // Check if user exists and token is valid
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }
    
    // Update password
    user.password = newPassword; // will be hashed by pre-save hook
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password reset successful'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Invalid or expired reset token',
      error: error.message
    });
  }
});

export default authRouter;
