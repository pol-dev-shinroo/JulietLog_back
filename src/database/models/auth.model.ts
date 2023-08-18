import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Auth extends TimeStampModel {
        authId: number;
        userId: number;
        accessToken: string;
        refreshToken: string;
    }

    type AuthCreateInterface = Omit<
        Auth,
        'authId' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >;
}

export class AuthModel
    extends Model<Auth, AuthCreateInterface>
    implements Auth
{
    public authId!: number;
    public userId!: number;
    public accessToken!: string;
    public refreshToken!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const AuthGenerator = (sequelize: Sequelize): typeof AuthModel => {
    AuthModel.init(
        {
            authId: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                unique: true,
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
