'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FacilityGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Facility,{ foreignKey: '' });
      this.hasMany(models.FacilityProject,{ foreignKey: '' });
      this.hasMany(models.ProjectContract,{ foreignKey: '' });
      this.hasMany(models.ProjectContractVehicle,{ foreignKey: '' });
      this.hasMany(models.ProjectFacilityGroup,{ foreignKey: '' });
      this.belongsToMany(models.Project,{through: models.ProjectFacilityGroup, foreignKey: '', otherKey: '' });
      this.hasMany(models.Contract,{ foreignKey: '' })

    }
  }
  FacilityGroup.init({
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.INTEGER,
    region_type: DataTypes.INTEGER,
    center: DataTypes.STRING,
    project_id: DataTypes.INTEGER,
    progress: DataTypes.INTEGER,
    is_portfolio: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER,
    owner_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING,
    is_default: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'facility_groups',
    modelName: 'FacilityGroup',
  });
  return FacilityGroup;
};