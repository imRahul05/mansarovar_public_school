import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    admissionNumber: {
      type: String,
      required: true,
      unique: true
    },
    class: {
      type: String,
      required: true,
      enum: ['Nursery', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
    },
    section: {
      type: String,
      required: true
    },
    rollNumber: {
      type: Number,
      required: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    bloodGroup: {
      type: String
    },
    fatherName: {
      type: String,
      required: true
    },
    motherName: {
      type: String,
      required: true
    },
    parentContactNumber: {
      type: String,
      required: true
    },
    parentEmail: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
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
    admissionDate: {
      type: Date,
      default: Date.now
    },
    previousSchool: {
      type: String
    },
    academicYear: {
      type: String,
      required: true
    },
    medicalConditions: {
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

// Virtual for full name
studentSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Create Student model
const Student = mongoose.model('Student', studentSchema);

export default Student;