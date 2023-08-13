import { StatusCodes } from 'http-status-codes';

export const dbException = (error: any) => {
    throw {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'something wrong with the server',
        error,
    };
};

export const NotFoundException = (msg: string) => {
    throw {
        code: StatusCodes.NOT_FOUND,
        message: msg,
    };
};

export const cloudinaryException = (error: any) => {
    throw {
        code: StatusCodes.BAD_REQUEST,
        message: 'something wrong with cloudinary',
        error: 'invalid file',
    };
};

export const UnauthorizedException = (message: any) => {
    throw {
        code: StatusCodes.BAD_REQUEST,
        message: message,
        error: 'validation error',
    };
};
