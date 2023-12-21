'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteFilter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      // this.belongsTo(models.Project);
      // this.belongsTo(models.User);
      // this.hasMany(models.QueryFilter)

    }
  }
  FavoriteFilter.init({
    name: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN,
    shared: DataTypes.BOOLEAN,
    private: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'favorite_filters',
    modelName: 'FavoriteFilter',
    underscored: true
  });
  return FavoriteFilter;
};