const { DataTypes, Sequelize } = require("sequelize");

const program = (sequelize) => sequelize.define("program", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT('long'),
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
  },
  // uuid: {
  //   type: DataTypes.STRING,
  //   unique: true,
  // },
  // programTypeId: {
  //   type: DataTypes.BIGINT,
  //   field: 'program_type_id',
  // },
  // status: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 1,
  // },
  // progress: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0,
  // },
});

// Program.belongsTo(ProgramType, { foreignKey: 'programTypeId' });

module.exports = program;