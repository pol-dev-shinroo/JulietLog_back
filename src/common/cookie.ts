import { Response } from 'express';

export const setAccessTokenCookie = (res: Response, token: string) => {
    res.cookie('accesstoken', token, {
        httpOnly: true,
        secure: true,
        // domain: 'localhost:3000',
        // expires: new Date(Date.now() + 8 * 3600000),
        // path: '/api/*',
        // maxAge: 8 * 3600 * 1000,
        sameSite: 'none',
    });
};

export const setRefreshTokenCookie = (res: Response, token: string) => {
    res.cookie('refreshtoken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
};

export const clearAccessTokenCookie = (res: Response) => {
    res.clearCookie('accesstoken', {
        httpOnly: true,
        secure: true,
    });
};

export const clearRefreshTokenCookie = (res: Response) => {
    res.clearCookie('refreshtoken', {
        httpOnly: true,
        secure: true,
    });
};

export const clearAllCookies = (cookie: string | undefined, res: Response) => {
    if (!cookie) return;

    // Split the cookie string into individual cookies
    const cookiesArray = cookie.split(';');

    // Iterate over each cookie string to extract the cookie name and then clear it
    cookiesArray.forEach((cookieStr: string) => {
        const cookieName = cookieStr.split('=')[0].trim();
        res.clearCookie(cookieName);
    });
};
