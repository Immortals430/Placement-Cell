const express = require('express')
const routes = express.Router()
const dashBoardController = require('../controllers/api/v1/dashboardController')

routes.use('/api', require('./api'))
routes.get('/', dashBoardController.root)


module.exports = routes