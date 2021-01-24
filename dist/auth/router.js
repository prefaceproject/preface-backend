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
, (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  if (!user.email) {
    const query = User.find({
      email: user.email
    });

    if (query.length != 0) {
      return res.status(422).json({
        errors: {
          email: 'already exists'
        }
      });
    }
  }

  if (!user.role) {
    return res.status(422).json({
      errors: {
        role: 'is required'
      }
    });
  }

  const finalUser = new User(user); //   finalUser.setPassword(user.password);
  //   return finalUser.save()
  //     .then(() => res.json({ user: finalUser.toAuthJSON() }));

  res.send({
    express: 'initialize done'
  });
});
var _default = router;
exports.default = _default;