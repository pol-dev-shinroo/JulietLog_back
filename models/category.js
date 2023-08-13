'use strict';
const { Model } = require('sequelize');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            this.belongsTo(models.User, { foreignKey: 'userId' });
        }
    }
    Category.init(
        {
            categoryId: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'Category',
        },
    );
    return Category;
};
