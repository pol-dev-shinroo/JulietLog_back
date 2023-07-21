import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface User extends TimeStampModel {
        id: number;
        name: string;
        email: string;
    }

    type UserCreateInterface = Omit<
        User,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;

    type UserGetInterface = Omit<User, 'name' | 'email'>;
}

export class UserModel
    extends Model<User, UserCreateInterface>
    implements User
{
    public id!: number;
    public name!: string;
    public email!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const UserGenerator = (sequelize: Sequelize): typeof UserModel => {
    UserModel.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            tableName: 'users',
            timestamps: true,
        },
    );
    return UserModel;
};
