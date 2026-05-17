const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    deadline: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Planned", "In Progress", "Done"],
      default: "Planned",
    },
    studyGoalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyGoal",
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();

        if (ret.studyGoalId) {
          ret.studyGoalId = ret.studyGoalId.toString();
        }

        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);