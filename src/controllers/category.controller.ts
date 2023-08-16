import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createCategoryRoutes } from '@/routes/category.routes';
import { StatusCodes } from 'http-status-codes';
import { categoryService } from '@/services/index';

class CategoryController implements Controller {
    public path = '/category';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const customRoutes: CustomRoutes = createCategoryRoutes(
            this.path,
            this.create,
            this.getCategory,
            this.deleteCategory, // 삭제 라우터 추가
        );
        createRoutes(customRoutes, this.router);
    }

    private create: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const req_data = { ...req.body };

        try {
            const category = await categoryService.create({
                ...req_data,
                category: req_data.category,
                userId: req_data.userId,
            });
            response.success({ code: StatusCodes.CREATED, data: category });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private getCategory: RequestResponseHandler = asyncWrapper(
        async (req, res) => {
            const response = customResponse(res);
            const categoryId = parseInt(req.params.categoryId); // 카테고리 ID를 문자열에서 숫자로 변환

            try {
                const category = await categoryService.getCategory({
                    categoryId,
                });
                response.success({ code: StatusCodes.OK, data: category });
            } catch (err) {
                response.error(err as ErrorData);
            }
        },
    );

    // 카테고리 삭제 라우터
    private deleteCategory: RequestResponseHandler = asyncWrapper(
        async (req, res) => {
            const response = customResponse(res);
            const categoryId = parseInt(req.params.categoryId);
            const userId = parseInt(req.params.userId); // userId도 가져오거나 다른 방식으로 얻어야 합니다.
            await categoryService.deleteCategory({ categoryId, userId });

            try {
                await categoryService.deleteCategory({ categoryId, userId });
                response.success({ code: StatusCodes.NO_CONTENT });
            } catch (err) {
                response.error(err as ErrorData);
            }
        },
    );
}

export default CategoryController;
