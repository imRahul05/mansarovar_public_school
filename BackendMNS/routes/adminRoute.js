import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateCustomID } from '../utils/generateCustomID.js';
import { loginUser, logoutUser, registerSuperAdmin, registerUser } from '../controllers/authController.js';
import User from '../models/User.js';
import { deleteUserByID, getAllUsers, getUnverifiedUsers, getUserDetailsByID, userStatusUpdate, verifyUser } from '../controllers/superadminController.js';
import Student from '../models/Student.js';

const adminRouter = express.Router();


//@api/admin

<<<<<<< HEAD
adminRouter.post('/users/batch', protect, authorizeRoles('admin', 'superadmin'), async (req, res) => {
=======
adminRouter.post('/students/batch', protect, authorizeRoles('admin', 'superadmin'), async (req, res) => {
>>>>>>> origin/main
    try {
        const {
            name,
            email,
            password,
            contactNumber,
            address,
            // student-specific fields
            admissionNumber,
            class: studentClass,
            section,
            rollNumber,
            dateOfBirth,
            gender,
            bloodGroup,
            fatherName,
            motherName,
            parentContactNumber,
            parentEmail,
            emergencyContactName,
            emergencyContactNumber,
            emergencyContactRelation,
            admissionDate,
            previousSchool,
            academicYear,
            medicalConditions,
        } = req.body;
        // Step 1: Create User
        const existingUser = await User.findOne({ email });
        // check is user is already exist's 
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });
<<<<<<< HEAD
=======
        // Generate unique custom ID before creating user
        let customID;
        try {
            customID = await generateCustomID("student");
        } catch (error) {
            console.error("Error generating custom ID:", error);
            return res.status(500).json({
                success: false,
                message: "Error generating unique ID for user",
            });
        }

>>>>>>> origin/main
        const newUser = new User({
            name,
            email,
            password,
            role: 'student',
<<<<<<< HEAD
=======
            customID,
>>>>>>> origin/main
            contactNumber,
            address
        });
        const savedUser = await newUser.save();
        // Step 2: Create Student
        const newStudent = new Student({
            user: savedUser._id,
            admissionNumber,
            class: studentClass,
            section,
            rollNumber,
            dateOfBirth,
            gender,
            bloodGroup,
            fatherName,
            motherName,
            parentContactNumber,
            parentEmail,
            emergencyContactName,
            emergencyContactNumber,
            emergencyContactRelation,
            admissionDate,
            previousSchool,
            academicYear,
            medicalConditions,
        });
        const savedStudent = await newStudent.save();
        res.status(201).json({
            message: 'Student created successfully',
            userId: savedUser._id,
            studentId: savedStudent._id
        });
<<<<<<< HEAD
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
=======

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong', err });
>>>>>>> origin/main
    }
})

export default adminRouter;