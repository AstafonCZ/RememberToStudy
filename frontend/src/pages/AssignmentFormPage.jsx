import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function AssignmentFormPage({
  mode,
  assignments,
  studyGoals,
  onCreateAssignment,
  onUpdateAssignment,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = mode === "edit";
  const assignment = assignments.find((item) => item.id === id);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const assignmentData = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      deadline: formData.get("deadline"),
      status: formData.get("status"),
      studyGoalId: formData.get("studyGoalId") || null,
    };

    if (!assignmentData.title || !assignmentData.description) {
      window.alert("Title and description are required.");
      return;
    }

    try {
      if (isEditMode) {
        await onUpdateAssignment(id, assignmentData);
        navigate(`/assignments/${id}`);
      } else {
        await onCreateAssignment(assignmentData);
        navigate("/assignments");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  if (isEditMode && !assignment) {
    return (
      <div className="app-layout">
        <Header />
        <NavigationMenu />

        <main className="page-content">
          <h1>Assignment not found</h1>
          <Link to="/assignments">Back to Assignments</Link>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Header />
      <NavigationMenu />

      <main className="page-content">
        <h1>{isEditMode ? "Edit Assignment" : "Create Assignment"}</h1>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              type="text"
              defaultValue={isEditMode && assignment ? assignment.title : ""}
              placeholder="Finish physics homework"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              defaultValue={
                isEditMode && assignment ? assignment.description : ""
              }
              placeholder="Describe the assignment or task."
            />
          </label>

          <label>
            Deadline
            <input
              name="deadline"
              type="date"
              defaultValue={isEditMode && assignment ? assignment.deadline : ""}
            />
          </label>

          <label>
            Status
            <select
              name="status"
              defaultValue={
                isEditMode && assignment ? assignment.status : "Planned"
              }
            >
              <option>Planned</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>

          <label>
            Related Study Goal
            <select
              name="studyGoalId"
              defaultValue={
                isEditMode && assignment && assignment.studyGoalId
                  ? assignment.studyGoalId
                  : ""
              }
            >
              <option value="">No related study goal</option>
              {studyGoals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.title}
                </option>
              ))}
            </select>
          </label>

          <div className="action-row">
            <button type="submit" className="primary-button">
              {isEditMode ? "Save Changes" : "Create Assignment"}
            </button>

            <Link to="/assignments">Cancel</Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default AssignmentFormPage;