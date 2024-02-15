const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 

async function index(req, res) {
  try {
    let responseHash = {};

    let params = qs.parse(req.query)

    const allFacilityGroups = await db.FacilityGroup.findAll();
    responseHash.facility_groups = allFacilityGroups;
    
    if (params.project_id) {
      const project = await db.Project.findByPk(params.project_id);
      let project_groups = await db.ProjectFacilityGroup.findAll({where: {project_id: project.id}, raw: true})
      responseHash.program_group_ids = _.uniq(_.map(project_groups, function(pg){return pg.facility_group_id}))
    }
    return(responseHash)
  } catch (error) {
    res.status(500)
    return({ error: "Error fetching facility groups "+ error });
  }
}

async function create(req, res) {
  try {
    let body = qs.parse(req.body)
    let params = qs.parse(req.params)
    let query = qs.parse(req.query)
    print_params(req)

    const facilityGroup = await db.FacilityGroup.create({
      ...body,
      status: 'active',
      user_id: body.user.id,
      owner_id: body.project_id,
      owner_type: 'Project'
    });
    
    if (facilityGroup && params.project_id) {
      const project = await db.Project.findByPk(req.params.project_id);
      await project.addProjectGroup(facilityGroup);
    }
    
    return({facilityGroup});
  } catch (error) {
    res.status(406)
    return({ errors: error.errors.map(err => err.message) });
  }
}

async function bulk_project_update(req, res) {
  try {
    const project = await Project.findByPk(req.params.project_id);
    const groups = await FacilityGroup.findAll({ where: { id: req.body.facility_group_ids } });
    await project.setProjectGroups(groups);
    return({groups});
  } catch (error) {
    res.status(500)
    return({ error: error.message });
  }
}

async function update(req, res) {
  try {
    const group = await FacilityGroup.findByPk(req.params.id);
    await group.update(req.body);
    return({groups});

  } catch (error) {
    res.status(406)
    return({ errors: 'Error while updating groups' });
  }
}

async function destroy(req, res) {
  try {
    const group = await FacilityGroup.findByPk(req.params.id);
    const program = await Project.findByPk(req.params.project_id);
    
    if (!program.projectGroups.includes(group)) {
      res.status(406)
      return({ errors: 'Group is not part of current program!' });
    }
    
    const projectFacilityGroup = await program.getProjectFacilityGroup({ where: { facilityGroupId: group.id } });
    
    if (!group.isPortfolio && !group.isDefault) {
      await projectFacilityGroup.applyUnassignedToResource();
      await group.destroy();
      res.status(200)
      return({ message: 'Group removed successfully' });
    } else if (group.isPortfolio && !group.isDefault) {
      await projectFacilityGroup.applyUnassignedToResource();
      await projectFacilityGroup.destroy();
      res.status(200)
      return({ message: 'Group removed successfully' });
    } else {
      res.status(406)
      return({ message: "Can't remove default group!" });
    }
  } catch (error) {
    res.status(406)
    return({ errors: error.message });
  }
}

module.exports = {
  index,
  create,
  bulk_project_update,
  update,
  destroy
};