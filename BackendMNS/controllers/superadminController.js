
import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateCustomID } from '../utils/generateCustomID.js';
import User from '../models/User.js';



const getAllUsers =async (req, res) => {
  try {
    const users = await User.find().select('-password');
    
    res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}


const getUnverifiedUsers= async (req, res) => {
  try {
    const unverifiedUsers = await User.find({ isVerified: false }).select('-password');
    
    res.status(200).json({
      success: true,
      count: unverifiedUsers.length,
      users: unverifiedUsers
    });
  } catch (error) {
    console.error('Get unverified users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

const verifyUser =   async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found',
        });
      }

    
      if (user.isVerified) {
        return res.status(400).json({
          success: false,
          message: `User ${user.name} is already verified and cannot be unverified or verified again.`,
        });
      }

      // Mark the user as verified
      user.isVerified = true;
      await user.save();

      res.status(200).json({
        success: true,
        message: `User ${user.name} has been verified.`,
      });
    } catch (error) {
      console.error('Verify user error:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: error.message,
      });
    }
  }

const getUserDetailsByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}
const userStatusUpdate = async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} has been ${isActive ? 'activated' : 'deactivated'}.`
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

const deleteUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent superadmin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `User ${user.name} has been deleted.`
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}
export {getAllUsers, getUnverifiedUsers,verifyUser,userStatusUpdate,deleteUserByID,getUserDetailsByID};