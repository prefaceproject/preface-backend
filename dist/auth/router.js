"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _mongoose.default.model('user');

const router = (0, _express.Router)();
router.post('/initialize', (req, res, next) => {
  console.log(req.body);
  const {
    body: {
      user
    }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  }

  if (!user.role) {
    return res.status(422).json({
      errors: {
        role: 'is required'
      }
    });
  }

  const finalUser = new User(user);
  return finalUser.save().then(() => res.json({
    user: finalUser
  }));
});
router.post('/register', (req, res, next) => {
  const {
    body: {
      user
    }
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required'
      }
    });
  } //email read in db


  const fetchedUser = User.findOne({
    email: user.email
  }, (err, res) => {// if (!res) {
    //   res.send("error")
    // }
  }); // console.log(fetchedUser)
  // if(!user.password) {
  //   return res.status(422).json({
  //     errors: {
  //       password: 'is required',
  //     },
  //   });
  // }
  // // first name check
  // if(!user.firstName) {
  //   return res.status(422).json({
  //     errors: {
  //       firstName: 'is required',
  //     },
  //   });
  // }
  // // last name check
  // if(!user.lastName) {
  //   return res.status(422).json({
  //     errors: {
  //       lastName: 'is required',
  //     },
  //   });
  // }
  // // isRegistered check
  // if(user.isRegistered) {
  //   return res.status(422).json({
  //     errors: {
  //       isRegistered: 'is true',
  //     },
  //   });
  // }
  // // isActive check
  // if(!user.isActive) {
  //   return res.status(422).json({
  //     errors: {
  //       isActive: 'is false',
  //     },
  //   });
  // }
  //save updates to user object
  // return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
  //   if(err) {
  //     return next(err);
  //   }
  //   if(passportUser) {
  //     const user = passportUser;
  //     return res.json({ auth: 'success', user: user });
  //   }
  //   return res.json({ auth: 'failure' });
  // })(req, res, next);

  res.send({
    express: 'Test call to backend'
  });
});
var _default = router;
exports.default = _default;