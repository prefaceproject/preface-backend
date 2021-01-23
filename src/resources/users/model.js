import mongoose, { SchemaTypes } from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    school: {
      type: String,
    },
    role: {
      type: String,
      enum: ['ambassador', 'admin', 'teacher'],
      default: 'ambassador',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    languagesSpoken: {
      type: Array,
      default: [],
    },
    hash: {
      type: String,
    },
    salt: {
      type: String,
    },
    students: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

export default mongoose.model('user', userSchema)
