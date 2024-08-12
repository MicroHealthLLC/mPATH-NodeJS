"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContractProjectDatum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ContractProjectPocResource, {
        foreignKey: "resource_id",
        constraints: false,
        scope: {
          resource_type: "ContractProjectData",
        },
      });
      this.hasMany(models.ProjectContract);
      this.belongsToMany(models.Project, { through: models.ProjectContract });
      this.belongsTo(models.ContractCustomer, { foreignKey: "contract_customer_id" });
      this.belongsTo(models.ContractVehicle, { foreignKey: "contract_vehicle_id" });
      this.belongsTo(models.ContractAwardTo, { foreignKey: "contract_award_type_id" });
      this.belongsTo(models.ContractPop, { foreignKey: "contract_pop_id" });
      this.belongsTo(models.ContractNaic, { foreignKey: "contract_naic_id" });
      this.belongsTo(models.ContractAwardType, { foreignKey: "contract_award_type_id" });
      this.belongsTo(models.ContractType, { foreignKey: "contract_type_id" });
      this.belongsTo(models.ContractCurrentPop, { foreignKey: "contract_current_pop_id" });
      this.belongsTo(models.ContractNumber, { foreignKey: "contract_number_id" });
      this.belongsTo(models.User, { foreignKey: "user_id" });
    }
    static async createOrUpdateContractProjectData(body, user) {
      const { db } = require("./index.js");
      const contractParms = body.contract_project_data;
      const cParams = { ...contractParms };
      let contractProjectData;
      if (cParams.id) {
        contractProjectData = this.findByPk(cParams.id);
      } else {
        contractProjectData = this.build();
      }
      let transaction = await sequelize.transaction();
      if (cParams.contract_number_id) {
        const contractNumberId = parseInt(cParams.contract_number_id, 10);
        let contractNumber = await db.ContractNumber.findByPk(contractNumberId, { transaction });
        if (isNaN(contractNumberId) || !contractNumber) {
          contractNumber = await db.ContractNumber.create(
            {
              name: cParams.contract_number_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_number_id = contractNumber.id;
      }
      if (cParams.contract_customer_id) {
        const contractCustomerId = parseInt(cParams.contract_customer_id, 10);
        console.log("contractCustomerId---", contractCustomerId);
        let contractCustomer = await db.ContractCustomer.findByPk(contractCustomerId, { transaction });
        if (isNaN(contractCustomerId) || !contractCustomer) {
          contractCustomer = await db.ContractCustomer.create(
            {
              name: cParams.contract_number_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_customer_id = contractCustomer.id;
      }
      if (cParams.contract_vehicle_id) {
        const contractVehicleId = parseInt(cParams.contract_vehicle_id, 10);
        let contractVehicle = await db.ContractVehicle.findByPk(contractVehicleId, { transaction });
        if (isNaN(contractVehicleId) || !contractVehicle) {
          contractVehicle = await db.ContractVehicle.create(
            {
              name: cParams.contract_vehicle_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_vehicle_id = contractVehicle.id;
      }
      if (cParams.contract_award_to_id) {
        const contractAwardToId = parseInt(cParams.contract_award_to_id, 10);
        let contractAwardTo = await db.ContractAwardTo.findByPk(contractAwardToId, { transaction });
        if (isNaN(contractAwardToId) || !contractAwardTo) {
          contractAwardTo = await db.ContractAwardTo.create(
            {
              name: cParams.contract_award_to_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_award_to_id = contractAwardTo.id;
      }
      if (cParams.contract_naic_id) {
        const contractNaicId = parseInt(cParams.contract_naic_id, 10);
        let contractNaic = await db.ContractNaic.findByPk(contractNaicId, { transaction });
        if (isNaN(contractNaicId) || !contractNaic) {
          contractNaic = await db.ContractNaic.create(
            {
              name: cParams.contract_naic_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_naic_id = contractNaic.id;
      }
      if (cParams.contract_award_type_id) {
        const contractAwardTypeId = parseInt(cParams.contract_award_type_id, 10);
        let contractAwardType = await db.ContractAwardType.findByPk(contractAwardTypeId, { transaction });
        if (isNaN(contractAwardTypeId) || !contractAwardType) {
          contractAwardType = await db.ContractAwardType.create(
            {
              name: cParams.contract_award_type_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_award_type_id = contractAwardType.id;
      }
      if (cParams.contract_type_id) {
        const contractTypeId = parseInt(cParams.contract_type_id, 10);
        let contractType = await db.ContractType.findByPk(contractTypeId, { transaction });
        if (isNaN(contractTypeId) || !contractType) {
          contractType = await db.ContractType.create(
            {
              name: cParams.contract_type_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_type_id = contractType.id;
      }
      if (cParams.contract_current_pop_id) {
        const contractCurrentPopId = parseInt(cParams.contract_current_pop_id, 10);
        let contractCurrentPop = await db.ContractCurrentPop.findByPk(contractCurrentPopId, { transaction });
        if (isNaN(contractCurrentPopId) || !contractCurrentPop) {
          contractCurrentPop = await db.ContractCurrentPop.create(
            {
              name: cParams.contract_current_pop_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_current_pop_id = contractCurrentPop.id;
      }
      if (cParams.contract_pop_id) {
        const contracttPopId = parseInt(cParams.contract_pop_id, 10);
        let contractPop = await db.ContractPop.findByPk(contracttPopId, { transaction });
        if (isNaN(contracttPopId) || !contractPop) {
          contractPop = await db.ContractPop.create(
            {
              name: cParams.contract_pop_id,
              user_id: user.id,
            },
            { transaction }
          );
        }
        cParams.contract_pop_id = contractPop.id;
      }
      contractProjectData.setAttributes(cParams);
      contractProjectData.user_id = user.id;
      await contractProjectData.save();
      console.log("still--", cParams);
      return contractProjectData;
    }
  }
  ContractProjectDatum.init(
    {
      charge_code: DataTypes.STRING,
      name: DataTypes.STRING,
      contract_customer_id: DataTypes.INTEGER,
      contract_award_to_id: DataTypes.INTEGER,
      contract_type_id: DataTypes.INTEGER,
      prime_or_sub: DataTypes.STRING,
      contract_start_date: DataTypes.DATE,
      contract_end_date: DataTypes.DATE,
      total_contract_value: DataTypes.DECIMAL,
      contract_pop_id: DataTypes.INTEGER,
      contract_current_pop_id: DataTypes.INTEGER,
      contract_current_pop_start_date: DataTypes.DATE,
      contract_current_pop_end_date: DataTypes.DATE,
      total_founded_value: DataTypes.DECIMAL,
      billings_to_date: DataTypes.DECIMAL,
      comments: DataTypes.STRING,
      contract_naic_id: DataTypes.INTEGER,
      contract_vehicle_id: DataTypes.INTEGER,
      contract_award_type_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      number: DataTypes.STRING,
      co_contract_poc_id: DataTypes.INTEGER,
      gov_contract_poc_id: DataTypes.INTEGER,
      pm_contract_poc_id: DataTypes.INTEGER,
      contract_number_id: DataTypes.INTEGER,
      notes: DataTypes.TEXT,
      ignore_expired: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ContractProjectDatum",
      tableName: "contract_project_data",
    }
  );
  return ContractProjectDatum;
};
