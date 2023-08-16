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
            this.googleLogin,
        );
        createRoutes(customRoutes, this.router);
    }

    private login: RequestResponseHandler = asyncWrapper(async (req, res) => {
        const response = customResponse(res);
        const { email, password } = req.body;
        console.log(req.headers.cookie);
        console.log(req.headers);
        try {
            const { accessToken, refreshToken } = await authService.login({
                email,
                password,
            });
            res.cookie('accesstoken', accessToken, {
                httpOnly: true,
                secure: true,
            });
            res.cookie('refreshtoken', refreshToken, {
                httpOnly: true,
                secure: true,
            });
            response.success({
                code: StatusCodes.OK,
                message: 'user logged in',
            });
        } catch (err) {
            response.error(err as ErrorData);
        }
    });

    private googleLogin: RequestResponseHandler = asyncWrapper(
        async (req, res) => {
            const response = customResponse(res);
            const { code } = req.body;
            const data = await authService.googleLogin(code);
            console.log(data);
            try {
                response.success({
                    code: StatusCodes.OK,
                    message: 'user logged in',
                });
            } catch (err) {
                response.error(err as ErrorData);
            }
        },
    );
}

export default AuthController;
