import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { generateCustomID } from '../utils/generateCustomID.js';
import { loginUser, logoutUser, registerSuperAdmin, registerUser } from '../controllers/authController.js';
import User from '../models/User.js';
import { deleteUserByID, getAllUsers, getUnverifiedUsers, getUserDetailsByID, userStatusUpdate, verifyUser } from '../controllers/superadminController.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js'
const adminRouter = express.Router();


//@api/admin

// allow Role = Admin to create batch of STUDENTS
adminRouter.post('/students/batch', protect, authorizeRoles('admin', 'superadmin'), async (req, res) => {
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

        const newUser = new User({
            name,
            email,
            password,
            role: 'student',
            customID,
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

    } catch (err) {
        console.error("error while granting batch of student", err);
        res.status(500).json({ message: 'Something went wrong', err });
    }
})

// allow Role = Admin to create batch of TEACHERS
adminRouter.post('/teachers/batch', protect, authorizeRoles('admin', 'superadmin'), async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            contactNumber,
            address,
            // teacher-specific fields
            employeeId,
            designation,
            subjectsSpecialization,
            qualification,
            dateOfJoining,
            classTeacherClass,
            classTeacherSection,
            experience,
            dateOfBirth,
            gender,
            emergencyContactName,
            emergencyContactNumber,
            emergencyContactRelation
        } = req.body;

        // Step 1: Create User
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already exists' });

        // Generate unique custom ID for the teacher
        let customID;
        try {
            customID = await generateCustomID("teacher");
        } catch (error) {
            console.error("Error generating custom ID:", error);
            return res.status(500).json({
                success: false,
                message: "Error generating unique ID for user",
            });
        }

        const newUser = new User({
            name,
            email,
            password,
            role: 'teacher',
            customID,
            contactNumber,
            address
        });
        const savedUser = await newUser.save();

        // Step 2: Create Teacher
        const newTeacher = new Teacher({
            user: savedUser._id,
            employeeId,
            designation,
            subjectsSpecialization,
            qualification,
            dateOfJoining,
            classTeacherOf: {
                class: classTeacherClass,
                section: classTeacherSection
            },
            experience,
            dateOfBirth,
            gender,
            emergencyContactName,
            emergencyContactNumber,
            emergencyContactRelation
        });

        const savedTeacher = await newTeacher.save();

        res.status(201).json({
            message: 'Teacher created successfully',
            userId: savedUser._id,
            teacherId: savedTeacher._id
        });

    } catch (err) {
        console.error("Error while creating teacher", err);
        res.status(500).json({ message: 'Something went wrong', err });
    }
});

// allow Role = Admin to Fetching all list's of STUDENTS and TEACHERS
adminRouter.get("/getAllTeachersAndStudents", protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const userID = req.user._id
        const user = await User.findOne(userID)
        if (!user) {
            return res.status(404).json({ message: `Admin With userID:${userID} access denied: user not found in the database.` })
        }
        const allTeachers = await Teacher.find()
        const allStudents = await Student.find()
        return res.status(200).json({ message: "Fetching all teachers and students for admin view.", allTeachers, allStudents })
    } catch (error) {
        console.log("An error occurred while attempting to fetch all teachers and students data from the database.", error);
        return res.status(500).json({ message: "An error occurred while attempting to fetch all teachers and students data.", error })
    }
})


export default adminRouter;