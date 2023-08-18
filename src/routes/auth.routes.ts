import {
    payloadValidation,
    multerErrorHandling,
    formValidation,
    tokenMiddleware,
} from '@/middlewares/index';
import {
    local_login_validation,
    google_login_validation,
} from '@/validations/index';
import { upload } from '@/utils/multerSetup';

export function createAuthRoutes(
    path: string,
    localLoginhandler: RequestResponseHandler,
    googleLogin: RequestResponseHandler,
): CustomRoutes {
    return {
        localLogin: {
            method: 'post',
            path: `${path}/login`,
            middleware: [
                payloadValidation(local_login_validation),
                tokenMiddleware(),
            ],
            handler: localLoginhandler,
        },
        googleLogin: {
            method: 'post',
            path: `${path}/googlelogin`,
            middleware: [payloadValidation(google_login_validation)],
            handler: googleLogin,
        },
    };
}
