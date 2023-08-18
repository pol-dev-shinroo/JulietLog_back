import { tokenGenerator } from '@/utils/index';
import { authRepository, usersRepository } from '@/repositories/index';

export const authHelperService = {
    repository: authRepository,
    usersRepository: usersRepository,

    async findUser(loginData: UsersGetInterface) {
        return await usersRepository.getUser(loginData);
    },

    async handleTokenValidation(user: Users, refreshToken: string) {
        const validRef = tokenGenerator.validateRefreshToken(refreshToken);

        if (!validRef) {
            return await this.recreateBothTokens(user.email, user.userId);
        } else {
            return {
                accesstoken: await this.recreateAccessToken(
                    user.email,
                    user.userId,
                ),
                refreshtoken: refreshToken,
            };
        }
    },
    async recreateBothTokens(email: string, userId: number) {
        const newAccessToken = tokenGenerator.generateAccessToken({ email });
        const newRefreshToken = tokenGenerator.generateRefreshToken({ email });
        await this.repository.updateAccessToken(
            userId,
            newAccessToken.accessToken,
        );
        await this.repository.updateRefreshToken(
            userId,
            newRefreshToken.refreshToken,
        );

        return {
            accesstoken: newAccessToken.accessToken,
            refreshtoken: newRefreshToken.refreshToken,
        };
    },

    async recreateAccessToken(email: string, userId: number) {
        const newAccessToken = tokenGenerator.generateAccessToken({ email });
        await this.repository.updateAccessToken(
            userId,
            newAccessToken.accessToken,
        );
        return newAccessToken.accessToken;
    },
};
