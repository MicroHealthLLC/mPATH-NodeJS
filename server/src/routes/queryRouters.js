const { Router } = require("express");
const { 
    query_filters
      } = require("../controllers/QueryFiltersController");

const router = Router();
//Fetch all programs
router.get("/", query_filters);


// //Create a program
// router.post("/createprogram", createProgram);
// // Delete a program by ID
// router.delete("/deleteprogram/:id", deleteProgram);
// // Delete all programs
// router.delete("/deleteallprograms", deleteAllPrograms);

module.exports = router;