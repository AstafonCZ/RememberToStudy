require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = require("./data/db");
const StudyGoal = require("./models/studyGoalModel");
const Assignment = require("./models/assignmentModel");

async function createStudyGoalIfMissing(data) {
  const existing = await StudyGoal.findOne({ title: data.title });

  if (existing) {
    return existing;
  }

  return StudyGoal.create(data);
}

async function createAssignmentIfMissing(data) {
  const existing = await Assignment.findOne({ title: data.title });

  if (existing) {
    return existing;
  }

  return Assignment.create(data);
}

async function seedDemoData() {
  try {
    await connectDb();

    const mathGoal = await createStudyGoalIfMissing({
      title: "Matematická analýza",
      description: "Příprava na zápočet a procvičení typových příkladů.",
      subject: "Matematika",
      status: "In Progress",
    });

    const englishGoal = await createStudyGoalIfMissing({
      title: "Angličtina C1",
      description: "Procvičení slovní zásoby a speaking části.",
      subject: "Angličtina",
      status: "In Progress",
    });

    const architectureGoal = await createStudyGoalIfMissing({
      title: "Softwarová architektura",
      description: "Opakování cloud computingu, mikroservis a návrhu architektury.",
      subject: "Software Architecture",
      status: "Planned",
    });

    await createAssignmentIfMissing({
      title: "Vypracovat prezentaci",
      description: "Dokončit finální prezentaci projektu RememberToStudy.",
      dueDate: "2026-06-01",
      status: "Done",
      studyGoalId: architectureGoal._id.toString(),
    });

    await createAssignmentIfMissing({
      title: "Procvičit slovní zásobu",
      description: "Zopakovat C1 slovíčka pro ústní zkoušku.",
      dueDate: "2026-06-05",
      status: "In Progress",
      studyGoalId: englishGoal._id.toString(),
    });

    await createAssignmentIfMissing({
      title: "Spočítat příklady z derivací",
      description: "Projít typové příklady z matematické analýzy.",
      dueDate: "2026-06-08",
      status: "Planned",
      studyGoalId: mathGoal._id.toString(),
    });

    await createAssignmentIfMissing({
      title: "Připravit demo aplikace",
      description: "Zkontrolovat lokální spuštění aplikace a testovací data.",
      dueDate: "2026-06-02",
      status: "In Progress",
      studyGoalId: architectureGoal._id.toString(),
    });

    console.log("Demo data byla přidána. Nic nebylo smazáno.");
  } catch (error) {
    console.error("Chyba při vytváření demo dat:", error);
  } finally {
    await mongoose.connection.close();
  }
}

seedDemoData();