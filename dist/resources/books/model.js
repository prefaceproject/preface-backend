"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const bookSchema = new _mongoose.default.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  readingLevel: {
    type: String,
    required: true,
    trim: true
  },
  language: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});
bookSchema.index({
  title: 1
}, {
  unique: true
});
bookSchema.index({
  author: 1
}, {
  unique: true
});

var _default = _mongoose.default.model('book', bookSchema);

exports.default = _default;