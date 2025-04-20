import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notice title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Notice description is required']
    },
    date: {
      type: Date,
      default: Date.now
    },
    category: {
      type: String,
      enum: ['general', 'academic', 'exam', 'event', 'holiday', 'admission', 'other'],
      default: 'general'
    },
    important: {
      type: Boolean,
      default: false
    },
    attachmentUrl: {
      type: String
    },
    forClass: {
      type: [String],
      default: ['all'] // 'all' or specific classes ['1', '2', '3', etc.]
    },
    publishedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    expiresOn: {
      type: Date
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

// Index for faster queries
noticeSchema.index({ category: 1, date: -1 });
noticeSchema.index({ important: 1 });
noticeSchema.index({ forClass: 1 });

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;