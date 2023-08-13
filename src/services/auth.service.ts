import { authRepository, usersRepository } from '@/repositories/index';
import { tokenGenerator } from '@/utils/index';
import { cloudinary } from '@/apis/index';

export const authService = {
    repository: authRepository,
    usersRepository: usersRepository,

    async login(userData: UsersGetInterface) {
        const user = await this.usersRepository.getUser(userData);
        const { accessToken } = tokenGenerator.generateAccessToken(user);
        const { refreshToken } = tokenGenerator.generateRefreshToken(user);

        await this.repository.updateAccessToken(user.id, accessToken);
        await this.repository.updateRefreshToken(user.id, refreshToken);
        return;
    },
};
