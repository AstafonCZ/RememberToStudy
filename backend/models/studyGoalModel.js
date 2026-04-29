class StudyGoal {
  constructor({ name, description, targetDate }) {
    this.id = Date.now().toString();
    this.name = name;
    this.description = description;
    this.targetDate = targetDate;
    this.createdAt = new Date();
  }
}

module.exports = StudyGoal;