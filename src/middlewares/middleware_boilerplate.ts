import { Request, Response, NextFunction, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { customResponse } from '@/common/index';

const middlewareBoilerPlate = (): RequestHandler => {
    return async (req, res, next) => {
        const response = customResponse(res);
        try {
            // write your logic here...
            next();
        } catch (err) {
            response.error(err as ErrorData);
        }
    };
};

export default middlewareBoilerPlate;
