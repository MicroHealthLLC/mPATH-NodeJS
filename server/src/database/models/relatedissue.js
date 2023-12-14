'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RelatedIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Relatable);
      // this.belongsTo(models.SubIssue)

    }
  }
  RelatedIssue.init({
    relatable_type: DataTypes.STRING,
    relatable_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'related_issues',
    modelName: 'RelatedIssue',
    underscored: true
  });
  return RelatedIssue;
};