import { Request } from 'express';

interface IExtractToken {
    accesstoken: string | undefined;
    refreshtoken: string | undefined;
}
type extractToken = false | IExtractToken;

export const extractToken = (req: Request): extractToken => {
    if (!req.headers.cookie) return false;

    const cookies = req.headers.cookie.split(';');
    let res: IExtractToken = {
        accesstoken: undefined,
        refreshtoken: undefined,
    };

    // Extract tokens from cookies
    const accessTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('accessToken='),
    );

    const refreshTokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith('refreshToken='),
    );

    if (accessTokenCookie) {
        const tokenValue = accessTokenCookie.split('=')[1];
        if (tokenValue !== undefined) {
            res.accesstoken = tokenValue;
        }
    }

    if (refreshTokenCookie) {
        const tokenValue = refreshTokenCookie.split('=')[1];
        if (tokenValue !== undefined) {
            res.refreshtoken = tokenValue;
        }
    }

    if (res.accesstoken && res.refreshtoken) {
        return res;
    } else {
        return false;
    }
};
