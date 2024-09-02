import express from 'express';
import passport from 'passport';

import userRoutes from './userRoute.js';
import dashboardRoutes from './dashboardRoute.js';
import interviewRoutes from './interviewRoute.js';
import externalJobsRoutes from './externalJobs.js';
import { download } from "../../../controllers/api/v1/downloadController.js"

const router = express.Router();

router.use('/user', userRoutes);
router.use('/dashboard', passport.checkAuthentication, dashboardRoutes);
router.use('/interview', passport.checkAuthentication, interviewRoutes);
router.use('/externalJobs', externalJobsRoutes);
router.use('/download', passport.checkAuthentication, download);

export default router;
