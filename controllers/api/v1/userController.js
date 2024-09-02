import User from '../../../models/userModel.js';
import bcrypt from 'bcrypt';

// Signup page
export const signinPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/api/v1/dashboard');
    } else {
        res.render("signinPage", { url: req.originalUrl });
    }
};

// Signin page
export const signupPage = (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/api/v1/dashboard');
    } else {
        res.render('signupPage', { url: req.originalUrl });
    }
};

// Signup
export const createAccount = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPass = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password: hashedPass
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating account');
    }
};

// Signin
export const createSession = (req, res) => {
    res.redirect('/api/v1/dashboard');
};

// Logout
export const logout = (req, res) => {
    req.logout(() => res.redirect('/api/v1/user/signin'));
};
