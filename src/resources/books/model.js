import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    readingLevel: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

bookSchema.index({ title: 1 }, { unique: true })
bookSchema.index({ author: 1 }, { unique: true })

export default mongoose.model('book', bookSchema)
