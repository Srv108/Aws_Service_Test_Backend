import { StatusCodes } from 'http-status-codes';

import { customErrorResponse } from '../utils/common/responseObject.js';

export const validate = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (error) {
            console.log('Error from Zod validator: ', error);

            let explanation = [];
            let errorMessage = '';

            if (error.errors && Array.isArray(error.errors)) {
                error.errors.forEach((key) => {
                    explanation.push(`${key.path.join('.')} ${key.message}`);
                    errorMessage += ` : ${key.message}`;
                });
            } else {
                console.error('Unexpected error in validation:', error);
                explanation.push(
                    'An unexpected error occurred during validation.'
                );
                errorMessage = error.message || 'Unknown validation error';
            }

            return res.status(StatusCodes.BAD_REQUEST).json(
                customErrorResponse({
                    message: `Validation error${errorMessage}`,
                    explanation
                })
            );
        }
    };
};
