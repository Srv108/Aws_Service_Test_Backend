import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

import userRepository from '../repository/userRepository.js';
import ClientError from '../utils/errors/ClientError.js';
import ValidationError from '../utils/errors/validationError.js';
import { generateToken } from '../utils/jwt/jwtUtils.js';

export const signUpService = async (userObject) => {
    try {
        const newUser = await userRepository.create(userObject);
        return newUser;
    } catch (error) {
        console.log('Error coming in creating new user service', error);
        if (error.name === 'ValidationError') {
            throw new ValidationError(
                {
                    error: error.errors
                },
                error.message
            );
        }
        if (error.name === 'MongoServerError' && error.code === 11000) {
            throw new ValidationError(
                {
                    error: ['A user with same email or username already exists']
                },
                'A user with same email or username already exists'
            );
        }
    }
};

export const signInService = async (userDetails) => {
    try {
        const user = await userRepository.getByEmail(userDetails.email);
        if (!user) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'No registered users  found with this email',
                statusCodes: StatusCodes.NOT_FOUND
            });
        }

        const isValidPassword = bcrypt.compareSync(
            userDetails.password,
            user.password
        );

        if (!isValidPassword) {
            throw new ClientError({
                explanation: 'Invalid data sent from the client',
                message: 'No registered users  found with this email',
                statusCodes: StatusCodes.NOT_FOUND
            });
        }

        const token = await generateToken({
            username: user.username,
            email: user.email,
            id: user._id
        });

        return {
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            token: token,
            id: user._id
        };
    } catch (error) {
        console.log('Error coming in sign in', error);
        throw error;
    }
};
