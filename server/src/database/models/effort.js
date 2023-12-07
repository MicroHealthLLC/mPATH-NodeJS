'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Effort extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Resource,{ foreignKey: '' });
      this.belongsTo(models.User,{ foreignKey: '' });
      this.belongsTo(models.FacilityProject,{ foreignKey: '' })

    }
  }
  Effort.init({
    date_of_week: DataTypes.DATE,
    hours: DataTypes.DECIMAL,
    user_id: DataTypes.INTEGER,
    resource_id: DataTypes.INTEGER,
    resource_type: DataTypes.STRING,
    facility_project_id: DataTypes.INTEGER,
    projected: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'efforts',
    modelName: 'Effort',
  });
  return Effort;
};