import { Router } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import auth from './auth'

const User = mongoose.model('user');

const router = Router()


router.post('/initialize'
// , auth.optional
, async (req, res, next) => {

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


export default router
