'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QueryFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project,{ foreignKey: '' });
this.belongsTo(models.User,{ foreignKey: '' });
this.belongsTo(models.FavoriteFilter,{ foreignKey: '' })

    }
  }
  QueryFilter.init({
    name: DataTypes.STRING,
    filter_key: DataTypes.STRING,
    filter_value: DataTypes.TEXT,
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    favorite_filter_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'query_filters',
    modelName: 'QueryFilter',
  });
  return QueryFilter;
};