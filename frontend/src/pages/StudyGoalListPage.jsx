import { Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function StudyGoalListPage({ studyGoals, onDeleteStudyGoal }) {
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Do you really want to delete this study goal?"
    );

    if (confirmed) {
      onDeleteStudyGoal(id);
    }
  };

  return (
    <div className="app-layout">
      <Header />
      <NavigationMenu />

      <main className="page-content">
        <div className="page-header-row">
          <div>
            <h1>Study Goals</h1>
            <p className="page-description">
              List of learning goals created by the user.
            </p>
          </div>

          <Link to="/study-goals/create" className="button-link">
            Create Study Goal
          </Link>
        </div>

        {studyGoals.length === 0 ? (
          <section className="detail-card">
            <p>No study goals have been created yet.</p>
          </section>
        ) : (
          <section className="card-list">
            {studyGoals.map((goal) => (
              <article key={goal.id} className="item-card">
                <h2>{goal.title}</h2>
                <p>{goal.description}</p>
                <p>
                  <strong>Subject:</strong> {goal.subject}
                </p>
                <p>
                  <strong>Status:</strong> {goal.status}
                </p>

                <div className="action-row">
                  <Link to={`/study-goals/${goal.id}`}>Detail</Link>
                  <Link to={`/study-goals/${goal.id}/edit`}>Edit</Link>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDelete(goal.id)}
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

export default StudyGoalListPage;