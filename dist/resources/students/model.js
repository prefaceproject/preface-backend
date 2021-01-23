"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const studentSchema = new _mongoose.default.Schema({
  firstName: {
    type: String,
    trim: true,
    required: true
  },
  lastName: {
    type: String,
    trim: true,
    required: true
  },
  readingLevel: {
    type: String,
    trim: true,
    required: true
  },
  grade: {
    type: String,
    trim: true,
    required: true
  },
  joinDate: {
    type: Date,
    trim: true,
    required: true
  },
  school: {
    type: String,
    trim: true,
    required: true
  },
  classId: {
    type: _mongoose.default.ObjectId,
    required: true
  },
  userId: {
    type: _mongoose.default.ObjectId,
    ref: 'user',
    required: true
  },
  sessions: {
    type: Array,
    default: []
  },
  books: {
    type: Array,
    default: []
  },
  languagesSpoken: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model('student', studentSchema);

exports.default = _default;