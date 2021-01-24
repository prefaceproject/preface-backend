import { Router } from 'express'
import mongoose from 'mongoose'
import passport from 'passport'

const User = mongoose.model('user');

const router = Router()

router.post('/initialize', (req, res, next) => {
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

  return finalUser.save()
    .then(() => res.json({ user: finalUser }));
});

router.post('/register', (req, res, next) => {
  const { body: { user } } = req;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  //email read in db
  const fetchedUser = User.findOne({email: user.email}, (err, res) => {
    // if (!res) {
    //   res.send("error")
    // }
  })

  // console.log(fetchedUser)

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

  res.send({ express: 'Test call to backend' })
});


export default router
