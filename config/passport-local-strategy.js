import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false);

        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        return done(null, user);
    } catch (err) {
        console.error(err);
        return done(err);
    }
});

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/api/v1/user/signin');
};

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

export default passport;
