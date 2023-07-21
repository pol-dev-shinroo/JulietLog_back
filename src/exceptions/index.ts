import { StatusCodes } from 'http-status-codes';

export const dbException = (error: any) => {
    throw {
        code: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'something wrong with the server',
        error,
    };
};

export const NotFoundException = (table_name: string) => {
    throw {
        code: StatusCodes.NOT_FOUND,
        message: `${table_name} does not exist`,
    };
};
