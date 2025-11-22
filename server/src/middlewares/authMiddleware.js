import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes - Authentication middleware
export const protect = async (req, res, next) => {
  let token;
  try {
    // Get token from cookie or header
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    // Get user from the token
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    // Check if user is active
    if (!req.user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'User account is deactivated. Please contact admin.'
      });
    }
    // Update last login time
    req.user.lastLogin = new Date();
    await req.user.save();
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route'
    });
  }
};


// Role-based authorization middleware
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: 'User role not defined'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }

    next();
  };
};