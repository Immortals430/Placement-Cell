import express from 'express';
import path from 'path';
import passport from 'passport';
import {signinPage, signupPage, createAccount,createSession, logout} from '../../../controllers/api/v1/userController.js';

const router = express.Router();

// User auth routes
router.get('/signin', signinPage);
router.get('/signup', signupPage);
router.post('/createAccount', createAccount);
router.post('/createSession', passport.authenticate('local', { failureRedirect: '/api/v1/user/signup' }), createSession);
router.get('/logout', logout);

export default router;
