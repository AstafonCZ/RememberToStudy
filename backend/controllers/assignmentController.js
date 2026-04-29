const { assignments, studyGoals } = require("../data/db");
const Assignment = require("../models/assignmentModel");

// CREATE (včetně kontroly vazby)
const createAssignment = (req, res) => {
  const { title, description, deadline, studyGoalId } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const goalExists = studyGoals.find((g) => g.id === studyGoalId);

  if (!goalExists) {
    return res.status(400).json({ error: "StudyGoal does not exist" });
  }

  const newAssignment = new Assignment({
    title,
    description,
    deadline,
    studyGoalId,
  });

  assignments.push(newAssignment);

  res.status(201).json(newAssignment);
};

// GET
const getAssignment = (req, res) => {
  const { id } = req.query;

  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  res.json(assignment);
};

// LIST (filtrování podle studyGoalId)
const listAssignments = (req, res) => {
  const { studyGoalId } = req.query;

  if (studyGoalId) {
    const filtered = assignments.filter(
      (a) => a.studyGoalId === studyGoalId
    );
    return res.json(filtered);
  }

  res.json(assignments);
};

// UPDATE
const updateAssignment = (req, res) => {
  const { id, title, description, deadline, completed } = req.body;

  const assignment = assignments.find((a) => a.id === id);

  if (!assignment) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  if (title !== undefined) assignment.title = title;
  if (description !== undefined) assignment.description = description;
  if (deadline !== undefined) assignment.deadline = deadline;
  if (completed !== undefined) assignment.completed = completed;

  res.json(assignment);
};

// DELETE
const deleteAssignment = (req, res) => {
  const { id } = req.query;

  const index = assignments.findIndex((a) => a.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Assignment not found" });
  }

  assignments.splice(index, 1);

  res.json({ message: "Assignment deleted" });
};

module.exports = {
  createAssignment,
  getAssignment,
  listAssignments,
  updateAssignment,
  deleteAssignment,
};