'use strict';
const {
  Model, QueryTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContractProjectDatum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // // define association here
      this.belongsTo(models.ContractCustomer);
      this.belongsTo(models.ContractVehicle);
      this.belongsTo(models.ContractAwardTo);
      this.belongsTo(models.ContractNaic);
      this.belongsTo(models.ContractAwardType);
      this.belongsTo(models.ContractType);
      this.belongsTo(models.ContractCurrentPop);
      this.belongsTo(models.ContractPop);
      this.belongsTo(models.ContractNumber);
      this.belongsTo(models.User);
      this.hasMany(models.ProjectContract);
      // this.belongsToMany(models.Project,{through: models.ProjectContract, foreignKey: '', otherKey: '' });
      // this.hasMany(models.ContractProjectPocResource);
      // this.belongsToMany(models.ContractProjectPoc,{through: models.ContractProjectPocResource, foreignKey: '', otherKey: '' })

    }
    static async getSQLResult(options={}){
      const {_} = require("lodash") 

      let user = options.user
      let authorizedContractIds = options.authorizedContractIds

      let sql_result = await sequelize.query(
        "SELECT distinct(project_contract_id), role_type, role_users.id FROM `role_users` INNER JOIN `roles` ON `roles`.`id` = `role_users`.`role_id` INNER JOIN `role_privileges` ON `role_privileges`.`role_id` = `roles`.`id` WHERE `role_users`.`user_id` = :user_id AND (role_privileges.privilege REGEXP '^[RWD]' and role_users.project_contract_id in (:project_contract_ids))",
        {
          replacements: { user_id: user.id, project_contract_ids: authorizedContractIds },
          type: QueryTypes.SELECT
        }
      );
      return sql_result
    }
    async toJSON(options = {}) {
      const { db } = require("./index.js");
      const {compactAndUniq} = require('../../utils/helpers.js')
      const {_} = require("lodash") 

      let _response = this.get({plain: true});
      
      if (options.authorized_project_ids) {
        const associatedProjects = [];
        const projectContracts = await this.getProjectContracts({plain: true});
        var project_ids = compactAndUniq(_.map(projectContracts, function(p){return p.project_id}))
        var projects = await db.Project.findAll({where: {id: project_ids}, raw: true})
        for (const p of projects) {
          if (options.authorized_project_ids.includes(p.id)) {
            const pc = projectContracts.find(_pc => _pc.project_id === p.id);
            if (options.role_users[pc.id]) {
              associatedProjects.push({ id: p.id, name: p.name, project_contract_id: pc.id });
            }
          }
        }
        _response.associated_projects = associatedProjects;
      }
      
      if (options.project_contract) {
        _response.project_contract_id = options.project_contract.id;
        _response.facility_group = options.project_contract.facility_group.toJSON();
        _response.facility_group_id = options.project_contract.facility_group_id;
      }
      
      _response.contract_customer = await this.getContractCustomer();
      _response.contract_vehicle = await this.getContractVehicle();
      _response.contract_award_to = await this.getContractAwardTo();
      _response.contract_pop = await this.getContractPop();
      _response.contract_naic = await this.getContractNaic();
      _response.contract_award_type = await this.getContractAwardType();
      _response.contract_type = await this.getContractType();
      _response.contract_current_pop = await this.getContractCurrentPop();
      _response.contract_number = await this.getContractNumber();
      
      const contractProjectPocResources = await db.ContractProjectPocResource.findAll({where: {resource_type: 'ContractProjectDatum', resource_id: this.id}, raw: true})
      // _resource.contractProjectPocResources = contractProjectPocResources
      const coContractPocIds = contractProjectPocResources
        .filter(c => c.poc_type === db.ContractProjectPoc.CONTRACT_OFFICE_POC_TYPE)
        .map(c => c.contract_project_poc_id)
        .filter(Boolean);
      const govContractPocIds = contractProjectPocResources
        .filter(c => c.poc_type === db.ContractProjectPoc.GOVERNMENT_POC_TYPE)
        .map(c => c.contract_project_poc_id)
        .filter(Boolean);
      const pmContractPocIds = contractProjectPocResources
        .filter(c => c.poc_type === db.ContractProjectPoc.PROGRAM_MANAGER_POC_TYPE)
        .map(c => c.contract_project_poc_id)
        .filter(Boolean);
      
      _response.co_contract_poc_ids = coContractPocIds;
      _response.gov_contract_poc_ids = govContractPocIds;
      _response.pm_contract_poc_ids = pmContractPocIds;
      
      return _response;
    }
    
  }
  ContractProjectDatum.init({
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
    ignore_expired: DataTypes.BOOLEAN
  }, {
    sequelize,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'contract_project_data',
    modelName: 'ContractProjectDatum',
    underscored: true
  });
  return ContractProjectDatum;
};