import { usersRepository, authRepository } from '@/repositories/index';
import { cloudinary } from '@/apis/index';
import { tokenGenerator } from '@/utils/index';

export const usersService = {
    repository: usersRepository,
    authRepository: authRepository,

    async create(userData: UsersCreateInterface) {
        const { secure_url } = await cloudinary(userData.profileImg);

        const user = await this.repository.create({
            ...userData,
            profileImg: secure_url!,
        });

        const { refreshToken } = tokenGenerator.generateRefreshToken(user);
        const { accessToken } = tokenGenerator.generateAccessToken(user);

        const authTokens = await this.authRepository.createAuthEntry({
            userId: user.id,
            accessToken,
            refreshToken,
        });

        return { user, authTokens };
    },

    async getUser(userId: UsersCreateInterface) {
        const user = await this.repository.getUser(userId);
        return user;
    },
};
