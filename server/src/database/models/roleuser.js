'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{ foreignKey: '' });
this.belongsTo(models.Role,{ foreignKey: '' });
this.belongsToMany(models.RolePrivilege,{through: models.Role, foreignKey: '', otherKey: '' });
this.belongsTo(models.FacilityProject,{ foreignKey: '' });
this.belongsTo(models.ProjectContract,{ foreignKey: '' });
this.belongsTo(models.ProjectContractVehicle,{ foreignKey: '' });
this.belongsTo(models.Project,{ foreignKey: '' })

    }
  }
  RoleUser.init({
    role_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER,
    facility_project_id: DataTypes.INTEGER,
    project_contract_id: DataTypes.INTEGER,
    project_contract_vehicle_id: DataTypes.INTEGER,
    resource_type: DataTypes.STRING,
    resource_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'role_users',
    modelName: 'RoleUser',
  });
  return RoleUser;
};