import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema(
  {
    notes: {
      type: String,
      trim: true,
    },
    bookId: {
      type: mongoose.ObjectId,
      ref: 'book',
    },
    userId: {
      type: mongoose.ObjectId,
      ref: 'user',
      required: true,
    },
    studentId: {
      type: mongoose.ObjectId,
      ref: 'student',
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('session', sessionSchema)
