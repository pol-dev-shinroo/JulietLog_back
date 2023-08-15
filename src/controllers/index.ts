import { default as UsersController } from './users.controller';
import { default as AuthController } from './auth.controller';

export const controllers = [new UsersController(), new AuthController()];
