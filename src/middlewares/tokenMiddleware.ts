import { RequestHandler } from 'express';
import { customResponse } from '@/common/index';
import { StatusCodes } from 'http-status-codes';
import { authRepository } from '@/repositories/index';
import { tokenGenerator } from '@/utils/index';

const tokenMiddleware = (): RequestHandler => {
    const handler: RequestResponseHandler = async (req, res, next) => {
        const response = customResponse(res);
        let email: string | null = null;

        if (req.headers.cookie) {
            const cookies = req.headers.cookie.split(';');

            // Extract tokens from cookies
            let accessToken = cookies.find((cookie) =>
                cookie.trim().startsWith('accessToken='),
            );

            let refreshToken = cookies.find((cookie) =>
                cookie.trim().startsWith('refreshToken='),
            );

            if (accessToken) {
                accessToken = accessToken.split('=')[1];

                // Validate access token
                const validAccess =
                    tokenGenerator.validateAccessToken(accessToken);

                if (validAccess) {
                    email = validAccess.email;
                } else if (refreshToken) {
                    refreshToken = refreshToken.split('=')[1];
                    const validRefresh =
                        tokenGenerator.validateRefreshToken(refreshToken);

                    if (validRefresh) {
                        email = validRefresh.email;

                        // Recreate access token and set it in the response
                        const { accessToken: newAccessToken } =
                            tokenGenerator.generateAccessToken({
                                email: email,
                            });
                        res.cookie('accesstoken', newAccessToken);

                        // Recreate refresh token and set it in the response
                        const { refreshToken: newRefreshToken } =
                            tokenGenerator.generateRefreshToken({
                                email: email,
                            });
                        res.cookie('refreshtoken', newRefreshToken);
                    }
                }
            }
        }

        if (email) {
            req.body.email = email; // Setting email in the request body if needed elsewhere
        }

        try {
            next();
        } catch (e: any) {
            response.error({
                code: StatusCodes.BAD_REQUEST,
                message: e,
            });
        }
    };

    return handler;
};

export default tokenMiddleware;
