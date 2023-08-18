import { postsRepository, usersRepository } from '@/repositories/index';

export const postsService = {
    repository: postsRepository,
    userRepository: usersRepository,

    async create(postData: PostsCreateInterface) {
        await this.repository.create(postData);
    },
};
