import express from 'express';

import serviceRouter from './v1/service.js';
import userRouter from './v1/user.js';

const router = express.Router();

router.use('/users', userRouter);
router.use('/service',serviceRouter);

export default router;
