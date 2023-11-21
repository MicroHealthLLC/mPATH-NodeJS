const { Router } = require("express");
const { 
        index,
        show 
      } = require("../controllers/ProjectsController");

const router = Router();
//Fetch all programs
router.get("/", index);

router.get("/:id", show);

// //Create a program
// router.post("/createprogram", createProgram);
// // Delete a program by ID
// router.delete("/deleteprogram/:id", deleteProgram);
// // Delete all programs
// router.delete("/deleteallprograms", deleteAllPrograms);

module.exports = router;