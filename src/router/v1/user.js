import express from 'express';

import {
    signInController,
    signUpController
} from '../../contoller/userController.js';
import {userSignInSchema, userSignUpSchema} from '../../validator/userSchema.js';
import { validate } from '../../validator/zodValidator.js';

const router = express.Router();

router.post('/signup',validate(userSignUpSchema), signUpController);
router.post('/signin', validate(userSignInSchema), signInController);

export default router;
