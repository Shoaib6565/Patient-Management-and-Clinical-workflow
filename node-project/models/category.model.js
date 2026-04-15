// models/category.js
'use strict';
import { Model } from 'sequelize'; 

export default (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.hasMany(models.Case, { foreignKey: 'category_id' });
    }
  }

  Category.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: DataTypes.STRING, unique: true },
      description: DataTypes.TEXT,
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      timestamps: false,
      underscored: true,
    }
  );

  return Category;
};