import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createAuthRoutes } from '@/routes/auth.routes';
import { StatusCodes } from 'http-status-codes';
import { authService } from '@/services/index';
import { tokenGenerator } from '@/utils/index';

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const customRoutes: CustomRoutes = createAuthRoutes(
            this.path,
            this.login,
        );
        createRoutes(customRoutes, this.router);
    }

    private login: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { email, password } = req.body;
        console.log(req.headers.cookie);
        try {
            const { accessToken, refreshToken } = await authService.login({
                email,
                password,
            });
            res.cookie('accesstoken', accessToken);
            res.cookie('refreshtoken', refreshToken);
            response.success({
                code: StatusCodes.OK,
                message: 'user logged in',
            });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });
}

export default AuthController;
