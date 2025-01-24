import { StatusCodes } from "http-status-codes";

import { metricsData, networkData, paymentData, subscriptionData } from "../utils/common/responseData.js";

export const metricsDataApi = (req,res)=>{

    console.log('hitting the apis ....');
    return res.status(StatusCodes.OK).json({
        success: true,
        messgae: 'User created successfully',
        data: metricsData
    });
}

export const subscriptionsApi = (req,res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        messgae: 'User created successfully',
        data: subscriptionData
    });
}

export const paymentsApi = (req,res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        messgae: 'User created successfully',
        data: paymentData
    });
}


export const networkDatasApi = (req,res) => {
    return res.status(StatusCodes.OK).json({
        success: true,
        messgae: 'User created successfully',
        data: networkData
    });
}