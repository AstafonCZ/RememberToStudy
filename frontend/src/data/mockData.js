export const studyGoals = [
  {
    id: "1",
    title: "Learn how to calculate gravity",
    description: "Understand how gravity affects a falling object near Earth.",
    subject: "Physics",
    status: "In Progress",
  },
  {
    id: "2",
    title: "Improve React knowledge",
    description: "Practice routing, components and basic CRUD screens.",
    subject: "Frontend Development",
    status: "Planned",
  },
];

export const assignments = [
  {
    id: "1",
    title: "Finish physics homework",
    description: "Calculate examples about falling objects.",
    dueDate: "2026-05-23",
    status: "In Progress",
    studyGoalId: "1",
  },
  {
    id: "2",
    title: "Create React routes",
    description: "Prepare all frontend routes for the RememberToStudy app.",
    dueDate: "2026-05-25",
    status: "Planned",
    studyGoalId: "2",
  },
  {
    id: "3",
    title: "Take out trash",
    description: "Simple personal task without a study goal connection.",
    dueDate: "2026-05-18",
    status: "Planned",
    studyGoalId: null,
  },
];