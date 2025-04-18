import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Event description is required']
    },
    shortDescription: {
      type: String,
      maxlength: [200, 'Short description cannot exceed 200 characters']
    },
    date: {
      type: Date,
      required: [true, 'Event date is required']
    },
    endDate: {
      type: Date
    },
    time: {
      type: String
    },
    location: {
      type: String
    },
    category: {
      type: String,
      enum: ['cultural', 'sports', 'academic', 'celebration', 'competition', 'other'],
      default: 'other'
    },
    featured: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
    },
    gallery: [{
      url: String,
      caption: String,
      order: Number
    }],
    forClass: {
      type: [String],
      default: ['all'] // 'all' or specific classes ['1', '2', '3', etc.]
    },
    organizer: {
      type: String
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      name: String,
      class: String,
      section: String,
      registeredAt: {
        type: Date,
        default: Date.now
      },
      attended: {
        type: Boolean,
        default: false
      }
    }],
    isActive: {
      type: Boolean,
      default: true
    },
    registrationRequired: {
      type: Boolean,
      default: false
    },
    registrationDeadline: {
      type: Date
    },
    maxParticipants: {
      type: Number
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming'
    },
    results: [{
      position: String,
      studentName: String,
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
      },
      class: String,
      section: String
    }],
    attachments: [{
      name: String,
      fileUrl: String,
      fileType: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    notifyParents: {
      type: Boolean,
      default: true
    },
    notificationSent: {
      type: Boolean,
      default: false
    },
    reminderDate: {
      type: Date
    },
    feedback: [{
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      name: String,
      comment: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for checking if event is upcoming
eventSchema.virtual('isUpcoming').get(function() {
  return new Date(this.date) > new Date();
});

// Virtual for checking if registration is open
eventSchema.virtual('isRegistrationOpen').get(function() {
  if (!this.registrationRequired) return false;
  if (!this.registrationDeadline) return new Date(this.date) > new Date();
  return new Date(this.registrationDeadline) > new Date();
});

// Virtual for checking if event has available slots
eventSchema.virtual('hasAvailableSlots').get(function() {
  if (!this.maxParticipants) return true;
  return this.participants.length < this.maxParticipants;
});

// Method to update event status based on dates
eventSchema.methods.updateStatus = function() {
  const now = new Date();
  const eventDate = new Date(this.date);
  const eventEndDate = this.endDate ? new Date(this.endDate) : null;

  if (this.status === 'cancelled') return;

  if (eventEndDate && now > eventEndDate) {
    this.status = 'completed';
  } else if (now >= eventDate && (!eventEndDate || now <= eventEndDate)) {
    this.status = 'ongoing';
  } else {
    this.status = 'upcoming';
  }
};

// Pre-save hook to update status
eventSchema.pre('save', function(next) {
  this.updateStatus();
  next();
});

// Indexes for faster queries
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ forClass: 1 });
eventSchema.index({ status: 1 });
eventSchema.index({ featured: 1 });

const Event = mongoose.model('Event', eventSchema);

export default Event;