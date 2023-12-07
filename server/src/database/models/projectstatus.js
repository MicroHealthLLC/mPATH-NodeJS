'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Project,{ foreignKey: '' });
this.belongsTo(models.Status,{ foreignKey: '' })

    }
  }
  ProjectStatus.init({
    status_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'project_statues',
    modelName: 'ProjectStatus',
  });
  return ProjectStatus;
};