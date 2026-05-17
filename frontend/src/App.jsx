import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage.jsx";
import StudyGoalListPage from "./pages/StudyGoalListPage.jsx";
import StudyGoalDetailPage from "./pages/StudyGoalDetailPage.jsx";
import StudyGoalFormPage from "./pages/StudyGoalFormPage.jsx";
import AssignmentListPage from "./pages/AssignmentListPage.jsx";
import AssignmentDetailPage from "./pages/AssignmentDetailPage.jsx";
import AssignmentFormPage from "./pages/AssignmentFormPage.jsx";

import { api } from "./api/api.js";

function App() {
  const [studyGoals, setStudyGoals] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const loadData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const [loadedStudyGoals, loadedAssignments] = await Promise.all([
        api.listStudyGoals(),
        api.listAssignments(),
      ]);

      setStudyGoals(loadedStudyGoals);
      setAssignments(loadedAssignments);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const createStudyGoal = async (studyGoalData) => {
    const createdStudyGoal = await api.createStudyGoal(studyGoalData);
    setStudyGoals((currentStudyGoals) => [createdStudyGoal, ...currentStudyGoals]);
  };

  const updateStudyGoal = async (id, studyGoalData) => {
    const updatedStudyGoal = await api.updateStudyGoal(id, studyGoalData);

    setStudyGoals((currentStudyGoals) =>
      currentStudyGoals.map((studyGoal) =>
        studyGoal.id === id ? updatedStudyGoal : studyGoal
      )
    );
  };

  const deleteStudyGoal = async (id) => {
    await api.deleteStudyGoal(id);

    setStudyGoals((currentStudyGoals) =>
      currentStudyGoals.filter((studyGoal) => studyGoal.id !== id)
    );

    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.studyGoalId !== id)
    );
  };

  const createAssignment = async (assignmentData) => {
    const createdAssignment = await api.createAssignment(assignmentData);
    setAssignments((currentAssignments) => [createdAssignment, ...currentAssignments]);
  };

  const updateAssignment = async (id, assignmentData) => {
    const updatedAssignment = await api.updateAssignment(id, assignmentData);

    setAssignments((currentAssignments) =>
      currentAssignments.map((assignment) =>
        assignment.id === id ? updatedAssignment : assignment
      )
    );
  };

  const deleteAssignment = async (id) => {
    await api.deleteAssignment(id);

    setAssignments((currentAssignments) =>
      currentAssignments.filter((assignment) => assignment.id !== id)
    );
  };

  if (isLoading) {
    return <p className="loading-message">Loading application data...</p>;
  }

  if (errorMessage) {
    return (
      <div className="loading-message">
        <h1>Backend connection failed</h1>
        <p>{errorMessage}</p>
        <button type="button" className="primary-button" onClick={loadData}>
          Try again
        </button>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<DashboardPage studyGoals={studyGoals} assignments={assignments} />}
      />

      <Route
        path="/study-goals"
        element={
          <StudyGoalListPage
            studyGoals={studyGoals}
            onDeleteStudyGoal={deleteStudyGoal}
          />
        }
      />

      <Route
        path="/study-goals/create"
        element={
          <StudyGoalFormPage
            mode="create"
            studyGoals={studyGoals}
            onCreateStudyGoal={createStudyGoal}
            onUpdateStudyGoal={updateStudyGoal}
          />
        }
      />

      <Route
        path="/study-goals/:id"
        element={
          <StudyGoalDetailPage studyGoals={studyGoals} assignments={assignments} />
        }
      />

      <Route
        path="/study-goals/:id/edit"
        element={
          <StudyGoalFormPage
            mode="edit"
            studyGoals={studyGoals}
            onCreateStudyGoal={createStudyGoal}
            onUpdateStudyGoal={updateStudyGoal}
          />
        }
      />

      <Route
        path="/assignments"
        element={
          <AssignmentListPage
            assignments={assignments}
            studyGoals={studyGoals}
            onDeleteAssignment={deleteAssignment}
          />
        }
      />

      <Route
        path="/assignments/create"
        element={
          <AssignmentFormPage
            mode="create"
            assignments={assignments}
            studyGoals={studyGoals}
            onCreateAssignment={createAssignment}
            onUpdateAssignment={updateAssignment}
          />
        }
      />

      <Route
        path="/assignments/:id"
        element={
          <AssignmentDetailPage assignments={assignments} studyGoals={studyGoals} />
        }
      />

      <Route
        path="/assignments/:id/edit"
        element={
          <AssignmentFormPage
            mode="edit"
            assignments={assignments}
            studyGoals={studyGoals}
            onCreateAssignment={createAssignment}
            onUpdateAssignment={updateAssignment}
          />
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;