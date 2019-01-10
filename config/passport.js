const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const { secretOrKey } = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      
      const user = await User.findById(jwt_payload.id);

      if(!user) {
        return done(null, false);
      } 

      //If user is found return the user 
      return done(null, user);

    } catch (error) {
      console.error(error);
    }
    
  }));
}
