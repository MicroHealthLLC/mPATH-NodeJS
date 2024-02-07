const { db } = require("../database/models");
const qs = require('qs');
const {_} = require("lodash") 

async function index(req, res) {
  try {
    let params = qs.parse(req.query)

    const projectContracts = await db.ProjectContract.findAll({
      where: { project_id: params.project_id }
    });

    let contracts = [];
    await Promise.all(projectContracts.map(async (pc) => {
      const contract = await pc.toJSON();
      contracts.push(contract);
    }));

    return({ contracts, totalCount: contracts.length });
  } catch (error) {
    res.status(500)
    return({ error: "Error fetching contracts "+ error });
  }
}


module.exports = {
  index
};