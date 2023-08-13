import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createUserRoutes } from '@/routes/users.routes';
import { StatusCodes } from 'http-status-codes';
import { usersService } from '@/services/index';

class UserController implements Controller {
    public path = '/users';
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
        const req_data = { ...req.body };
        try {
            const createData = await usersService.create({
                ...req_data,
                profileImg: req_data.profile_img,
            });
            res.cookie('accesstoken', createData.authTokens.accessToken);
            res.cookie('refreshtoken', createData.authTokens.refreshToken);
            response.success({ code: StatusCodes.CREATED });
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
