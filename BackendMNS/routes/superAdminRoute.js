import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

import {
  deleteUserByID,
  getAllUsers,
  getAnalyticsData,
  getRecentActivity,
  getRoleDistribution,
  getUnverifiedUsers,
  getUserDetailsByID,
  getUserGrowth,
  userStatusUpdate,
  verifyUser,
} from "../controllers/superadminController.js";

const superAdminRouter = express.Router();

//@api/superadmin

superAdminRouter.get(
  "/users",
  protect,
  authorizeRoles("admin", "superadmin"),
  getAllUsers
);

superAdminRouter.get(
  "/unverified-users",
  protect,
  authorizeRoles("superadmin"),
  getUnverifiedUsers
);

superAdminRouter.put(
  "/verify/:id",
  protect,
  authorizeRoles("superadmin"),
  verifyUser
);

superAdminRouter.put(
  "/users/:id/status",
  protect,
  authorizeRoles("superadmin"),
  userStatusUpdate
);

superAdminRouter.delete(
  "/users/:id",
  protect,
  authorizeRoles("superadmin"),
  deleteUserByID
);

superAdminRouter.get(
  "/users/:id",
  protect,
  authorizeRoles("superadmin"),
  getUserDetailsByID
);

superAdminRouter.get(
  "/analytics-data",
  protect,
  authorizeRoles("superadmin"),
  getAnalyticsData
);

// Get user growth data for charts
superAdminRouter.get(
  "/user-growth",
  protect,
  authorizeRoles("superadmin"),
  getUserGrowth
);

// Get role distribution data for pie chart
superAdminRouter.get(
  "/role-distribution",
  protect,
  authorizeRoles("superadmin"),
 getRoleDistribution
);

// Get recent activity data
superAdminRouter.get(
  "/recent-activity",
  protect,
  authorizeRoles("superadmin"),
  getRecentActivity
);
export default superAdminRouter;
