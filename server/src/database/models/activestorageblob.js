'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ActiveStorageBlob extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ActiveStorageBlob.init({
    key: DataTypes.STRING,
    filename: DataTypes.STRING,
    content_type: DataTypes.STRING,
    metadata: DataTypes.TEXT,
    byte_size: DataTypes.BIGINT,
    checksum: DataTypes.STRING,
    service_name: DataTypes.STRING
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'active_storage_blobs',
    modelName: 'ActiveStorageBlob',
    underscored: true
  });
  return ActiveStorageBlob;
};