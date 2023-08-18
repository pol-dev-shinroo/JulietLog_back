import { RequestHandler } from 'express';
import { customResponse } from '@/common/index';
import { StatusCodes } from 'http-status-codes';
import { extractToken, tokenGenerator } from '@/utils/index';

declare global {
    interface tokenInfo {
        isCookieExist: boolean;
        accesstoken: string | undefined;
        isAccValid: false | TokenPayload;
        refreshtoken: string | undefined;
        isRefValid: false | TokenPayload;
    }
}

/**
 * req 헤더 쿠키에 토큰 존재 여부를 판단하고,
 * 존재시 만료된 토큰을 재발급합니다.
 * 단 refreshtoken이 만료되면 재발급이 불가능하고 로그인을 통해 토큰을 발급받아야합니다
 */
const tokenMiddleware = (): RequestHandler => {
    const handler: RequestResponseHandler = async (req, res, next) => {
        const response = customResponse(res);

        let tokenInfo: tokenInfo = {
            isCookieExist: false,
            accesstoken: undefined,
            isAccValid: false,
            refreshtoken: undefined,
            isRefValid: false,
        };

        const extract = extractToken(req);
        if (extract) {
            const { accesstoken, refreshtoken } = extract;
            const validAcc = tokenGenerator.validateAccessToken(accesstoken!);
            const validRefresh = tokenGenerator.validateRefreshToken(
                refreshtoken!,
            );
            tokenInfo = {
                isCookieExist: true,
                accesstoken: accesstoken,
                isAccValid: validAcc,
                refreshtoken: refreshtoken,
                isRefValid: validRefresh,
            };
        }
        req.body = { ...req.body, tokenInfo };

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
