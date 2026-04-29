const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignment,
  listAssignments,
  updateAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");

router.post("/create", createAssignment);
router.get("/get", getAssignment);
router.get("/list", listAssignments);
router.put("/update", updateAssignment);
router.delete("/delete", deleteAssignment);

module.exports = router;