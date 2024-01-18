const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { connectToDatabase } = require('./db');

const initializePassport = async () => {
  const User = await connectToDatabase();

  passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return done(null, false, { message: 'Incorrect email' });
      }
  
      // Check password (use a secure method like bcrypt for this)
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
  
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
  

  passport.serializeUser((user, done) => {
    done(null, { id: user.id, username: user.username });
  });
  
  passport.deserializeUser(async (serializedUser, done) => {
    try {
      const user = await User.findById(serializedUser.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = initializePassport;