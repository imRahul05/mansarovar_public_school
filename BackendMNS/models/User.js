import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { validators } from "tailwind-merge";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      select: false, // Exclude password from queries by default
      minlength: [6, "Password must be at least 6 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      ],
    },
    customID: {
      type: String,
      unique: true,
      sparse: true, // allows null values to not conflict with uniqueness
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin", "superadmin"],
      default: "student",
      required: [true, "Role is required"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    contactNumber: {
      type: String,
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });
userSchema.index({ isVerified: 1 });
userSchema.index({ createdAt: 1 });
userSchema.index({ updatedAt: 1 });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ customID: 1 }, { unique: true, sparse: true });

// Method to check if password matches
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);
    // Hash password
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
