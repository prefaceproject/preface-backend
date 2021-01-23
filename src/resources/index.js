import mongoose from 'mongoose'

import Book from './books/model'
import Session from './sessions/model'
import Student from './students/model'
import User from './users/model'

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
}

export { connectDb }

export { Book, Session, Student, User }
