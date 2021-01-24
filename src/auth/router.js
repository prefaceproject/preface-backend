import { Router } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import auth from './auth'

const User = mongoose.model('user');

const router = Router()


router.post('/initialize'
// , auth.optional
, (req, res, next) => {

  const { body: { user } } = req;

  if(!user.email) {
    const query = User.find({email: user.email});
    if (query.length != 0){
      return res.status(422).json({
        errors: { email: 'already exists',},

      });
    }

    }


  if(!user.role) {
    return res.status(422).json({
      errors: {
        role: 'is required',
      },
    });
  }



  const finalUser = new User(user);


//   finalUser.setPassword(user.password);

//   return finalUser.save()
//     .then(() => res.json({ user: finalUser.toAuthJSON() }));

  res.send({ express: 'initialize done' })
});


export default router
