'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Noteable,{ foreignKey: '' });
      this.belongsTo(models.User,{ foreignKey: '' });
      // this.hasMany(models.NoteFile,{ foreignKey: '' })

    }
  }
  Note.init({
    noteable_type: DataTypes.STRING,
    noteable_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    body: DataTypes.TEXT
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'notes',
    modelName: 'Note',
  });
  return Note;
};