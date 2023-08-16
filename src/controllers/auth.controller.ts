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
                httpOnly: true, // Specifies the cookie is only accessible by the server (i.e., not accessible through JavaScript)
                secure: true, // Specifies the cookie will only be sent over HTTPS
                domain: 'localhost:3000', // Specifies which hosts are allowed to receive the cookie
                expires: new Date(Date.now() + 8 * 3600000), // Sets cookie to expire in 8 hours. Adjust as needed.
                path: '/api/*', // Specifies the URL path that must exist in the requested URL
                maxAge: 8 * 3600 * 1000, // Sets cookie to expire in 8 hours in milliseconds. Adjust as needed.
                // Uncomment the following based on your needs:
                // sameSite: 'Strict',  // Cookie will only be sent in a first-party context and not be sent with requests initiated by third party websites
                // sameSite: 'Lax',  // Cookie will be sent in a first-party context, and also sent with requests initiated by third party websites that use top-level navigations
                sameSite: 'none', // Cookie will be sent in all contexts, including with cross-site requests
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
