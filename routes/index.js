import express from 'express';
import { root } from '../controllers/api/v1/dashboardController.js';
import apiRoutes from './api/index.js';

const router = express.Router();

router.use('/api', apiRoutes);
router.get('/', root);

export default router;
