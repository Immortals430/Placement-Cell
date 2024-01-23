const express = require('express')
const passport = require('passport')
const routes = express.Router()
const downloadController = require('../../../controllers/api/v1/downloadController')

routes.use('/user', require('./userRoute'))
routes.use('/dashboard', passport.checkAuthentication , require('./dashboardRoute'))
routes.use('/interview', passport.checkAuthentication, require('./interviewRoute'))
routes.use('/externalJobs', require('./externalJobs'))
routes.use('/download', passport.checkAuthentication, downloadController.download)



module.exports = routes