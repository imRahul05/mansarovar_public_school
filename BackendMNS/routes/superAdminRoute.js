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


export default superAdminRouter;