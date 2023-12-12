'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelatedTask extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Relatable,{ foreignKey: '' });
      // this.belongsTo(models.SubTask,{ foreignKey: '' })

    }
  }
  RelatedTask.init({
    relatable_type: DataTypes.STRING,
    relatable_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'related_tasks',
    modelName: 'RelatedTask',
  });
  return RelatedTask;
};