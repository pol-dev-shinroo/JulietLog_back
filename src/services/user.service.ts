import { userRepository } from '@/repositories/index';

export const userService = {
    userRepository,
    async create(userData: UserCreateInterface) {
        const user = await userRepository.create(userData);
        return user;
    },

    async getUser(userId: UserGetInterface) {
        const user = await userRepository.getUser(userId);
        return user;
    },
};
