'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectPrivilege extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
//       // define association here
//       this.belongsTo(models.User);
// this.belongsTo(models.Project)

    }
  }
  ProjectPrivilege.init({
    overview: DataTypes.STRING,
    tasks: DataTypes.STRING,
    notes: DataTypes.STRING,
    issues: DataTypes.STRING,
    admin: DataTypes.STRING,
    risks: DataTypes.STRING,
    lessons: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    project_ids: DataTypes.STRING,
    contracts: DataTypes.STRING,
    cn_overview: DataTypes.STRING,
    cn_tasks: DataTypes.STRING,
    cn_notes: DataTypes.STRING,
    cn_issues: DataTypes.STRING,
    cn_risks: DataTypes.STRING,
    cn_lessons: DataTypes.STRING,
    admin_groups: DataTypes.STRING,
    admin_contracts: DataTypes.STRING,
    admin_facilities: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'project_privileges',
    modelName: 'ProjectPrivilege',
    underscored: true
  });
  return ProjectPrivilege;
};