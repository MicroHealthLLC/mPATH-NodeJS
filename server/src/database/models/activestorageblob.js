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
    
    static generateRandomAlphaNumericString() {
      const alphaNumericChars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      let length = 28;
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * alphaNumericChars.length);
        result += alphaNumericChars.charAt(randomIndex);
      }
    
      return result;
    }
    getFolderPath(){
      const inputString = this.key;
      const result = [];

      for (let i = 0; i < inputString.length; i += 2) {
        const substring = inputString.substr(i, 2);
        result.push(substring);
      }

      return [result[0], result[1]].join("/")
    }
  }
  ActiveStorageBlob.init({
    record_id: DataTypes.BIGINT,
    record_type: DataTypes.STRING,
    name: DataTypes.STRING,
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