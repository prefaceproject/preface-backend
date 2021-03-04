import mongoose, { SchemaTypes } from 'mongoose'

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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
      type: [{ type : mongoose.ObjectId, ref: 'student' }],
      default: [],
      ref: 'student',
    },
  },
  { timestamps: true }
)

userSchema.methods.validatePassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, "test");
}

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
    firstName: this.firstName,
    lastName: this.lastName,
    isActive: this.isActive,
    role: this.role,
    students: this.students,
    school: this.school,
    languagesSpoken: this.languagesSpoken
  };
};

export default mongoose.model('user', userSchema)
