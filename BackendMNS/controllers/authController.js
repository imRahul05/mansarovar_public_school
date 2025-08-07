import User from "../models/User.js";
import Student from "../models/Student.js";
import Teacher from "../models/Teacher.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

// @desc    Register new user
// @route   POST /api/auth/register
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

    // Generate unique custom ID before creating user
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
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const creatorRole = req.user.role;

    // Role-based creation restrictions
    if (creatorRole === "admin") {
      // Admin can only create students and teachers
      if (role && role !== "student" && role !== "teacher") {
        return res.status(403).json({
          success: false,
          message: "Admins can only create students and teachers.",
        });
      }
    }

    if (creatorRole === "superadmin") {
      // Superadmin can create admin, student, and teacher roles
      if (role && !["student", "teacher", "admin"].includes(role)) {
        return res.status(403).json({
          success: false,
          message:
            "Superadmins can create admin, teacher, and student roles only.",
        });
      }
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Generate unique custom ID before creating user
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

    // Create new user with custom ID
    user = await User.create({
      name,
      email,
      password, // will be hashed by pre-save hook
      role: role || "student", // default to student role
      customID, // Include custom ID during creation
      isVerified: creatorRole === "superadmin", // Only superadmin can create pre-verified users
    });

    // Return successful response with user data
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

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");

    // Check if user exists
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({
        success: false,
        message: "Account not verified. Please contact a superadmin.",
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate unique ID if not already present
    if (!user.customID) {
      try {
        user.customID = await generateCustomID(user.role);
        await user.save();
      } catch (error) {
        console.error("Error generating custom ID:", error);
        // Continue with login even if custom ID generation fails
      }
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Always true in production
      sameSite: "None", // Must be 'None' for cross-site cookie usage
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Return successful response with user data and token
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
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "none", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (user) {
      // Get additional user info based on role
      let additionalInfo = {};
      if (user.role === "student") {
        const studentInfo = await Student.findOne({ user: user._id });
        if (studentInfo) {
          additionalInfo = {
            admissionNumber: studentInfo.admissionNumber,
            class: studentInfo.class,
            section: studentInfo.section,
          };
        }
      } else if (user.role === "teacher") {
        const teacherInfo = await Teacher.findOne({ user: user._id });
        if (teacherInfo) {
          additionalInfo = {
            employeeId: teacherInfo.employeeId,
            designation: teacherInfo.designation,
            classTeacherOf: teacherInfo.classTeacherOf,
          };
        }
      }

      return res.json({
        success: true,
        user: {
          ...user._doc,
          ...additionalInfo,
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.contactNumber = req.body.contactNumber || user.contactNumber;

      // If user provides a new password
      if (req.body.password) {
        user.password = req.body.password;
      }

      // Update address if provided
      if (req.body.address) {
        user.address = {
          ...user.address,
          ...req.body.address,
        };
      }

      const updatedUser = await user.save();

      return res.json({
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
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "There is no user with that email",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // In a production environment, you would send an email with the token
    // For development, just return the token

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      resetToken, // This would be removed in production
    });
  } catch (error) {
    console.error(error);

    // Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      success: false,
      message: "Email could not be sent",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Hash token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Set new password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
