import { payloadValidation } from '@/middlewares/index';
import { create_user_validation } from '@/validations/index';

export function createUserRoutes(
    path: string,
    createHandler: RequestResponseHandler,
    getUserHandler: RequestResponseHandler,
): CustomRoutes {
    return {
        create: {
            method: 'post',
            path: `${path}`,
            middleware: [payloadValidation(create_user_validation)],
            handler: createHandler,
        },
        getUser: {
            method: 'get',
            path: `${path}`,
            middleware: [],
            handler: getUserHandler,
        },
    };
}
