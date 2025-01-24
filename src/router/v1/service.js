import express from 'express';

import { metricsDataApi, networkDatasApi, paymentsApi, subscriptionsApi } from '../../contoller/testController.js';
import { isAuthenticated } from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/metrics',isAuthenticated,metricsDataApi);
router.get('/payments',isAuthenticated,paymentsApi);
router.get('/network',isAuthenticated,networkDatasApi);
router.get('/subscription',isAuthenticated,subscriptionsApi);
router.get('/ping',isAuthenticated,subscriptionsApi);

export default router;