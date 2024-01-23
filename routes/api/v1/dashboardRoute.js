const express = require('express');
const routes = express.Router();
const dashBoardController = require('../../../controllers/api/v1/dashboardController');

// dashboard routes
routes.get('/', dashBoardController.dashBoard);
routes.post('/addStudent', dashBoardController.addStudent)


module.exports = routes;