import { userRepository } from '@/repositories/index';
import { cloudinary } from '@/apis/index';

export const userService = {
    userRepository,
    async create(userData: UserCreateInterface) {
        const { secure_url } = await cloudinary(userData.profileImg);
        console.log(secure_url);

        const user = await userRepository.create({
            ...userData,
            profileImg: secure_url!,
        });
        return user;
    },

    async getUser(userId: UserGetInterface) {
        const user = await userRepository.getUser(userId);
        return user;
    },
};
