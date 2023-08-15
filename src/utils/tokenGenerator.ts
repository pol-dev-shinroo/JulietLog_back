import jwt from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = 'YOUR_ACCESS_TOKEN_SECRET';
const REFRESH_TOKEN_SECRET = 'YOUR_REFRESH_TOKEN_SECRET';

declare global {
    interface TokenPayload {
        email: string;
        iat?: number;
        exp?: number;
    }
}

export const tokenGenerator = {
    validateAccessToken(accesstoken: string): TokenPayload | false {
        try {
            const decoded = jwt.verify(accesstoken, ACCESS_TOKEN_SECRET);
            if (
                typeof decoded === 'object' &&
                decoded !== null &&
                'email' in decoded
            ) {
                return decoded as TokenPayload;
            }
            return false;
        } catch (error) {
            const decodedPayload = jwt.decode(accesstoken) as TokenPayload;
            if (decodedPayload && 'email' in decodedPayload) {
                return decodedPayload;
            }
            return false;
        }
    },

    validateRefreshToken(refreshtoken: string): TokenPayload | false {
        try {
            const decoded = jwt.verify(refreshtoken, REFRESH_TOKEN_SECRET);
            if (
                typeof decoded === 'object' &&
                decoded !== null &&
                'email' in decoded
            ) {
                return decoded as TokenPayload;
            }
            return false;
        } catch (error) {
            const decodedPayload = jwt.decode(refreshtoken) as TokenPayload;
            if (decodedPayload && 'email' in decodedPayload) {
                return decodedPayload;
            }
            return false;
        }
    },
    generateAccessToken(user: TokenPayload) {
        const payload = {
            email: user.email,
        };

        const accessTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

        const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
            expiresIn: Math.floor(
                (accessTokenExpires.getTime() - Date.now()) / 1000,
            ),
        });

        return {
            accessToken,
            accessTokenExpires,
        };
    },

    generateRefreshToken(user: TokenPayload) {
        const payload = {
            email: user.email,
        };

        const refreshTokenExpires = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000,
        ); // 7 days from now

        const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
            expiresIn: Math.floor(
                (refreshTokenExpires.getTime() - Date.now()) / 1000,
            ),
        });

        return {
            refreshToken,
            refreshTokenExpires,
        };
    },
};
