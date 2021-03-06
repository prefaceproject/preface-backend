import { Router } from 'express'
import mongoose from 'mongoose'
const crypto = require('crypto');

const User = mongoose.model('user');

const router = Router()
import auth from "./auth"

router.post('/register', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.json({
      success: false,
      errors: 'email: is required'
    });
  }

  if(!user.password) {
    return res.json({
      success: false,
      errors: 'password is required'
    });
  }

  if(!user.firstName) {
    return res.json({
      success: false,
      errors: 'firstName is required'
    });
  }

  if(!user.lastName) {
    return res.json({
      success: false,
      errors: 'lastName is required'
    });
  }

  const query = await User.find({email: user.email});
  if (query.length == 0){
    return res.json({
      success: false,
      errors: 'email not registered'
    });
  }

  if (!query[0].isActive) {
    return res.json({
      success: false,
      errors: 'user not active'
    });
  }

  if (query[0].isRegistered) {
    return res.json({
      success: false,
      errors: 'user already registered'
    });
  }

  const {salt, hash} = setPassword(user.password)

  return User.updateOne({_id: query[0]._id}, {
    firstName: user.firstName,
    lastName: user.lastName,
    isRegistered: true,
    salt: salt,
    hash: hash
  })
  .then(() => res.send({ success: true, user: query[0].toAuthJSON() }))
  .catch((e) => res.json({ success: false, errors: e, message: 'error registering user' }))
});

router.post('/login', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const query = await User.find({email: user.email}).populate('students');
  if (query.length == 0){
    return res.status(422).json({
      success: false,
      errors: { email: 'incorrect email',},
    });
  }

  if (!query[0].isActive) {
    return res.status(422).json({
      success: false,
      errors: { user: 'not active',},
    });
  }

  if (!query[0].isRegistered) {
    return res.status(422).json({
      success: false,
      errors: { user: 'not registered',},
    });
  }

  if (!query[0].validatePassword(user.password)) {
    return res.status(422).json({
      success: false,
      errors: { password: 'incorrect password',},
    });
  }

  res.send({ success: true, user: query[0].toAuthJSON() });
});

function setPassword(password) {
  let saltAndHash = {}
  saltAndHash.salt = crypto.randomBytes(16).toString('hex');
  saltAndHash.hash = crypto.pbkdf2Sync(password, saltAndHash.salt, 10000, 512, 'sha512').toString('hex');
  return saltAndHash
};

router.post('/updatepassword', auth.optional, async (req, res, next) => {
  const { body: { user } } = req; 
  
  const query = await User.find({email: user.email});

  if (!query[0].validatePassword(user.password)) {
    return res.send({
      success: false,
      message: "Incorrect password entered",
    });
  }

  const {salt, hash} = setPassword(user.newPassword)

  return User.updateOne({_id: query[0]._id}, {
    salt: salt,
    hash: hash
  })
  .then(() => res.send({ success: true, message: "Successfully updated password!"}))
  .catch((e) => res.status(422).json({ success: false, errors: e, message: "Error updating password" }))

});

router.post('/resetuserpassword', auth.optional, async (req, res, next) => {
  const { body: { adminUser,  user} } = req; 

  const adminQuery = await User.find({email: adminUser.email});
  if (adminQuery[0].role !== 'admin') {
    return res.send({
      success: false,
      message: "Only admins are eligible to reset passwords",
    });
  }

  const query = await User.find({email: user.email});
  const {salt, hash} = setPassword(user.newPassword)

  return User.updateOne({_id: query[0]._id}, {
    salt: salt,
    hash: hash
  })
  .then(() => res.send({ success: true, message: "Successfully reset password!"}))
  .catch((e) => res.status(422).json({ success: false, errors: e, message: "Error resetting password" }))

});

router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  console.log(id)
  return User.findById(id).populate('students')
    .then((user) => {
      if(!user) {
        return res.sendStatus(400).json({success: false});
      }

      return res.json({ success: true, user: user.toAuthJSON() });
    });
});



export default router
