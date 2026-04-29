class Assignment {
  constructor({ title, description, deadline, studyGoalId }) {
    this.id = Date.now().toString();
    this.title = title;
    this.description = description;
    this.deadline = deadline;
    this.completed = false;
    this.studyGoalId = studyGoalId;
    this.createdAt = new Date();
  }
}

module.exports = Assignment;