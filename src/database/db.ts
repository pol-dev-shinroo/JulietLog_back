import { Sequelize } from 'sequelize';
import { SEQUELIZE_CONFIGS } from '@/common/db_constants';
import { UserGenerator, UserModel } from './models/user';
import { CategoryGenerator, CategoryModel } from './models/category';

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
        Category: typeof CategoryModel;
    }
}

const db: DB = {
    Sequelize,
    sequelize,
    User: UserGenerator(sequelize),
    Category: CategoryGenerator(sequelize),
};

relations(db);

export default db;
