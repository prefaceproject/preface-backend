import { Router } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

const User = mongoose.model('user');

const router = Router()


router.post('/initialize', async (req, res, next) => {

  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      success: false,
      errors: { email: 'is required',},
    });
  }

  if(!user.role) {
    return res.status(422).json({
      success: false,
      errors: {
        role: 'is required',
      },
    });
  }

  const query = await User.find({email: user.email});
  if (query.length != 0){
    return res.status(422).json({
      success: false,
      errors: { email: 'already exists',},
    });
  }


  const finalUser = new User(user);


//   finalUser.setPassword(user.password);
  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }))
    .then(() => res.send({ success: true, message: 'initialize done' }))
    .catch((e) => res.status(422).json({ success: false, errors: e, message: 'error saving user' }))
});


router.post('/register', async (req, res, next) => {
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

  if(!user.firstName) {
    return res.status(422).json({
      errors: {
        firstName: 'is required',
      },
    });
  }

  if(!user.lastName) {
    return res.status(422).json({
      errors: {
        lastName: 'is required',
      },
    });
  }

  const query = await User.find({email: user.email});
  if (query.length == 0){
    return res.status(422).json({
      success: false,
      errors: { email: 'not registered',},
    });
  }

  if (!query[0].isActive) {
    return res.status(422).json({
      success: false,
      errors: { user: 'not active',},
    });
  }

  if (query[0].isRegistered) {
    return res.status(422).json({
      success: false,
      errors: { user: 'already registered',},
    });
  }

  //salt and hash, then save
  res.send({ express: 'Test call to backend' })
})


export default router
