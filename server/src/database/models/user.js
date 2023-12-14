'use strict';
const {
  Model
} = require('sequelize');
const { ProjectUser } = require("./projectuser");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ProjectUser,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.belongsToMany(models.Project,{through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })

      this.belongsToMany(models.FacilityProject,{ through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })
      // this.belongsToMany(models.Project,{through: models.ProjectUser, foreignKey: 'user_id',otherKey: 'project_id' })
      this.hasMany(models.Facility,{ foreignKey: 'creator_id' })
      this.hasOne(models.Privilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.QueryFilter,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.ContractPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.FacilityPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.ProjectPrivilege,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.hasMany(models.Contract,{ foreignKey: 'user_id' })
      this.hasMany(models.RoleUser,{ foreignKey: 'user_id',onDelete: 'CASCADE', hooks: true })
      this.belongsToMany(models.Role,{through: models.RoleUser, foreignKey: 'user_id',otherKey: 'role_id' })
      this.hasMany(models.RolePrivilege,{ foreignKey: 'user_id' })
    }
  }
  User.init({
    // name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: {msg: "It must be a valid Email address"},
      },
    },
    encrypted_password: DataTypes.STRING,
    // password: DataTypes.STRING,
    reset_password_token: DataTypes.STRING,
    reset_password_sent_at: DataTypes.STRING,
    current_sign_in_at: DataTypes.STRING,
    last_sign_in_at: DataTypes.STRING,
    current_sign_in_ip: DataTypes.STRING,
    last_sign_in_ip: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    title: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING,
    provider: DataTypes.STRING,
    uid: DataTypes.STRING,
    login: DataTypes.STRING,
    status: DataTypes.STRING,
    lat: DataTypes.STRING,
    lng: DataTypes.STRING,
    country_code: DataTypes.STRING,
    color: DataTypes.STRING,
    organization_id: DataTypes.STRING

  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'users',
    modelName: 'User',
    underscored: true
  });
  // User.hasMany(ProjectUser);
  // User.hasMany(Project);
  // User.hasMany(Facility, {});
  // User.hasMany(FacilityProject, {});
  // User.hasMany(Risk, {});
  // User.hasOne(Privilege, {});
  // User.hasMany(QueryFilter, {});
  // User.hasMany(ContractPrivilege, {});
  // User.hasMany(FacilityPrivilege, {});
  // User.hasMany(ProjectPrivilege, {});
  // User.hasMany(Contract, {});
  // User.hasMany(RoleUser, {});
  // User.hasMany(Role, {});
  // User.hasMany(RolePrivilege, {});

  // User.hasMany(Facility, {});
  // User.belongsTo(Organization, {});
  // User.belongsTo(Organization, {});

  
  return User;
};