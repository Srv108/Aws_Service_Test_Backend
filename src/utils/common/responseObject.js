export const customErrorResponse = (error) => {
    if (!error.message && !error.explanation) {
        return internalErrorResponse(error);
    }
    return {
        success: false,
        message: error.message,
        err: error.explanation,
        data: {}
    };
};

export const successResponse = (data, message) => {
    return {
        success: true,
        message,
        data,
        err: {}
    };
};

export const internalErrorResponse = (error) => {
    return {
        success: false,
        err: error,
        data: {},
        message: 'Internal Server Error'
    };
};
