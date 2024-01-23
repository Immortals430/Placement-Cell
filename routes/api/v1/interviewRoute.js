const express = require('express')
const routes = express.Router()
const interviewController = require('../../../controllers/api/v1/interviewController')


// interview routes
routes.get('/', interviewController.interviewPage)
routes.post('/addInterview', interviewController.addInterview)
routes.post('/addStudent', interviewController.addStudent)
routes.get('/deleteCompany', interviewController.deleteCompany)




module.exports = routes