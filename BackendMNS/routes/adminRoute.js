import express from 'express';
import { protect, authorizeRoles } from '../middlewares/authMiddleware.js';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import { generateCustomID } from '../utils/generateCustomID.js';
// import { loginUser, logoutUser, registerSuperAdmin, registerUser } from '../controllers/authController.js';
import User from '../models/User.js';
// import { deleteUserByID, getAllUsers, getUnverifiedUsers, getUserDetailsByID, userStatusUpdate, verifyUser } from '../controllers/superadminController.js';
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


// all user's credential's
adminRouter.get('/all-users', protect, authorizeRoles('admin'), async (req, res) => {
    const data = await User.find({ role: { $nin: ['admin', 'superAdmin'] } })
    return res.status(200).json({ message: "All data from users", data })
})

// lists of all Pending User Verifications
adminRouter.get("/unverified-users", protect, authorizeRoles("admin"), async (req, res) => {
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
});

// mark User As Verified 
adminRouter.put("/verify/:id", protect, authorizeRoles("admin"), async (req, res) => {
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
});

// mark User As isActive= true
adminRouter.put("/users/:id/status", protect, authorizeRoles("admin"), async (req, res) => {
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
            message: `User ${user.name} has been ${isActive ? "activated" : "deactivated"
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
});

// delete specific User's Account, also prevent user's to delete their own account permanently
adminRouter.delete("/users/:id", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Prevent user to delete account from deleting themselves.
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
});

// get User Details By Id
adminRouter.get("/users/:id", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let additionalDetail = null;

        if (user.role === "student") {
            additionalDetail = await Student.findOne({ user: req.params.id });
        } else if (user.role === "teacher") {
            additionalDetail = await Teacher.findOne({ user: req.params.id });
        }

        res.status(200).json({
            success: true,
            user,
            role: user.role,
            additionalDetail,
        });
    } catch (error) {
        console.error("Get user error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});


// update user detail's by role= Admin, by providing id
adminRouter.put("/users/:id/update", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const { name, email, contactNumber, role, address, ...additionalFields } = req.body;

        // Find the user
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update User fields if provided
        if (name) user.name = name;
        if (email) user.email = email;
        if (contactNumber) user.contactNumber = contactNumber;
        if (role) user.role = role; // Optionally allow role update, or restrict it
        if (address) user.address = address;

        await user.save();

        // Update role-specific additional details
        let additionalDetail = null;
        if (user.role === "student") {
            additionalDetail = await Student.findOneAndUpdate(
                { user: req.params.id },
                additionalFields,
                { new: true }
            );
        } else if (user.role === "teacher") {
            additionalDetail = await Teacher.findOneAndUpdate(
                { user: req.params.id },
                additionalFields,
                { new: true }
            );
        } else if (user.role === "admin") {
            // Optionally handle admin-specific details if an Admin model exists
            // For now, assume no additional details for admin
            additionalDetail = null;
        }

        res.json({ success: true, user, role: user.role, additionalDetail });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


adminRouter.get("/analytics-data", protect, authorizeRoles("admin"), async (req, res) => {
    try {
        const userID = req.user._id;
        const user = await User.findOne(userID);
        if (!user) {
            return res.status(404).json({
                message: `Admin With userID:${userID} access denied: user not found in the database.`,
            });
        }

        // Existing queries
        const allTeachers = await Teacher.find(); // all listed teachers
        const teacherCount = await Teacher.find().countDocuments(); // teacher count
        const allStudents = await Student.find(); // all students
        const studentCount = await Student.find().countDocuments(); // student count

        // -----------------------------
        // ANALYTICS QUERIES
        // -----------------------------
        // =====================
        // 1. Female vs Male Students in Each Class
        // =====================
        const femaleVsMaleStudents = await Student.aggregate([
            {
                $group: {
                    _id: "$class",
                    male: { $sum: { $cond: [{ $eq: ["$gender", "Male"] }, 1, 0] } },
                    female: { $sum: { $cond: [{ $eq: ["$gender", "Female"] }, 1, 0] } },
                    other: { $sum: { $cond: [{ $eq: ["$gender", "Other"] }, 1, 0] } }
                }
            },
            {
                $project: {
                    _id: 0,
                    class: "$_id",
                    male: 1,
                    female: 1,
                    other: 1
                }
            },
            { $sort: { class: 1 } }
        ])

        // =====================
        // 2. Female vs Male Teachers per Class
        // =====================
        const femaleVsMaleTeachers = await Teacher.aggregate([
            // Step 1: Normalize class and gender
            {
                $project: {
                    class: { $ifNull: ["$classTeacherOf.class", "Unassigned"] },
                    gender: { $toLower: "$gender" }
                }
            },
            // Step 2: Group by class and gender
            {
                $group: {
                    _id: { class: "$class", gender: "$gender" },
                    count: { $sum: 1 }
                }
            },
            // Step 3: Group by class to pivot gender counts
            {
                $group: {
                    _id: "$_id.class",
                    male: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.gender", "male"] }, "$count", 0]
                        }
                    },
                    female: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.gender", "female"] }, "$count", 0]
                        }
                    },
                    other: {
                        $sum: {
                            $cond: [
                                { $not: { $in: ["$_id.gender", ["male", "female"]] } },
                                "$count",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    class: "$_id",
                    male: 1,
                    female: 1,
                    other: 1
                }
            },
            // Step 4: Sort by class
            {
                $sort: { _id: 1 }
            }
        ]);

        // =====================
        // 3. Teacher-to-Student Ratio per Class
        // =====================
        // Aggregate students per class
        const studentCounts = await Student.aggregate([
            {
                $match: { class: { $ne: null } } // Ensure class is not null
            },
            {
                $group: {
                    _id: "$class",
                    totalStudents: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Aggregate teachers per classTeacherOf.class
        const teacherCounts = await Teacher.aggregate([
            {
                $match: { "classTeacherOf.class": { $ne: null } } // Ensure classTeacherOf.class is not null
            },
            {
                $group: {
                    _id: "$classTeacherOf.class",
                    totalTeachers: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        // Manually compute teacher-to-student ratio
        const teacherStudentRatio = studentCounts.map(student => {
            const teacher = teacherCounts.find(t => t._id === student._id) || { totalTeachers: 0 };
            return {
                class: student._id,
                totalStudents: student.totalStudents,
                totalTeachers: teacher.totalTeachers,
                ratio: teacher.totalTeachers > 0 ? (student.totalStudents / teacher.totalTeachers) : null
            };
        });

        // =====================
        // 4. Academic Year Trend Analysis (Students)
        // =====================
        const academicYearTrends = await Student.aggregate([
            {
                $match: {
                    academicYear: { $in: ["2021-2022", "2022-2023", "2023-2024", "2024-2025", "2025-2026"] }
                }
            },
            {
                $group: {
                    _id: "$academicYear",
                    studentCount: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            },
            {
                $project: {
                    _id: 0,
                    academicYear: "$_id",
                    studentCount: 1
                }
            }
        ]);

        // =====================
        // 5. Teacher Joining Trends (per Year)
        // =====================
        const teacherJoinTrends = await Teacher.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$dateOfJoining" } },
                    teacherCount: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1 } }
        ]);

        // =====================
        // 6. Class Strength & Age Distribution (Class Level)
        // =====================
        const classStrengthAgeDistribution = await Student.aggregate([
            {
                $addFields: {
                    age: {
                        $divide: [
                            {
                                $dateDiff: {
                                    startDate: "$dateOfBirth",
                                    endDate: "$$NOW",
                                    unit: "month"
                                }
                            },
                            12
                        ]
                    }
                }
            },
            {
                $group: {
                    _id: "$class",
                    totalStudents: { $sum: 1 },
                    minAge: { $min: "$age" },
                    maxAge: { $max: "$age" },
                    avgAge: { $avg: "$age" }
                }
            },
            {
                $project: {
                    _id: 0,
                    class: "$_id",
                    totalStudents: 1,
                    minAge: 1,
                    maxAge: 1,
                    avgAge: { $round: ["$avgAge", 1] } // round to 1 decimal place
                }
            },
            { $sort: { class: 1 } }
        ]);

        // Send response
        return res.status(200).json({
            message: "Fetching all teachers and students for admin view.",
            classStrengthAgeDistribution,
            femaleVsMaleStudents,
            femaleVsMaleTeachers,
            teacherStudentRatio,
            academicYearTrends,
            teacherJoinTrends,
            allTeachers,
            allStudents,
            Total_Teacher_Count: teacherCount,
            Total_Student_Count: studentCount
        });
    } catch (error) {
        console.log(
            "An error occurred while attempting to fetch all teachers and students data from the database.",
            error
        );
        return res.status(500).json({
            message:
                "An error occurred while attempting to fetch all teachers and students data.",
            error,
        });
    }
}
);



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
            // const filterRoles = { role: { $nin: ['admin', 'superAdmin'] } };

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

// Get role distribution data for pie chart, roles = admin
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

// Get recent activity data, excluding role = admin 
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