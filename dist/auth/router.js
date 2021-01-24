"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const crypto = require('crypto');

const User = _mongoose.default.model('user');

const router = (0, _express.Router)();
router.post('/initialize', async (req, res, next) => {
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
router.post('/register', async (req, res, next) => {
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

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  if (!user.firstName) {
    return res.status(422).json({
      errors: {
        firstName: 'is required'
      }
    });
  }

  if (!user.lastName) {
    return res.status(422).json({
      errors: {
        lastName: 'is required'
      }
    });
  }

  const query = await User.find({
    email: user.email
  });

  if (query.length == 0) {
    return res.status(422).json({
      success: false,
      errors: {
        email: 'not registered'
      }
    });
  }

  if (!query[0].isActive) {
    return res.status(422).json({
      success: false,
      errors: {
        user: 'not active'
      }
    });
  }

  if (query[0].isRegistered) {
    return res.status(422).json({
      success: false,
      errors: {
        user: 'already registered'
      }
    });
  }

  const {
    salt,
    hash
  } = setPassword(user.password);
  return User.updateOne({
    _id: query[0]._id
  }, {
    firstName: user.firstName,
    lastName: user.lastName,
    isRegistered: true,
    salt: salt,
    hash: hash
  }).then(() => res.send({
    success: true,
    message: 'registration done'
  })).catch(e => res.status(422).json({
    success: false,
    errors: e,
    message: 'error registering user'
  }));
});
router.post('/login', async (req, res, next) => {
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

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required'
      }
    });
  }

  const query = await User.find({
    email: user.email
  });

  if (query.length == 0) {
    return res.status(422).json({
      success: false,
      errors: {
        email: 'incorrect email'
      }
    });
  }

  if (!query[0].isActive) {
    return res.status(422).json({
      success: false,
      errors: {
        user: 'not active'
      }
    });
  }

  if (!query[0].isRegistered) {
    return res.status(422).json({
      success: false,
      errors: {
        user: 'not registered'
      }
    });
  }

  if (!query[0].validatePassword(user.password)) {
    return res.status(422).json({
      success: false,
      errors: {
        password: 'incorrect password'
      }
    });
  }

  res.send({
    success: true,
    user: query[0].toAuthJSON()
  });
});

function setPassword(password) {
  let saltAndHash = {};
  saltAndHash.salt = crypto.randomBytes(16).toString('hex');
  saltAndHash.hash = crypto.pbkdf2Sync(password, saltAndHash.salt, 10000, 512, 'sha512').toString('hex');
  return saltAndHash;
}

;
var _default = router;
exports.default = _default;