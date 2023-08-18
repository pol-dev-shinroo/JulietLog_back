import { default as UsersController } from './users.controller';
import { default as AuthController } from './auth.controller';
import { default as CategoryController } from './category.controller';
import { default as PostsController } from './posts.controller';

export const controllers = [
    new UsersController(),
    new AuthController(),
    new CategoryController(),
    new PostsController(),
];
