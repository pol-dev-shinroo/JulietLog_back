'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.Category, { foreignKey: 'userId' });
            this.hasOne(models.Post, { foreignKey: 'userId' });
            this.hasOne(models.Comment, { foreignKey: 'userId' });
        }
    }
    User.init(
        {
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            nickname: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            profileImg: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isDarkModeEnabled: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            neighborAlert: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            commentAlert: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            chatRoomAlert: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'User',
        },
    );
    return User;
};
