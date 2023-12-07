'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelatedRisk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Relatable,{ foreignKey: '' });
this.belongsTo(models.SubRisk,{ foreignKey: '' })

    }
  }
  RelatedRisk.init({
    relatable_type: DataTypes.STRING,
    relatable_id: DataTypes.INTEGER,
    risk_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'related_risks',
    modelName: 'RelatedRisk',
  });
  return RelatedRisk;
};