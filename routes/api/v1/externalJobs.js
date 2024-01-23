const express = require('express')
const externalJobsController = require('../../../controllers/api/v1/externalJobsController')
const routes = express.Router()

// external job routes
routes.get('/', externalJobsController.externalJobPage)


module.exports = routes