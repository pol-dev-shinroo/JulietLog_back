import { db, defaultOptions } from '@/database/index';
import jwt from 'jsonwebtoken';
import {
    dbException,
    NotFoundException,
    UnauthorizedException,
} from '@/exceptions/index';

export const authRepository = {
    async createAuthEntry(authData: AuthCreateInterface) {
        try {
            const authEntry = await db.Auth.create(authData);
            return authEntry;
        } catch (err) {
            return dbException(err);
        }
    },
    async findAuthByAccessToken(accessToken: string) {
        try {
            const authEntry = await db.Auth.findOne({
                ...defaultOptions,
                where: {
                    accessToken: accessToken,
                },
            });

            if (!authEntry) {
                return NotFoundException(
                    'No authentication entry found for the provided access token.',
                );
            }

            return authEntry;
        } catch (err) {
            throw dbException(err);
        }
    },

    async findAuthByRefreshToken(refreshToken: string) {
        try {
            const authEntry = await db.Auth.findOne({
                ...defaultOptions,
                where: {
                    refreshToken: refreshToken,
                },
            });

            if (!authEntry) {
                return NotFoundException(
                    'No authentication entry found for the provided refresh token.',
                );
            }

            return authEntry;
        } catch (err) {
            throw dbException(err);
        }
    },

    async updateAccessToken(userId: number, newAccessToken: string) {
        try {
            const updateStatus = await db.Auth.update(
                { accessToken: newAccessToken },
                { where: { userId: userId } },
            );

            if (!updateStatus || updateStatus[0] === 0) {
                throw NotFoundException(
                    'Unable to update access token for the provided user.',
                );
            }

            return updateStatus;
        } catch (err) {
            throw dbException(err);
        }
    },

    async updateRefreshToken(userId: number, newRefreshToken: string) {
        try {
            const updateStatus = await db.Auth.update(
                { refreshToken: newRefreshToken },
                { where: { userId: userId } },
            );

            if (!updateStatus || updateStatus[0] === 0) {
                throw NotFoundException(
                    'Unable to update refresh token for the provided user.',
                );
            }

            return updateStatus;
        } catch (err) {
            throw dbException(err);
        }
    },
};
