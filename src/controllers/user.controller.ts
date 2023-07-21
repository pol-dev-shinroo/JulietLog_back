import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createUserRoutes } from '@/routes/user.routes';
import { StatusCodes } from 'http-status-codes';
import { userService } from '@/services/index';

class UserController implements Controller {
    public path = '/user';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const customRoutes: CustomRoutes = createUserRoutes(
            this.path,
            this.create,
            this.getUser,
        );
        createRoutes(customRoutes, this.router);
    }

    private create: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { name, email } = req.body;
        console.log(req.body);
        try {
            const user = await userService.create({ name, email });
            response.success({ code: StatusCodes.CREATED, data: user });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private getUser: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const body = req.body;
        console.log(body);
        try {
            response.success({ code: StatusCodes.CREATED, data: res });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default UserController;
