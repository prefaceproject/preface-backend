"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Book", {
  enumerable: true,
  get: function () {
    return _model.default;
  }
});
Object.defineProperty(exports, "Session", {
  enumerable: true,
  get: function () {
    return _model2.default;
  }
});
Object.defineProperty(exports, "Student", {
  enumerable: true,
  get: function () {
    return _model3.default;
  }
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function () {
    return _model4.default;
  }
});
exports.connectDb = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _model = _interopRequireDefault(require("./books/model"));

var _model2 = _interopRequireDefault(require("./sessions/model"));

var _model3 = _interopRequireDefault(require("./students/model"));

var _model4 = _interopRequireDefault(require("./users/model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const connectDb = () => {
  return _mongoose.default.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
  });
};

exports.connectDb = connectDb;