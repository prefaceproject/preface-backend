"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _mongoose.default.model('user');

const router = (0, _express.Router)();
router.post('/initialize' // , auth.optional
, async (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      success: false,
      errors: {
        email: 'is required'
      }
    });
  }

  if (!user.role) {
    return res.status(422).json({
      success: false,
      errors: {
        role: 'is required'
      }
    });
  }

  const query = await User.find({
    email: user.email
  });

  if (query.length != 0) {
    return res.status(422).json({
      success: false,
      errors: {
        email: 'already exists'
      }
    });
  }

  const finalUser = new User(user); //   finalUser.setPassword(user.password);

  return finalUser.save().then(() => res.json({
    user: finalUser.toAuthJSON()
  })).then(() => res.send({
    success: true,
    message: 'initialize done'
  })).catch(e => res.status(422).json({
    success: false,
    errors: e,
    message: 'error saving user'
  }));
});
var _default = router;
exports.default = _default;