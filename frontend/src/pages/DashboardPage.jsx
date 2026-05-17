import { Link } from "react-router-dom";

import Header from "../components/Header.jsx";
import NavigationMenu from "../components/NavigationMenu.jsx";
import Footer from "../components/Footer.jsx";

function DashboardPage({ studyGoals, assignments }) {
  return (
    <div className="app-layout">
      <Header />
      <NavigationMenu />

      <main className="page-content">
        <h1>Dashboard</h1>
        <p className="page-description">
          Welcome to RememberToStudy. Use this dashboard to navigate between
          your study goals and assignments.
        </p>

        <section className="dashboard-grid">
          <article className="summary-card">
            <h2>Study Goals</h2>
            <p>{studyGoals.length} study goals available.</p>
            <Link to="/study-goals" className="button-link">
              Open Study Goals
            </Link>
          </article>

          <article className="summary-card">
            <h2>Assignments</h2>
            <p>{assignments.length} assignments available.</p>
            <Link to="/assignments" className="button-link">
              Open Assignments
            </Link>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default DashboardPage;