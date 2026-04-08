'use strict';

module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define(
        'Category',
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                primaryKey: true,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },

            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },

            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: 'categories',
            timestamps: false,
            underscored: true,
        }
    );

    Category.associate = function (models) {
        Category.hasMany(models.Case, {
            foreignKey: 'category_id',
        });
    };

    return Category;
};