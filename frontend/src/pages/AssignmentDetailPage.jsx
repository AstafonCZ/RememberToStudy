import { Link, useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function AssignmentDetailPage({ assignments, studyGoals }) {
  const { id } = useParams();

  const assignment = assignments.find((item) => item.id === id);
  const relatedGoal = assignment
    ? studyGoals.find((goal) => goal.id === assignment.studyGoalId)
    : null;

  if (!assignment) {
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
        <h1>{assignment.title}</h1>
        <p className="page-description">{assignment.description}</p>

        <section className="detail-card">
          <p>
            <strong>Deadline:</strong> {assignment.deadline || "No deadline"}
          </p>

          <p>
            <strong>Status:</strong> {assignment.status}
          </p>

          <p>
            <strong>Related Study Goal:</strong>{" "}
            {relatedGoal ? (
              <Link to={`/study-goals/${relatedGoal.id}`}>
                {relatedGoal.title}
              </Link>
            ) : (
              "No related study goal"
            )}
          </p>
        </section>

        <div className="action-row">
          <Link to="/assignments">Back</Link>
          <Link to={`/assignments/${assignment.id}/edit`}>Edit</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AssignmentDetailPage;