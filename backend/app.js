const express = require("express");
const cors = require("cors");

const studyGoalRoutes = require("./routes/studyGoalRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/studyGoal", studyGoalRoutes);
app.use("/assignment", assignmentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});