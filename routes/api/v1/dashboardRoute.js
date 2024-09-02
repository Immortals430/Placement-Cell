import express from 'express';
import { dashBoard, addStudent } from '../../../controllers/api/v1/dashboardController.js';

const router = express.Router();

// Dashboard routes
router.get('/', dashBoard);
router.post('/addStudent', addStudent);

export default router;
