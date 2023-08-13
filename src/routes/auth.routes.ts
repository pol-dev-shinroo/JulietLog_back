import {
    payloadValidation,
    multerErrorHandling,
    formValidation,
    tokenMiddleware,
} from '@/middlewares/index';
import { local_login_validation } from '@/validations/index';
import { upload } from '@/utils/multerSetup';

export function createAuthRoutes(
    path: string,
    loginhandler: RequestResponseHandler,
): CustomRoutes {
    return {
        create: {
            method: 'post',
            path: `${path}/login`,
            middleware: [
                payloadValidation(local_login_validation),
                // tokenMiddleware(),
            ],
            handler: loginhandler,
        },
    };
}
