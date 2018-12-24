const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, secretOrKey } = require('./keys');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');



module.exports = passport => {
  passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/users/googleoauth/callback',
      proxy: true
    }, async (accessToken, refreshToken, profile, done) => {

      try {
        const img = profile.photos[0].value;
        const avatar = img.substring(0, img.indexOf('?'));
  
        const newUser = new User ({
          GoogleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          password: profile.id,
          avatar
        });
        //Query the db to check if the user already exist
        const user = await User.findOne({ email: newUser.email });

        if(!user) {
          await newUser.save(); //New user registered
          done(null, user); //Return the new User
        } else {
          if(!user.GoogleId) {
            done(null, false);
          } else {
            done(null, user);
          }
        }
      } catch (error) {
        console.log(error)
      }
    })
  )
}