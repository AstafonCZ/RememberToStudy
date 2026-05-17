const API_BASE_URL = "http://localhost:3000";

const request = async (url, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }

  return data;
};

export const api = {
  listStudyGoals: () => request("/studyGoal/list"),

  createStudyGoal: (studyGoalData) =>
    request("/studyGoal/create", {
      method: "POST",
      body: JSON.stringify(studyGoalData),
    }),

  updateStudyGoal: (id, studyGoalData) =>
    request("/studyGoal/update", {
      method: "PUT",
      body: JSON.stringify({
        id,
        ...studyGoalData,
      }),
    }),

  deleteStudyGoal: (id) =>
    request(`/studyGoal/delete?id=${id}`, {
      method: "DELETE",
    }),

  listAssignments: () => request("/assignment/list"),

  createAssignment: (assignmentData) =>
    request("/assignment/create", {
      method: "POST",
      body: JSON.stringify(assignmentData),
    }),

  updateAssignment: (id, assignmentData) =>
    request("/assignment/update", {
      method: "PUT",
      body: JSON.stringify({
        id,
        ...assignmentData,
      }),
    }),

  deleteAssignment: (id) =>
    request(`/assignment/delete?id=${id}`, {
      method: "DELETE",
    }),
};