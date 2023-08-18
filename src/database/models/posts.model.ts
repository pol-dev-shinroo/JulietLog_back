import { Sequelize, DataTypes, Model } from 'sequelize';

declare global {
    interface Posts extends TimeStampModel {
        postId: number;
        userId: number;
        title: string;
        image: string;
        content: string;
        categoryId: number;
        like?: number;
        count?: number;
    }

    type PostsCreateInterface = Omit<
        Posts,
        'postId' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'like' | 'count'
    >;
}

export class PostsModel
    extends Model<Posts, PostsCreateInterface>
    implements Posts
{
    public postId!: number;
    public userId!: number;
    public title!: string;
    public image!: string;
    public content!: string;
    public categoryId!: number;
    public like!: number;
    public count!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const PostsGenerator = (sequelize: Sequelize): typeof PostsModel => {
    PostsModel.init(
        {
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true, // Assuming this can be optional
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categoryId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            like: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0, // Assuming default value as 0
            },
            count: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                defaultValue: 0, // Assuming default value as 0
            },
        },
        {
            sequelize,
            tableName: 'posts',
            timestamps: true,
        },
    );

    return PostsModel;
};
