import { db, defaultOptions } from '@/database/index';
import { dbException, NotFoundException } from '@/exceptions/index';

export const postsRepository = {
    async create(postData: PostsCreateInterface) {
        try {
            const post = await db.Posts.create(postData);
            return post;
        } catch (err) {
            return dbException(err);
        }
    },

    // Add other methods like find, update, delete, etc.
};
