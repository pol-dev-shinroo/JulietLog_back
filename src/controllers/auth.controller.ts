import { Router } from 'express';
import { asyncWrapper, customResponse, createRoutes } from '@/common/index';
import { createAuthRoutes } from '@/routes/auth.routes';
import { StatusCodes } from 'http-status-codes';
import { authService } from '@/services/index';
import {
    setAccessTokenCookie,
    setRefreshTokenCookie,
    clearAccessTokenCookie,
    clearRefreshTokenCookie,
    clearAllCookies,
} from '@/common/cookie';

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        const customRoutes: CustomRoutes = createAuthRoutes(
            this.path,
            this.localLogin,
            this.googleLogin,
        );
        createRoutes(customRoutes, this.router);
    }
    /**
     * db에 저장된 해당유저의 토큰의 유효성 검사를 통해
     * 토큰을 필요에 따라 재발급해준 후
     * 쿠키에 넣어줍니다
     */
    private localLogin: RequestResponseHandler = asyncWrapper(
        async (req, res) => {
            const response = customResponse(res);
            const { email, password, tokenInfo } = req.body;
            console.log(req.headers.cookie);
            try {
                // clearAllCookies(req.headers.cookie, res);
                const { accesstoken, refreshtoken } =
                    await authService.localLogin({
                        email,
                        password,
                        tokenInfo,
                    });
                setAccessTokenCookie(res, accesstoken);
                setRefreshTokenCookie(res, refreshtoken);
                response.success({
                    code: StatusCodes.OK,
                    message: 'user logged in',
                });
            } catch (err) {
                response.error(err as ErrorData);
            }
        },
    );

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
