import express from 'express';
import {interviewPage,addInterview,addStudent,deleteCompany } from '../../../controllers/api/v1/interviewController.js';

const router = express.Router();

// Interview routes
router.get('/', interviewPage);
router.post('/addInterview', addInterview);
router.post('/addStudent', addStudent);
router.get('/deleteCompany', deleteCompany);

export default router;
