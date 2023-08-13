import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Auth extends TimeStampModel {
        userId: number;
        accessToken: string;
        refreshToken: string;
    }

    type AuthCreateInterface = Omit<
        Auth,
        'id' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class AuthModel
    extends Model<Auth, AuthCreateInterface>
    implements Auth
{
    public userId!: number;
    public accessToken!: string;
    public refreshToken!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const AuthGenerator = (sequelize: Sequelize): typeof AuthModel => {
    AuthModel.init(
        {
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                primaryKey: true,
                references: {
                    model: 'users', // name of Target model
                    key: 'id', // key in Target model
                },
            },
            accessToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            refreshToken: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'auth',
            timestamps: true,
        },
    );

    return AuthModel;
};
