const express = require("express");
const router = express.Router();

const {
  createStudyGoal,
  getStudyGoal,
  listStudyGoals,
  updateStudyGoal,
  deleteStudyGoal,
} = require("../controllers/studyGoalController");

router.post("/create", createStudyGoal);
router.get("/get", getStudyGoal);
router.get("/list", listStudyGoals);
router.put("/update", updateStudyGoal);
router.delete("/delete", deleteStudyGoal);

module.exports = router;