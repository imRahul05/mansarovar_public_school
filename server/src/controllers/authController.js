// import User from "../models/User.js";
// import Student from "../models/Student.js";
// import Teacher from "../models/Teacher.js";
// // import generateToken from "../utils/generateToken.js"; // Uncomment if needed
// // import bcrypt from "bcryptjs"; // Uncomment if needed
// import crypto from "crypto";
// import jwt from "jsonwebtoken";
// import { generateCustomID } from "../utils/generateCustomID.js";

// // @desc    Register new superadmin
// // @route   POST /api/auth/registerSuperAdmin
// // @access  Public
// export const registerSuperAdmin = async (req, res) => {
//   try {
//     const existingSuperadmin = await User.findOne({ role: "superadmin" });
//     if (existingSuperadmin) {
//       return res.status(403).json({
//         success: false,
//         message: "Superadmin already exists. This route is disabled.",
//       });
//     }

//     const { name, email, password, contactNumber, address } = req.body;

//     let customID;
//     try {
//       customID = await generateCustomID("superadmin");
//     } catch (error) {
//       console.error("Error generating custom ID:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error generating unique ID for superadmin",
//       });
//     }

//     const user = new User({
//       name,
//       email,
//       password,
//       role: "superadmin",
//       customID,
//       contactNumber,
//       address,
//       isVerified: true,
//       isActive: true,
//     });

//     await user.save();

//     res.status(201).json({
//       success: true,
//       message: "Superadmin created successfully",
//       data: {
//         customID: user.customID,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // @desc    Register new user
// // @route   POST /api/auth/register
// // @access  Protected
// export const registerUser = async (req, res) => {
//   let user;
//   try {
//     const { name, email, password, role } = req.body;
//     const creatorRole = req.user.role;

//     // Role-based creation restrictions
//     if (creatorRole === "admin" && role && role !== "student" && role !== "teacher") {
//       return res.status(403).json({
//         success: false,
//         message: "Admins can only create students and teachers.",
//       });
//     }

//     if (creatorRole === "superadmin" && role && !["student", "teacher", "admin"].includes(role)) {
//       return res.status(403).json({
//         success: false,
//         message: "Superadmins can create admin, teacher, and student roles only.",
//       });
//     }

//     user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({
//         success: false,
//         message: "User with this email already exists",
//       });
//     }

//     let customID;
//     try {
//       customID = await generateCustomID(role || "student");
//     } catch (error) {
//       console.error("Error generating custom ID:", error);
//       return res.status(500).json({
//         success: false,
//         message: "Error generating unique ID for user",
//       });
//     }

