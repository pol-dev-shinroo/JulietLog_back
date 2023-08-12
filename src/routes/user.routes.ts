import {
    payloadValidation,
    multerErrorHandling,
    formValidation,
} from '@/middlewares/index';
import { create_user_validation } from '@/validations/index';
import { upload } from '@/utils/multerSetup';

export function createUserRoutes(
    path: string,
    createHandler: RequestResponseHandler,
    getUserHandler: RequestResponseHandler,
): CustomRoutes {
    return {
        create: {
            method: 'post',
            path: `${path}`,
            middleware: [
                upload.single('file'),
                multerErrorHandling,
                formValidation(create_user_validation),
            ],
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
