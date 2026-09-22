// Read assignments created by the admin in this browser.
// No backend API is used.
const assignmentStorageKey = "forwardFitScheduleAssignments:v1";

export const loadCustomerAssignments = (memberId) => {
  try {
    const raw = localStorage.getItem(assignmentStorageKey);

    // No admin assignments have been saved yet.
    if (raw === null) {
      return {
        schedules: [],
        error: "",
      };
    }

    const assignments = JSON.parse(raw);

    if (!Array.isArray(assignments)) {
      throw new Error("Invalid assignment storage.");
    }

    // Check record structure before reading customer IDs.
    const validRecords = assignments.every(
      (assignment) =>
        assignment &&
        typeof assignment.id === "string" &&
        typeof assignment.customerId === "string" &&
        typeof assignment.scheduleName === "string" &&
        typeof assignment.scheduledDate === "string" &&
        typeof assignment.scheduledTime === "string" &&
        Array.isArray(assignment.exercises) &&
        assignment.exercises.every(
          (exercise) =>
            exercise &&
            typeof exercise.assignmentId === "string" &&
            typeof exercise.exerciseName === "string" &&
            Number.isInteger(exercise.order) &&
            ["Pending", "Completed"].includes(exercise.status),
        ),
    );

    if (!validRecords) {
      throw new Error("Invalid assignment record.");
    }

    // Return only the selected customer's schedules.
    const schedules = assignments
      .filter((assignment) => assignment.customerId === memberId)
      .map((assignment) => ({
        ...assignment,

        // Copy and sort exercises in the admin-assigned order.
        exercises: assignment.exercises
          .map((exercise) => ({ ...exercise }))
          .sort((first, second) => first.order - second.order),
      }))
      .sort((first, second) =>
        `${first.scheduledDate} ${first.scheduledTime}`.localeCompare(
          `${second.scheduledDate} ${second.scheduledTime}`,
        ),
      );

    return {
      schedules,
      error: "",
    };
  } catch (error) {
    // Preserve stored records if reading fails.
    return {
      schedules: [],
      error: "Assigned schedules could not be loaded from this browser.",
    };
  }
};