//     user = await User.create({
//       name,
//       email,
//       password,
//       role: role || "student",
//       customID,
//       isVerified: creatorRole === "superadmin",
//     });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: {
//         _id: user._id,
//         customID: user.customID,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         isVerified: user.isVerified,
//       },
//     });
//   } catch (error) {
//     console.error("Register error:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // @desc    Login user
// // @route   POST /api/auth/login
// // @access  Public
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide email and password",
//       });
//     }

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     if (!user.isVerified) {
//       return res.status(401).json({
//         success: false,
//         message: "Account not verified. Please contact a superadmin.",
//       });
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//       return res.status(401).json({ success: false, message: "Invalid credentials" });
//     }

//     if (!user.customID) {
//       try {
//         user.customID = await generateCustomID(user.role);
//         await user.save();
//       } catch (error) {
//         console.error("Error generating custom ID:", error);
//       }
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET || "your-secret-key",
//       { expiresIn: "7d" }
//     );

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "None",
//       path: "/",
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         _id: user._id,
//         customID: user.customID,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         profilePicture: user.profilePicture,
//       },
//     });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // @desc    Logout user
// export const logoutUser = (req, res) => {
//   res.cookie("token", "none", { httpOnly: true, expires: new Date(0) });
//   res.status(200).json({ success: true, message: "User logged out successfully" });
// };

// // @desc    Get current user info
// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     let additionalInfo = {};
//     if (user.role === "student") {
//       const studentInfo = await Student.findOne({ user: user._id });
//       if (studentInfo) additionalInfo = { admissionNumber: studentInfo.admissionNumber, class: studentInfo.class, section: studentInfo.section };
//     } else if (user.role === "teacher") {
//       const teacherInfo = await Teacher.findOne({ user: user._id });
//       if (teacherInfo) additionalInfo = { employeeId: teacherInfo.employeeId, designation: teacherInfo.designation, classTeacherOf: teacherInfo.classTeacherOf };
//     }

//     res.json({ success: true, user: { ...user._doc, ...additionalInfo } });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // @desc    Update user profile
// export const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.contactNumber = req.body.contactNumber || user.contactNumber;
//     if (req.body.password) user.password = req.body.password;
//     if (req.body.address) user.address = { ...user.address, ...req.body.address };

//     const updatedUser = await user.save();
//     res.json({
//       success: true,
//       user: {
//         _id: updatedUser._id,
//         name: updatedUser.name,
//         email: updatedUser.email,
//         role: updatedUser.role,
//         contactNumber: updatedUser.contactNumber,
//         address: updatedUser.address,
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // @desc    Forgot password
// export const forgotPassword = async (req, res) => {
//   let user;
//   try {
//     const { email } = req.body;
//     user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "There is no user with that email" });

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

//     await user.save({ validateBeforeSave: false });
//     res.status(200).json({ success: true, message: "Password reset email sent", resetToken });
//   } catch (error) {
//     console.error(error);
//     if (user) {
//       user.resetPasswordToken = undefined;
//       user.resetPasswordExpire = undefined;
//       await user.save({ validateBeforeSave: false });
//     }
//     res.status(500).json({ success: false, message: "Email could not be sent" });
//   }
// };

// // @desc    Reset password
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;
//     const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
//     if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

//     user.password = newPassword;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.status(200).json({ success: true, message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // @desc    Get user profile
// export const getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error("Get user profile error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };
import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
// import generateToken from "../utils/generateToken.js"; // Uncomment if needed
// import bcrypt from "bcryptjs"; // Uncomment if needed
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { generateCustomID } from "../utils/generateCustomID.js";

// @desc    Register new superadmin
// @route   POST /api/auth/registerSuperAdmin
// @access  Public
export const registerSuperAdmin = async (req, res) => {
  try {
    const existingSuperadmin = await User.findOne({ role: "superadmin" });
    if (existingSuperadmin) {
      return res.status(403).json({
        success: false,
        message: "Superadmin already exists. This route is disabled.",
      });
    }

    const { name, email, password, contactNumber, address } = req.body;

    let customID;
    try {
      customID = await generateCustomID("superadmin");
    } catch (error) {
      console.error("Error generating custom ID:", error);
      return res.status(500).json({
        success: false,
        message: "Error generating unique ID for superadmin",
      });
    }

    const user = new User({
      name,
      email,
      password,
      role: "superadmin",
      customID,
      contactNumber,
      address,
      isVerified: true,
      isActive: true,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Superadmin created successfully",
      data: {
        customID: user.customID,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Protected
export const registerUser = async (req, res) => {
  let user;
  try {
    const { name, email, password, role } = req.body;
    const creatorRole = req.user.role;

    // Role-based creation restrictions
    if (creatorRole === "admin" && role && role !== "student" && role !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Admins can only create students and teachers.",
      });
    }

    if (creatorRole === "superadmin" && role && !["student", "teacher", "admin"].includes(role)) {
      return res.status(403).json({
        success: false,
        message: "Superadmins can create admin, teacher, and student roles only.",
      });
    }

    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    let customID;
    try {
      customID = await generateCustomID(role || "student");
    } catch (error) {
      console.error("Error generating custom ID:", error);
      return res.status(500).json({
        success: false,
        message: "Error generating unique ID for user",
      });
    }

    user = await User.create({
      name,
      email,
      password,
      role: role || "student",
      customID,
      isVerified: creatorRole === "superadmin",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        _id: user._id,
        customID: user.customID,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please contact a superadmin.",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    if (!user.customID) {
      try {
        user.customID = await generateCustomID(user.role);
        await user.save();
      } catch (error) {
        console.error("Error generating custom ID:", error);
      }
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        customID: user.customID,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Logout user
export const logoutUser = (req, res) => {
  res.cookie("token", "none", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ success: true, message: "User logged out successfully" });
};

// @desc    Get current user info
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    let additionalInfo = {};
    if (user.role === "student") {
      const studentInfo = await Student.findOne({ user: user._id });
      if (studentInfo) additionalInfo = { admissionNumber: studentInfo.admissionNumber, class: studentInfo.class, section: studentInfo.section };
    } else if (user.role === "teacher") {
      const teacherInfo = await Teacher.findOne({ user: user._id });
      if (teacherInfo) additionalInfo = { employeeId: teacherInfo.employeeId, designation: teacherInfo.designation, classTeacherOf: teacherInfo.classTeacherOf };
    }

    res.json({ success: true, user: { ...user._doc, ...additionalInfo } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.contactNumber = req.body.contactNumber || user.contactNumber;
    if (req.body.password) user.password = req.body.password;
    if (req.body.address) user.address = { ...user.address, ...req.body.address };

    const updatedUser = await user.save();
    res.json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        contactNumber: updatedUser.contactNumber,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Forgot password
export const forgotPassword = async (req, res) => {
  let user;
  try {
    const { email } = req.body;
    user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "There is no user with that email" });

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });
    res.status(200).json({ success: true, message: "Password reset email sent", resetToken });
  } catch (error) {
    console.error(error);
    if (user) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
    }
    res.status(500).json({ success: false, message: "Email could not be sent" });
  }
};

// @desc    Reset password
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// @desc    Get user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Get user profile error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
