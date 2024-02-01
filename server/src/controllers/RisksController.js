const { db } = require("../database/models");
const {_} = require("lodash") 


const show = async(req, res) => {
  try {
    let risk = await db.Risk.findOne({where: {id: req.params.id } })

    return({risk: await risk.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching risk " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("risk body", req.body)
    console.log("risk params", req.params)
    let params = qs.parse(req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    let risk = db.Risk.build();
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    await risk.createOrUpdateRisk(params,{user: user, project_id: req.params.program_id, facility_id: req.params.project_id})


    return({risk: await risk.toJSON(), msg: "Risk created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching risk " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("risk params", qs.parse(req.body))
    let params = qs.parse(req.body)
    let riskParams = params.risk

    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }

    let risk = await db.Risk.findOne({where: {id: req.params.id } })
    riskParams['risk_approach'] = risk.getRiskApproachValue(riskParams['risk_approach']) 

    risk.set(riskParams)
    await risk.save()

    await risk.assignUsers(params)
    await risk.manageNotes(riskParams)
    await risk.manageChecklists(riskParams)
    // risk = await risk.update(params)
    console.log("after update", risk)
    const response = require('../../static_responses/projects_index.json');

    return({risk: await risk.toJSON(), msg: "Risk updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching riskParams " + error });
  }
};

module.exports = {
  update,
  show,
  create
};