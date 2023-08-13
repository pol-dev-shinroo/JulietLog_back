import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIGS } from '@/common/db_constants';
import { AuthModel, AuthGenerator } from './models/auth.model';
import { UsersModel, UsersGenerator } from './models/users.model';
import { relations } from './relations';

const sequelize = new Sequelize(SEQUELIZE_CONFIGS);

declare global {
    interface TimeStampModel {
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date | null;
    }

    interface DB {
        Sequelize: typeof Sequelize;
        sequelize: Sequelize;
        Auth: typeof AuthModel;
        Users: typeof UsersModel;
    }
}

const db: DB = {
    Sequelize,
    sequelize,
    Auth: AuthGenerator(sequelize),
    Users: UsersGenerator(sequelize),
};

relations(db);

export default db;
