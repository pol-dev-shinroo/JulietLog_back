import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIGS } from '@/common/db_constants';
import { UserGenerator, UserModel } from './models/user';

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
        User: typeof UserModel;
    }
}

const db: DB = {
    Sequelize,
    sequelize,
    User: UserGenerator(sequelize),
};

relations(db);

export default db;
