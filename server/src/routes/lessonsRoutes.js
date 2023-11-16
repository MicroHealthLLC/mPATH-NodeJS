const { Router } = require("express");
const { 
        index,
        show
      } = require("../controllers/LessonsController");

const router = Router();
//Fetch all programs
router.get("/", index);

router.get("/:id", show);

module.exports = router;