"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const sessionSchema = new _mongoose.default.Schema({
  notes: {
    type: String,
    trim: true
  },
  bookId: {
    type: _mongoose.default.ObjectId,
    ref: 'book'
  },
  userId: {
    type: _mongoose.default.ObjectId,
    ref: 'user',
    required: true
  },
  studentId: {
    type: _mongoose.default.ObjectId,
    ref: 'student',
    required: true
  }
}, {
  timestamps: true
});

var _default = _mongoose.default.model('session', sessionSchema);

exports.default = _default;