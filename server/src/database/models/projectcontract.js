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
      // // define association here
      // this.belongsTo(models.ContractProjectDatum);
      this.belongsTo(models.Contract,{foreignKe: 'contract_id'});
      // this.belongsTo(models.Project);
      // // this.belongsTo(models.ContractProject);
      // // this.belongsTo(models.ContractFacilityGroup);
      // this.belongsTo(models.FacilityGroup);
      // this.hasMany(models.Task);
      // this.hasMany(models.Issue);
      // this.hasMany(models.Risk);
      // this.hasMany(models.Lesson);
      // this.hasMany(models.Note)

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
    underscored: true
  });
  return ProjectContract;
};