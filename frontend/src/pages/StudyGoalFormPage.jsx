import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function StudyGoalFormPage({
  mode,
  studyGoals,
  onCreateStudyGoal,
  onUpdateStudyGoal,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = mode === "edit";
  const goal = studyGoals.find((item) => item.id === id);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const studyGoalData = {
      title: formData.get("title").trim(),
      description: formData.get("description").trim(),
      subject: formData.get("subject").trim(),
      status: formData.get("status"),
    };

    if (!studyGoalData.title || !studyGoalData.description) {
      window.alert("Title and description are required.");
      return;
    }

    if (isEditMode) {
      onUpdateStudyGoal(id, studyGoalData);
      navigate(`/study-goals/${id}`);
    } else {
      onCreateStudyGoal(studyGoalData);
      navigate("/study-goals");
    }
  };

  if (isEditMode && !goal) {
    return (
      <div className="app-layout">
        <Header />
        <NavigationMenu />
        <main className="page-content">
          <h1>Study Goal not found</h1>
          <Link to="/study-goals">Back to Study Goals</Link>
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
        <h1>{isEditMode ? "Edit Study Goal" : "Create Study Goal"}</h1>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Title
            <input
              name="title"
              type="text"
              defaultValue={isEditMode && goal ? goal.title : ""}
              placeholder="Learn how to calculate gravity"
            />
          </label>

          <label>
            Description
            <textarea
              name="description"
              defaultValue={isEditMode && goal ? goal.description : ""}
              placeholder="Describe what you want to learn."
            />
          </label>

          <label>
            Subject
            <input
              name="subject"
              type="text"
              defaultValue={isEditMode && goal ? goal.subject : ""}
              placeholder="Physics"
            />
          </label>

          <label>
            Status
            <select
              name="status"
              defaultValue={isEditMode && goal ? goal.status : "Planned"}
            >
              <option>Planned</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
          </label>

          <div className="action-row">
            <button type="submit" className="primary-button">
              {isEditMode ? "Save Changes" : "Create Study Goal"}
            </button>
            <Link to="/study-goals">Cancel</Link>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default StudyGoalFormPage;