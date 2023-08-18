import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createPostsRoutes } from '@/routes/posts.routes';
import { StatusCodes } from 'http-status-codes';
import { postsService } from '@/services/index';

class PostsController implements Controller {
    public path = '/posts';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const customRoutes: CustomRoutes = createPostsRoutes(
            this.path,
            this.create,
        );
        createRoutes(customRoutes, this.router);
    }

    private create: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { userId, title, image, content, categoryId } = req.body;

        try {
            await postsService.create({
                userId,
                title,
                image,
                content,
                categoryId,
            });
            response.success({ code: StatusCodes.CREATED });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default PostsController;
