// import express from "express";
// import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { generateCustomID } from "../utils/generateCustomID.js";
// import {
//   loginUser,
//   logoutUser,
//   registerSuperAdmin,
//   registerUser,
// } from "../controllers/authController.js";
import User from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const { page, limit, search, role, status, all } = req.query;

    const query = {};

    // Filter by role
    if (role && role !== "all") {
      query.role = role;
    }

    // Filter by status
    if (status && status !== "all") {
      if (status === "verified") query.isVerified = true;
      else if (status === "unverified") query.isVerified = false;
      else if (status === "active") query.isActive = true;
      else if (status === "inactive") query.isActive = false;
    }

    // Filter by search (name, email, customID)
    if (search && search.trim() !== "") {
      const searchRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { customID: searchRegex },
      ];
    }

    // Overall global stats for system summary
    const [totalAll, totalVerified, totalUnverified, totalActive] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ isVerified: true }),
        User.countDocuments({ isVerified: false }),
        User.countDocuments({ isActive: true }),
      ]);

    const stats = {
      totalUsers: totalAll,
      verifiedUsers: totalVerified,
      unverifiedUsers: totalUnverified,
      activeUsers: totalActive,
    };

    const totalFiltered = await User.countDocuments(query);

    // Check if pagination is requested (if page or limit is provided and all !== 'true')
    const isPaginated =
      (page !== undefined || limit !== undefined) && all !== "true";

    let users;
    let pageNum = 1;
    let limitNum = 10;
    let totalPages = 1;
    let hasMore = false;

    if (isPaginated) {
      pageNum = Math.max(1, parseInt(page, 10) || 1);
      limitNum = Math.max(1, parseInt(limit, 10) || 10);
      const skip = (pageNum - 1) * limitNum;
      totalPages = Math.ceil(totalFiltered / limitNum);
      hasMore = pageNum < totalPages;

      users = await User.find(query)
        .select("-password")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum);
    } else {
      users = await User.find(query)
        .select("-password")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: users.length,
      total: totalFiltered,
      currentPage: isPaginated ? pageNum : 1,
      totalPages: isPaginated ? totalPages : 1,
      hasMore: isPaginated ? hasMore : false,
      users,
      stats,
    });
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUnverifiedUsers = async (req, res) => {
  try {
    const unverifiedUsers = await User.find({ isVerified: false }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      count: unverifiedUsers.length,
      users: unverifiedUsers,
    });
  } catch (error) {
    console.error("Get unverified users error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
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
    console.error("Verify user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getUserDetailsByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const userStatusUpdate = async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.isActive = isActive;
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${user.name} has been ${
        isActive ? "activated" : "deactivated"
      }.`,
    });
  } catch (error) {
    console.error("Update user status error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent superadmin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot delete your own account",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: `User ${user.name} has been deleted.`,
    });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAnalyticsData = async (req, res) => {
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
      createdAt: { $gte: lastMonth },
    });

    // Get verified users from last month
    const verifiedUsersLastMonth = await User.countDocuments({
      isVerified: true,
      updatedAt: { $gte: lastMonth },
    });

    // User roles distribution
    const roleDistribution = await User.aggregate([
      {
        $match: {
          role: { $exists: true, $nin: [null, ""] } // Filter out null/empty roles
        }
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
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
          $lte: endOfMonth,
        },
      });

      const monthlyVerifications = await User.countDocuments({
        isVerified: true,
        updatedAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });

      userGrowthData.push({
        month: startOfMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        registrations: monthlyRegistrations,
        verifications: monthlyVerifications,
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
          verifiedUsersLastMonth,
        },
        userGrowth: userGrowthData,
        roleDistribution: roleDistribution
          .filter(role => role._id && typeof role._id === 'string') // Additional safety check
          .map((role) => ({
            role: role._id,
            count: role.count,
            percentage: ((role.count / totalUsers) * 100).toFixed(1),
          })),
      },
    });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching analytics data",
    });
  }
};

const getUserGrowth = async (req, res) => {
  try {
    const { period = "6" } = req.query; // Default to 6 months
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
          $lte: endOfMonth,
        },
      });

      const monthlyVerifications = await User.countDocuments({
        isVerified: true,
        updatedAt: {
          $gte: startOfMonth,
          $lte: endOfMonth,
        },
      });

      const cumulativeUsers = await User.countDocuments({
        createdAt: { $lte: endOfMonth },
      });

      userGrowthData.push({
        month: startOfMonth.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        registrations: monthlyRegistrations,
        verifications: monthlyVerifications,
        cumulative: cumulativeUsers,
      });
    }

    res.status(200).json({
      success: true,
      data: userGrowthData,
    });
  } catch (error) {
    console.error("Error fetching user growth data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching user growth data",
    });
  }
};

const getRoleDistribution = async (req, res) => {
  try {
    // First, check for and fix any users with invalid roles
    const usersWithInvalidRoles = await User.find({
      $or: [
        { role: { $exists: false } },
        { role: null },
        { role: "" },
        { role: { $nin: ["student", "teacher", "admin", "superadmin"] } }
      ]
    });

    if (usersWithInvalidRoles.length > 0) {
      console.log(`Found ${usersWithInvalidRoles.length} users with invalid roles. Fixing...`);
      
      // Fix invalid roles by setting them to 'student' (default)
      await User.updateMany(
        {
          $or: [
            { role: { $exists: false } },
            { role: null },
            { role: "" },
            { role: { $nin: ["student", "teacher", "admin", "superadmin"] } }
          ]
        },
        { $set: { role: "student" } }
      );
    }

    const totalUsers = await User.countDocuments();

    const roleDistribution = await User.aggregate([
      {
        $match: {
          role: { $exists: true, $nin: [null, ""] } // Filter out null/empty roles
        }
      },
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const distributionData = roleDistribution
      .filter(role => role._id && typeof role._id === 'string') // Additional safety check
      .map((role) => ({
        role: role._id,
        count: role.count,
        percentage: parseFloat(((role.count / totalUsers) * 100).toFixed(1)),
      }));

    console.log('Role distribution data:', distributionData); // Debug log

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        distribution: distributionData,
      },
    });
  } catch (error) {
    console.error("Error fetching role distribution data:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching role distribution data",
    });
  }
};


const getRecentActivity = async (req, res) => {
    try {
      const { days = "7" } = req.query; // Default to 7 days
      const daysBack = parseInt(days);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - daysBack);

      const recentRegistrations = await User.find({
        createdAt: { $gte: startDate },
      })
        .select("name email role createdAt isVerified")
        .sort({ createdAt: -1 })
        .limit(10);

      const recentVerifications = await User.find({
        isVerified: true,
        updatedAt: { $gte: startDate },
      })
        .select("name email role updatedAt")
        .sort({ updatedAt: -1 })
        .limit(10);

      res.status(200).json({
        success: true,
        data: {
          recentRegistrations,
          recentVerifications,
        },
      });
    } catch (error) {
      console.error("Error fetching recent activity data:", error);
      res.status(500).json({
        success: false,
        message: "Server error while fetching recent activity data",
      });
    }
  }
export {
  getAllUsers,
  getUnverifiedUsers,
  verifyUser,
  userStatusUpdate,
  deleteUserByID,
  getUserDetailsByID,
  getAnalyticsData,
  getUserGrowth,
  getRoleDistribution,
  getRecentActivity
};
