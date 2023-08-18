import {
    payloadValidation,
    multerErrorHandling,
    formValidation,
} from '@/middlewares/index';
import { post_create_validation } from '@/validations/index';
import { upload } from '@/utils/multerSetup';

export function createPostsRoutes(
    path: string,
    createHandler: RequestResponseHandler,
): CustomRoutes {
    return {
        create: {
            method: 'get',
            path: `${path}`,
            middleware: [payloadValidation(post_create_validation)],
            handler: createHandler,
        },
    };
}
