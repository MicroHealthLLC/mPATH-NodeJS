const { db } = require("../database/models");
const {_} = require("lodash") 


const show = async(req, res) => {
  try {
    let issue = await db.Issue.findOne({where: {id: req.params.id } })

    return({issue: await issue.toJSON()});
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching issue " + error });
  }
}

// Function for retrieving user details
const create = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("issue body", req.body)
    console.log("issue params", req.params)
    let params = qs.parse(req.body)
    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }
    let issue = db.Issue.build();
    let user = await db.User.findOne({where: {email: 'admin@example.com'}})
    await issue.createOrUpdateIssue(params,{user: user, project_id: req.params.program_id, facility_id: req.params.project_id})


    return({issue: await issue.toJSON(), msg: "Issue created successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching issue " + error });
  }
};
// Function for retrieving user details
const update = async (req, res) => {
  try {
    var qs = require('qs');
    console.log("issue params", qs.parse(req.body))
    let params = qs.parse(req.body)
    let issueParams = params.issue

    // const parts = await req.files();
    // console.log("************Files ", parts)

    // for await (const data of parts) {
    //   console.log("*******File being access**********");
    //   console.log(data.filename); // access file name
    // }

    let issue = await db.Issue.findOne({where: {id: req.params.id } })
    issue.set(issueParams)
    await issue.save()

    await issue.assignUsers(params)
    await issue.manageNotes(issueParams)
    await issue.manageChecklists(issueParams)
    console.log("after update", issue)
    const response = require('../../static_responses/projects_index.json');

    return({issue: await issue.toJSON(), msg: "Issue updated successfully" });
  } catch (error) {
    res.code(500)
    return({ error: "Error fetching issue " + error });
  }
};

module.exports = {
  update,
  show,
  create
};