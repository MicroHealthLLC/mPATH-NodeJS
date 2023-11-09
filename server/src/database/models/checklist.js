'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Checklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Checklist.init({
    listable_type: DataTypes.STRING,
    listable_id: DataTypes.INTEGER,
    checked: DataTypes.BOOLEAN,
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    due_date: DataTypes.DATE,
    planned_effort: DataTypes.DECIMAL
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'checklists',
    modelName: 'Checklist',
  });
  return Checklist;
};