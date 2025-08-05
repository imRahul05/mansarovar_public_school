import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import generateToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public



export const registerSuperAdmin=async (req, res) => {
  try {
    const existingSuperadmin = await User.findOne({ role: 'superadmin' });

    if (existingSuperadmin) {
      return res.status(403).json({
        success: false,
        message: 'Superadmin already exists. This route is disabled.',
      });
    }

    const { name, email, password, contactNumber, address } = req.body;

    // Generate unique custom ID before creating user
    let customID;
    try {
      customID = await generateCustomID('superadmin');
    } catch (error) {
      console.error('Error generating custom ID:', error);
      return res.status(500).json({
        success: false,
        message: 'Error generating unique ID for superadmin'
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: 'superadmin',
      customID,
      contactNumber,
      address,
      isVerified: true,
      isActive: true,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: 'Superadmin created successfully',
      data: {
        customID: user.customID,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user with role (default is 'student')
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student'
    });

    if (user) {
      // Generate token
      const token = generateToken(user._id);

      // Set cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Return user data
      return res.status(201).json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password is correct
    if (user && (await user.matchPassword(password))) {
      // Update last login time
      user.lastLogin = Date.now();
      await user.save();

      // Generate token
      const token = generateToken(user._id);

      // Set cookie
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });

      // Get additional user info based on role
      let additionalInfo = {};
      if (user.role === 'student') {
        const studentInfo = await Student.findOne({ user: user._id });
        if (studentInfo) {
          additionalInfo = {
            admissionNumber: studentInfo.admissionNumber,
            class: studentInfo.class,
            section: studentInfo.section
          };
        }
      } else if (user.role === 'teacher') {
        const teacherInfo = await Teacher.findOne({ user: user._id });
        if (teacherInfo) {
          additionalInfo = {
            employeeId: teacherInfo.employeeId,
            designation: teacherInfo.designation,
            classTeacherOf: teacherInfo.classTeacherOf
          };
        }
      }

      return res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          ...additionalInfo
        }
      });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logoutUser = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (user) {
      // Get additional user info based on role
      let additionalInfo = {};
      if (user.role === 'student') {
        const studentInfo = await Student.findOne({ user: user._id });
        if (studentInfo) {
          additionalInfo = {
            admissionNumber: studentInfo.admissionNumber,
            class: studentInfo.class,
            section: studentInfo.section
          };
        }
      } else if (user.role === 'teacher') {
        const teacherInfo = await Teacher.findOne({ user: user._id });
        if (teacherInfo) {
          additionalInfo = {
            employeeId: teacherInfo.employeeId,
            designation: teacherInfo.designation,
            classTeacherOf: teacherInfo.classTeacherOf
          };
        }
      }

      return res.json({
        success: true,
        user: {
          ...user._doc,
          ...additionalInfo
        }
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.contactNumber = req.body.contactNumber || user.contactNumber;
      
      // If user provides a new password
      if (req.body.password) {
        user.password = req.body.password;
      }
      
      // Update address if provided
      if (req.body.address) {
        user.address = {
          ...user.address,
          ...req.body.address
        };
      }
      
      const updatedUser = await user.save();
      
      return res.json({
        success: true,
        user: {
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          contactNumber: updatedUser.contactNumber,
          address: updatedUser.address
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'There is no user with that email'
      });
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
      
    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
    await user.save({ validateBeforeSave: false });
    
    // In a production environment, you would send an email with the token
    // For development, just return the token
    
    res.status(200).json({
      success: true,
      message: 'Password reset email sent',
      resetToken, // This would be removed in production
    });
  } catch (error) {
    console.error(error);
    
    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    
    return res.status(500).json({
      success: false,
      message: 'Email could not be sent',
    });
  }
};

// @desc    Reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    
    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
      
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }
    
    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();
    
    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};