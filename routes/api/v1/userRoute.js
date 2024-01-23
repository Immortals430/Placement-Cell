const express = require('express')
const routes = express.Router()
const userController = require('../../../controllers/api/v1/userController')
const passport = require('passport')


// user auth routes
routes.get('/signin', userController.signinPage)
routes.get('/signup', userController.signupPage)
routes.post('/createAccount', userController.createAccount)
routes.post('/createSession', passport.authenticate('local', { failureRedirect: '/api/v1/user/signup'}) , userController.createSession)
routes.get('/logout', userController.logout)


module.exports = routes