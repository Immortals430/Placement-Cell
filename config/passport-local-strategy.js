const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy({
  usernameField: 'email'
},
async function(email, password, done){
  try{
    let user = await User.findOne({ email })
    let result = bcrypt.compare(password, user.password);

    if (!user || !result) return done(null, false);    
    return done(null, user);
  }
  catch(err) { console.log(err); return done(err); }
}
))


  passport.serializeUser((user, done) => {  // determine what user information should be stored in the session
    done(null, user.id);  // serialize the user object into a format that can be stored in the session
  });

  passport.deserializeUser(async (id, done) => {  // retrieve the user object from the session everytime it called and deserialize it
    let user = await User.findById(id)
    return done(null, user)
  });



  passport.checkAuthentication = (req, res, next)=>{
    if(req.isAuthenticated()){  // if user is authenticated pass req to controller
      return next();
    }
    return res.redirect('/api/v1/user/signin')
  }

  passport.setAuthenticatedUser = (req, res, next)=>{
    if(req.isAuthenticated()){
      res.locals.user = req.user  // check user session whenever server start and set user session to local
    }
    next();
  }

  


module.exports = passport