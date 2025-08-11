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
adminRouter.get("/analytics-data", protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const userID = req.user._id
        const user = await User.findOne(userID)
        if (!user) {
            return res.status(404).json({ message: `Admin With userID:${userID} access denied: user not found in the database.` })
        }
        const allTeachers = await Teacher.find()
        const teacherCount = await Teacher.find().countDocuments()
        const allStudents = await Student.find()
        const studentCount = await Student.find().countDocuments()
        console.log(allTeachers.length, allStudents.length)
        return res.status(200).json({ message: "Fetching all teachers and students for admin view.", allTeachers, allStudents, Total_Student_Count: teacherCount, Total_Teacher_Count: studentCount })
    } catch (error) {
        console.log("An error occurred while attempting to fetch all teachers and students data from the database.", error);
        return res.status(500).json({ message: "An error occurred while attempting to fetch all teachers and students data.", error })
    }
})

// all user's credential's
adminRouter.get('/all-userData', protect, authorizeRoles('admin'), async (req, res) => {
    const data = await User.find()
    return res.status(200).json({ message: "All data from users", data })
})

// Get user growth data data for pie chart, role = Admin
adminRouter.get('/user-growth', protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const { period = '6' } = req.query; // Default to 6 months
        const monthsBack = parseInt(period);
        const userGrowthData = [];
        for (let i = monthsBack - 1; i >= 0; i--) {
            const date = new Date();
            date.setMonth(date.getMonth() - i);
            const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            const filterRoles = { role: { $nin: ['admin', 'superAdmin'] } };

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



// Get role distribution data for pie chart, roles = admin and superadmin
adminRouter.get('/role-distribution', protect, authorizeRoles('admin'), async (req, res) => {
    try {
        // Count total users for percentage calculation
        const totalUsers = await User.countDocuments();

        // Aggregate to get counts for only admin and superadmin roles
        const roleDistribution = await User.aggregate([
            {
                $match: {
                    role: { $in: ["student", "teacher"] } // Filter for "student" and "teacher"
                }
            },
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

        // Map to format data with percentages
        const distributionData = roleDistribution.map(role => ({
            role: role._id,
            count: role.count,
            percentage: totalUsers > 0 ? parseFloat(((role.count / totalUsers) * 100).toFixed(1)) : 0
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

// Get recent activity data, excluding role = admin and superadmin
adminRouter.get('/recent-activity', protect, authorizeRoles('admin'), async (req, res) => {
    try {
        const { days = '7' } = req.query; // Default to 7 days
        const daysBack = parseInt(days);
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - daysBack);

        const recentRegistrations = await User.find({
            createdAt: { $gte: startDate },
            role: { $nin: ['admin', 'superadmin'] } // Exclude admin and superadmin
        })
            .select('name email role createdAt isVerified')
            .sort({ createdAt: -1 })
            .limit(10);

        const recentVerifications = await User.find({
            isVerified: true,
            updatedAt: { $gte: startDate },
            role: { $nin: ['admin', 'superadmin'] } // Exclude admin and superadmin
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


export default adminRouter;