import { payloadValidation, formValidation } from '@/middlewares/index';
import {
    create_category_validation,
    delete_category_validation,
} from '@/validations/index';

export function createCategoryRoutes(
    path: string,
    createCategoryHandler: RequestResponseHandler,
    getCategoryHandler: RequestResponseHandler,
    deleteCategoryHandler: RequestResponseHandler,
): CustomRoutes {
    return {
        createCategory: {
            method: 'post',
            path: `${path}`,
            middleware: [payloadValidation(create_category_validation)],
            handler: createCategoryHandler,
        },
        getCategory: {
            method: 'get',
            path: `${path}/get`,
            middleware: [],
            handler: getCategoryHandler,
        },
        deleteCategory: {
            method: 'delete',
            path: `${path}/delete`,
            middleware: [formValidation(delete_category_validation)],
            handler: deleteCategoryHandler,
        },
    };
}
