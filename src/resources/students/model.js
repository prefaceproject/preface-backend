import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    readingLevel: {
      type: String,
      trim: true,
      required: true,
    },
    grade: {
      type: String,
      trim: true,
      required: true,
    },
    joinDate: {
      type: Date,
      trim: true,
    },
    school: {
      type: String,
      trim: true,
      required: true,
    },
    classId: {
      type: mongoose.ObjectId,
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'user',
    },
    sessions: {
      type: Array,
      default: [],
    },
    books: {
      type: Array,
      default: [],
    },
    languagesSpoken: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

export default mongoose.model('student', studentSchema)
