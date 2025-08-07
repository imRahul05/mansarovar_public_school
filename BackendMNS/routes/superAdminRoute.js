import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateCustomID } from '../utils/generateCustomID.js';
import { loginUser, logoutUser, registerSuperAdmin, registerUser } from '../controllers/authController.js';
import User from '../models/User.js';
import { deleteUserByID, getAllUsers, getUnverifiedUsers, getUserDetailsByID, userStatusUpdate, verifyUser } from '../controllers/superadminController.js';

const superAdminRouter = express.Router();


//@api/superadmin

superAdminRouter.get('/users', protect, authorizeRoles('admin', 'superadmin'),getAllUsers );

superAdminRouter.get('/unverified-users', protect, authorizeRoles('superadmin'), getUnverifiedUsers);


superAdminRouter.put('/verify/:id',protect, authorizeRoles('superadmin'),verifyUser);


superAdminRouter.put('/users/:id/status', protect, authorizeRoles('superadmin'), userStatusUpdate);

superAdminRouter.delete('/users/:id', protect, authorizeRoles('superadmin'), deleteUserByID);


superAdminRouter.get('/users/:id', protect, authorizeRoles('superadmin'),getUserDetailsByID);

superAdminRouter.get('/analytics-data', protect, authorizeRoles('superadmin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const inactiveUsers = await User.countDocuments({ isActive: false });
    const verifiedUsers = await User.countDocuments({ isVerified: true });
    const unverifiedUsers = await User.countDocuments({ isVerified: false });
    
    // Get user registrations from last month
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    
    const newRegistrationsLastMonth = await User.countDocuments({
      createdAt: { $gte: lastMonth }
    });
    
    // Get verified users from last month
    const verifiedUsersLastMonth = await User.countDocuments({
      isVerified: true,
      updatedAt: { $gte: lastMonth }
    });
    
    // User roles distribution
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // User growth data (last 6 months)
    const userGrowthData = [];
    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthlyRegistrations = await User.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });
      
      const monthlyVerifications = await User.countDocuments({
        isVerified: true,
        updatedAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });
      
      userGrowthData.push({
        month: startOfMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        registrations: monthlyRegistrations,
        verifications: monthlyVerifications
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        overview: {
          totalUsers,
          activeUsers,
          inactiveUsers,
          verifiedUsers,
          unverifiedUsers,
          newRegistrationsLastMonth,
          verifiedUsersLastMonth
        },
        userGrowth: userGrowthData,
        roleDistribution: roleDistribution.map(role => ({
          role: role._id,
          count: role.count,
          percentage: ((role.count / totalUsers) * 100).toFixed(1)
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics data'
    });
  }
});

// Get user growth data for charts
superAdminRouter.get('/user-growth', protect, authorizeRoles('superadmin'), async (req, res) => {
  try {
    const { period = '6' } = req.query; // Default to 6 months
    const monthsBack = parseInt(period);
    
    const userGrowthData = [];
    
    for (let i = monthsBack - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
      const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      
      const monthlyRegistrations = await User.countDocuments({
        createdAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });
      
      const monthlyVerifications = await User.countDocuments({
        isVerified: true,
        updatedAt: {
          $gte: startOfMonth,
          $lte: endOfMonth
        }
      });
      
      const cumulativeUsers = await User.countDocuments({
        createdAt: { $lte: endOfMonth }
      });
      
      userGrowthData.push({
        month: startOfMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        registrations: monthlyRegistrations,
        verifications: monthlyVerifications,
        cumulative: cumulativeUsers
      });
    }
    
    res.status(200).json({
      success: true,
      data: userGrowthData
    });
  } catch (error) {
    console.error('Error fetching user growth data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching user growth data'
    });
  }
});

// Get role distribution data for pie chart
superAdminRouter.get('/role-distribution', protect, authorizeRoles('superadmin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    
    const roleDistribution = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    const distributionData = roleDistribution.map(role => ({
      role: role._id,
      count: role.count,
      percentage: parseFloat(((role.count / totalUsers) * 100).toFixed(1))
    }));
    
    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        distribution: distributionData
      }
    });
  } catch (error) {
    console.error('Error fetching role distribution data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching role distribution data'
    });
  }
});

// Get recent activity data
superAdminRouter.get('/recent-activity', protect, authorizeRoles('superadmin'), async (req, res) => {
  try {
    const { days = '7' } = req.query; // Default to 7 days
    const daysBack = parseInt(days);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysBack);
    
    const recentRegistrations = await User.find({
      createdAt: { $gte: startDate }
    })
    .select('name email role createdAt isVerified')
    .sort({ createdAt: -1 })
    .limit(10);
    
    const recentVerifications = await User.find({
      isVerified: true,
      updatedAt: { $gte: startDate }
    })
    .select('name email role updatedAt')
    .sort({ updatedAt: -1 })
    .limit(10);
    
    res.status(200).json({
      success: true,
      data: {
        recentRegistrations,
        recentVerifications
      }
    });
  } catch (error) {
    console.error('Error fetching recent activity data:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching recent activity data'
    });
  }
}); 
export default superAdminRouter;