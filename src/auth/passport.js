/*
Passport.js functions as the middleware that authenticates the user information.
If authentication is successful, the user object is returned. If authentication is unsuccessful, null is returned with an error JSON object.
LocalStrategy has the functionality of checking the usernameField and the passwordField to authenticate user information.
The user model is imported to access the User Schema as a way to find the desired user object.
*/

import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local');
const User = mongoose.model('user');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  User.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));

module.exports = passport;