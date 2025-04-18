import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    employeeId: {
      type: String,
      required: true,
      unique: true
    },
    designation: {
      type: String,
      required: true
    },
    subjectsSpecialization: [{
      type: String,
      required: true
    }],
    classTeacherOf: {
      class: String,
      section: String
    },
    qualification: {
      type: String,
      required: true
    },
    experience: {
      years: Number,
      details: String
    },
    dateOfJoining: {
      type: Date,
      default: Date.now,
      required: true
    },
    dateOfBirth: {
      type: Date
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    emergencyContactName: {
      type: String
    },
    emergencyContactNumber: {
      type: String
    },
    emergencyContactRelation: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Create Teacher model
const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;