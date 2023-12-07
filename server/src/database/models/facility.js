'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.FacilityGroup,{ foreignKey: '' });
      // this.belongsTo(models.Creator,{ foreignKey: '' });
      this.belongsTo(models.Project,{ foreignKey: '' });
      this.hasMany(models.FacilityProject,{ foreignKey: '' });
      this.belongsToMany(models.Project,{through: models.FacilityProject, foreignKey: '', otherKey: '' });
      this.belongsToMany(models.Task,{through: models.FacilityProject, foreignKey: '', otherKey: '' });
      this.belongsToMany(models.TaskType,{through: models.Task, foreignKey: '', otherKey: '' });
      // this.hasMany(models.Comment,{ foreignKey: '' })

    }
  }
  Facility.init({
    facility_name: DataTypes.STRING,
    region_name: DataTypes.INTEGER,
    address: DataTypes.STRING,
    point_of_contact: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    facility_group_id: DataTypes.INTEGER,
    creator_id: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    status: DataTypes.INTEGER,
    country_code: DataTypes.STRING,
    project_facility_group_id: DataTypes.INTEGER,
    is_portfolio: DataTypes.BOOLEAN,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'facilities',
    modelName: 'Facility',
  });
  return Facility;
};