const express = require("express");
const adminAuth = require("../middlewares/adminAuth");
const {
  addPosition,
  getPositions,
  deletePosition,
} = require("../controllers/positionController");

const router = express.Router();

router.post("/addposition", adminAuth, addPosition);
router.get("/getpositions", adminAuth, getPositions);
router.delete("/deleteposition/:id", adminAuth, deletePosition);

module.exports = router;
