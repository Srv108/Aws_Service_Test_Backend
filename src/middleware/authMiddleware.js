import { StatusCodes } from "http-status-codes";

import userRepository from '../repository/userRepository.js'
import { customErrorResponse, internalErrorResponse } from "../utils/common/responseObject.js";
import { verifyJwt } from "../utils/jwt/jwtUtils.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        
        const token = req.headers['access-token'];

        if (!token) {
            throw res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    message: 'Token is required'
                })
            );
        }

        const response = await verifyJwt(token);

        if (!response) {
            throw res.status(StatusCodes.BAD_REQUEST).json(
                customErrorResponse({
                    explanation: 'Invalid token sent',
                    message: 'Invalid Token. please try again!'
                })
            );
        }

        const user = await userRepository.getById(response.id);
        req.user = user._id;
        next();
    } catch (error) {
        console.log('Auth middleware error saurav', error);
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(StatusCodes.FORBIDDEN).json(
                customErrorResponse({
                    explanation: 'Invalid data sent from the client',
                    message: 'Invalid auth token provided'
                })
            );
        }
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json(internalErrorResponse(error));
    }
};
