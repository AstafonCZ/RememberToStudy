const Assignment = require("../models/assignmentModel");
const StudyGoal = require("../models/studyGoalModel");

// CREATE
const createAssignment = async (req, res) => {
  try {
    const { title, description, deadline, dueDate, status, studyGoalId } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    if (studyGoalId) {
      const goalExists = await StudyGoal.findById(studyGoalId);

      if (!goalExists) {
        return res.status(400).json({ error: "StudyGoal does not exist" });
      }
    }

    const newAssignment = await Assignment.create({
      title,
      description,
      deadline: deadline || dueDate || "",
      status,
      studyGoalId: studyGoalId || null,
    });

    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET
const getAssignment = async (req, res) => {
  try {
    const { id } = req.query;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LIST
const listAssignments = async (req, res) => {
  try {
    const { studyGoalId } = req.query;

    const filter = studyGoalId ? { studyGoalId } : {};
    const assignments = await Assignment.find(filter).sort({ createdAt: -1 });

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateAssignment = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      deadline,
      dueDate,
      status,
      studyGoalId,
    } = req.body;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    if (studyGoalId) {
      const goalExists = await StudyGoal.findById(studyGoalId);

      if (!goalExists) {
        return res.status(400).json({ error: "StudyGoal does not exist" });
      }
    }

    if (title !== undefined) assignment.title = title;
    if (description !== undefined) assignment.description = description;
    if (deadline !== undefined || dueDate !== undefined) {
      assignment.deadline = deadline || dueDate || "";
    }
    if (status !== undefined) assignment.status = status;
    if (studyGoalId !== undefined) assignment.studyGoalId = studyGoalId || null;

    const updatedAssignment = await assignment.save();

    res.json(updatedAssignment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.query;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    await Assignment.findByIdAndDelete(id);

    res.json({ message: "Assignment deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAssignment,
  getAssignment,
  listAssignments,
  updateAssignment,
  deleteAssignment,
};