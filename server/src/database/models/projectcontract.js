'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectContract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ContractProjectDatum,{ foreignKey: '' });
this.belongsTo(models.Project,{ foreignKey: '' });
this.belongsTo(models.ContractProject,{ foreignKey: '' });
this.belongsTo(models.ContractFacilityGroup,{ foreignKey: '' });
this.belongsTo(models.FacilityGroup,{ foreignKey: '' });
this.hasMany(models.Task,{ foreignKey: '' });
this.hasMany(models.Issue,{ foreignKey: '' });
this.hasMany(models.Risk,{ foreignKey: '' });
this.hasMany(models.Lesson,{ foreignKey: '' });
this.hasMany(models.Note,{ foreignKey: '' })

    }
  }
  ProjectContract.init({
    project_id: DataTypes.INTEGER,
    contract_project_datum_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    facility_group_id: DataTypes.INTEGER,
    progress: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'project_contracts',
    modelName: 'ProjectContract',
  });
  return ProjectContract;
};