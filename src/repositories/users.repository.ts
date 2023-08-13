import { db, defaultOptions } from '@/database/index';
import { dbException, NotFoundException } from '@/exceptions/index';

export const usersRepository = {
    async create(userData: UsersCreateInterface) {
        try {
            const user = await db.Users.create(userData);
            return user;
        } catch (err) {
            return dbException(err);
        }
    },

    async getUser(userData: UsersGetInterface) {
        try {
            const user = await db.Users.findOne({
                ...defaultOptions,
                where: userData,
            });
            if (!user) {
                return NotFoundException('user does not exist');
            }
            return user;
        } catch (err) {
            return dbException(err);
        }
    },
};
