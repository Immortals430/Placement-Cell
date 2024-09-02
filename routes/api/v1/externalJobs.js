import express from 'express';
import {externalJobPage} from '../../../controllers/api/v1/externalJobsController.js';

const router = express.Router();

// External job routes
router.get('/', externalJobPage);

export default router;
