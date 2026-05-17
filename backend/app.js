require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDb = require("./data/db");

const studyGoalRoutes = require("./routes/studyGoalRoutes");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/studyGoal", studyGoalRoutes);
app.use("/assignment", assignmentRoutes);

const port = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});