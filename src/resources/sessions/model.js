import mongoose from 'mongoose'
import { Student } from '../'

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
    comprehensionLevel: {
      type: mongoose.SchemaTypes.Number,
      required: true,
    },
    date: {
      type: mongoose.SchemaTypes.Date,
      required: true,
    },
  },
  { timestamps: true }
)

sessionSchema.post('save', async function () {
  await Student.updateOne(
    { _id: this.studentId },
    { $push: { sessions: this._id } }
  )
})

sessionSchema.post('findOneAndDelete', async function (session) {
  await Student.updateOne(
    { _id: session.studentId },
    { $pull: { sessions: session._id } }
  )
})

export default mongoose.model('session', sessionSchema)
