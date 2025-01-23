import express from 'express';

import userRouter from './v1/user.js';

const router = express.Router();

router.use('/users', userRouter);

export default router;
