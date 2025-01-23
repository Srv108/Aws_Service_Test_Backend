import { StatusCodes } from 'http-status-codes';

import { signInService, signUpService } from '../service/userService.js';
import {
    customErrorResponse,
    internalErrorResponse
} from '../utils/common/responseObject.js';

export const signUpController = async (req, res) => {
    try {
        const response = await signUpService(req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            messgae: 'User created successfully',
            data: response
        });
    } catch (error) {
        console.log('Controller layer error ', error);
        if (error.statusCodes) {
            return res
                .status(error.statusCodes)
                .json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
};

export const signInController = async (req, res) => {
    try {
        const response = await signInService(req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            messgae: 'User signed in successfully',
            data: response
        });
    } catch (error) {
        console.log('Controller layer error ', error);
        if (error.statusCodes) {
            return res
                .status(error.statusCodes)
                .json(customErrorResponse(error));
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
};
