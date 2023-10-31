const { models } = require("../../database");

// Function for retrieving all programs
const programs = async (req, res) => {
  try {
    // Fetch all users from the database
    const allPrograms = await models.program.findAll();
    res.json(allPrograms);
    console.log("All (Backend) Programs: ", allPrograms);
  } catch (error) {
    res.status(500).json({ error: "Error fetching programs" });
  }
};

// Function for retrieving all programs
const findProgram = async (req, res) => {
  try {
    programId = req.params.id;
    console.log(req.params)
    // Fetch all users from the database
    const program = await models.program.findOne({ where: { id: programId } });
    res.json(program);
    console.log("Program: ", program);
  } catch (error) {
    res.status(500).json({ error: "Error fetching program"+error });
  }
};

const createProgram = async (req, res) => {
  try {
    const { name, description } = req.body.program;
    const newProgram = await models.program.create({ name, description });
    res.json({ program: newProgram });
    console.log("Newly created program: ", newProgram);
  } catch (error) {
    res.status(500).json({ error: "Error creating program" });
  }
};

// Destructive actions below will be removed in production.  Production will have a soft delete and functionality 
// to restore soft-deleted programs.  These will have to be handled accordingly in the routes directory.
const deleteProgram = async (req, res) => {
  try {
    const programId = req.params.id;
    const deletedProgram = await models.program.destroy({ where: { id: programId } });
    if (deletedProgram === 0) {
      return res.status(404).json({ error: "Program not found" });
    }
    res.json({ message: "Program deleted successfully" });
    console.log("Deleted program ID: ", programId);
  } catch (error) {
    res.status(500).json({ error: "Error deleting program" });
  }
};

const deleteAllPrograms = async (req, res) => {
  try {
    const deletedPrograms = await  models.program.destroy({ where: {} });
    res.json({ message: "All programs deleted successfully" });
    console.log("Deleted programs count: ", deletedPrograms);
  } catch (error) {
    res.status(500).json({ error: "Error deleting programs" });
  }
};


module.exports = {
  programs,
  findProgram,
  createProgram,
  deleteProgram,
  deleteAllPrograms,
};