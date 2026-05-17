const StudyGoal = require("../models/studyGoalModel");
const Assignment = require("../models/assignmentModel");

// CREATE
const createStudyGoal = async (req, res) => {
  try {
    const { title, name, description, subject, status, targetDate } = req.body;

    const finalTitle = title || name;

    if (!finalTitle) {
      return res.status(400).json({ error: "Title is required" });
    }

    const newGoal = await StudyGoal.create({
      title: finalTitle,
      description,
      subject,
      status,
      targetDate,
    });

    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET
const getStudyGoal = async (req, res) => {
  try {
    const { id } = req.query;

    const goal = await StudyGoal.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "StudyGoal not found" });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LIST
const listStudyGoals = async (req, res) => {
  try {
    const goals = await StudyGoal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const updateStudyGoal = async (req, res) => {
  try {
    const { id, title, name, description, subject, status, targetDate } = req.body;

    const finalTitle = title || name;

    const goal = await StudyGoal.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "StudyGoal not found" });
    }

    if (finalTitle !== undefined) goal.title = finalTitle;
    if (description !== undefined) goal.description = description;
    if (subject !== undefined) goal.subject = subject;
    if (status !== undefined) goal.status = status;
    if (targetDate !== undefined) goal.targetDate = targetDate;

    const updatedGoal = await goal.save();

    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteStudyGoal = async (req, res) => {
  try {
    const { id } = req.query;

    const goal = await StudyGoal.findById(id);

    if (!goal) {
      return res.status(404).json({ error: "StudyGoal not found" });
    }

    await Assignment.deleteMany({ studyGoalId: id });
    await StudyGoal.findByIdAndDelete(id);

    res.json({ message: "StudyGoal and related assignments deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createStudyGoal,
  getStudyGoal,
  listStudyGoals,
  updateStudyGoal,
  deleteStudyGoal,
};