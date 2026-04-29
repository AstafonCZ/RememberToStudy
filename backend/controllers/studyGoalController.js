const { studyGoals, assignments } = require("../data/db");
const StudyGoal = require("../models/studyGoalModel");

// CREATE
const createStudyGoal = (req, res) => {
  const { name, description, targetDate } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const newGoal = new StudyGoal({
    name,
    description,
    targetDate,
  });

  studyGoals.push(newGoal);

  res.status(201).json(newGoal);
};

// GET
const getStudyGoal = (req, res) => {
  const { id } = req.query;

  const goal = studyGoals.find((g) => g.id === id);

  if (!goal) {
    return res.status(404).json({ error: "StudyGoal not found" });
  }

  res.json(goal);
};

// LIST
const listStudyGoals = (req, res) => {
  res.json(studyGoals);
};

// UPDATE
const updateStudyGoal = (req, res) => {
  const { id, name, description, targetDate } = req.body;

  const goal = studyGoals.find((g) => g.id === id);

  if (!goal) {
    return res.status(404).json({ error: "StudyGoal not found" });
  }

  if (name !== undefined) goal.name = name;
  if (description !== undefined) goal.description = description;
  if (targetDate !== undefined) goal.targetDate = targetDate;

  res.json(goal);
};

// DELETE (včetně assignments)
const deleteStudyGoal = (req, res) => {
  const { id } = req.query;

  const index = studyGoals.findIndex((g) => g.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "StudyGoal not found" });
  }

  // delete related assignments
  for (let i = assignments.length - 1; i >= 0; i--) {
    if (assignments[i].studyGoalId === id) {
      assignments.splice(i, 1);
    }
  }

  studyGoals.splice(index, 1);

  res.json({ message: "StudyGoal and related assignments deleted" });
};

module.exports = {
  createStudyGoal,
  getStudyGoal,
  listStudyGoals,
  updateStudyGoal,
  deleteStudyGoal,
};