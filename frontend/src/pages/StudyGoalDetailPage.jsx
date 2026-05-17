import { Link, useParams } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function StudyGoalDetailPage({ studyGoals, assignments }) {
  const { id } = useParams();

  const goal = studyGoals.find((item) => item.id === id);
  const relatedAssignments = assignments.filter(
    (assignment) => assignment.studyGoalId === id
  );

  if (!goal) {
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
        <h1>{goal.title}</h1>
        <p className="page-description">{goal.description}</p>

        <section className="detail-card">
          <p>
            <strong>Subject:</strong> {goal.subject}
          </p>
          <p>
            <strong>Status:</strong> {goal.status}
          </p>
        </section>

        <section className="detail-card">
          <div className="page-header-row">
            <h2>Related Assignments</h2>
            <Link to="/assignments/create" className="button-link">
              Create Assignment
            </Link>
          </div>

          {relatedAssignments.length === 0 ? (
            <p>No assignments are connected to this study goal.</p>
          ) : (
            <ul>
              {relatedAssignments.map((assignment) => (
                <li key={assignment.id}>
                  <Link to={`/assignments/${assignment.id}`}>
                    {assignment.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="action-row">
          <Link to="/study-goals">Back</Link>
          <Link to={`/study-goals/${goal.id}/edit`}>Edit</Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default StudyGoalDetailPage;