import { Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function AssignmentListPage({ assignments, studyGoals, onDeleteAssignment }) {
  const getStudyGoalTitle = (studyGoalId) => {
    const goal = studyGoals.find((item) => item.id === studyGoalId);
    return goal ? goal.title : "No related study goal";
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this assignment?"
    );

    if (confirmed) {
      try {
        await onDeleteAssignment(id);
      } catch (error) {
        window.alert(error.message);
      }
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <NavigationMenu />

      <main className="page-content">
        <div className="page-header-row">
          <div>
            <h1>Assignments</h1>
            <p className="page-description">
              List of assignments and tasks created by the user.
            </p>
          </div>

          <Link to="/assignments/create" className="button-link">
            Create Assignment
          </Link>
        </div>

        {assignments.length === 0 ? (
          <section className="detail-card">
            <p>No assignments have been created yet.</p>
          </section>
        ) : (
          <section className="card-list">
            {assignments.map((assignment) => (
              <article key={assignment.id} className="item-card">
                <h2>{assignment.title}</h2>
                <p>{assignment.description}</p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {assignment.deadline || "No deadline"}
                </p>

                <p>
                  <strong>Status:</strong> {assignment.status}
                </p>

                <p>
                  <strong>Study Goal:</strong>{" "}
                  {getStudyGoalTitle(assignment.studyGoalId)}
                </p>

                <div className="action-row">
                  <Link to={`/assignments/${assignment.id}`}>Detail</Link>
                  <Link to={`/assignments/${assignment.id}/edit`}>Edit</Link>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default AssignmentListPage;