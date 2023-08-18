import { Sequelize, DataTypes, Model } from 'sequelize';
import { UsersModel } from './users.model';

declare global {
    interface Category extends TimeStampModel {
        categoryId: number;
        category: string;
        userId: number;
    }

    // 카테고리 생성을 위한 인터페이스
    type CategoryCreateInterface = {
        category: string;
        userId: number;
    };

    // 카테고리 조회를 위한 인터페이스
    type CategoryGetInterface = {
        categoryId: number;
    };

    // 카테고리 삭제를 위한 인터페이스
    type CategoryDeleteInterface = {
        categoryId: number;
        userId: number;
    };
}

export class CategoryModel
    extends Model<Category, CategoryCreateInterface>
    implements Category
{
    public categoryId!: number;
    public category!: string;
    public userId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const CategoryGenerator = (
    sequelize: Sequelize,
): typeof CategoryModel => {
    CategoryModel.init(
        {
            categoryId: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: 'category',
            timestamps: true,
        },
    );

    return CategoryModel;
};

// 관계 설정은 별도로 수행
export const defineRelations = () => {
    CategoryModel.belongsTo(UsersModel, { foreignKey: 'userId', as: 'user' }); // users 테이블의 id와 연결
    UsersModel.hasMany(CategoryModel, {
        foreignKey: 'userId',
        as: 'categories',
    }); // 반대 관계 설정
};
