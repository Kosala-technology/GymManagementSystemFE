// --------------------------------------------------
// Forward Fit sample customer
// --------------------------------------------------

// Frontend sample data only.
// This information is not received from a backend API.
export const sampleWorkoutCustomer = {
  id: "FF-2026-00124",
  name: "Kosala Lakshan",
  membershipType: "Premium Membership",
  fitnessGoal: "Build Muscle and Improve Strength",
  assignedTrainer: "Daniel Perera",
  programName: "Personal Strength Development",
  programWeek: 3,
};

// --------------------------------------------------
// Gym exercise library
// --------------------------------------------------

// In the future, the administrator will manage this library.
// Videos are intentionally left empty until the admin adds them.
export const exerciseLibrary = [
  {
    id: "exercise-001",
    exerciseName: "Treadmill Warm-up",
    category: "Warm-up",
    equipment: "Treadmill",
    categoryIcon: "mdi-run",
    defaultSets: 1,
    defaultRepetitions: "10 minutes",
    defaultRestTime: "No rest",
    trainerInstructions:
      "Begin at a comfortable walking speed and gradually increase the pace. Keep your posture upright and breathe normally.",
    videoUrl: "",
  },
  {
    id: "exercise-002",
    exerciseName: "Arm Circle Warm-up",
    category: "Mobility",
    equipment: "No equipment",
    categoryIcon: "mdi-human-handsup",
    defaultSets: 2,
    defaultRepetitions: "15 rotations",
    defaultRestTime: "20 seconds",
    trainerInstructions:
      "Keep your arms straight and perform controlled forward and backward circles without shrugging your shoulders.",
    videoUrl: "",
  },
  {
    id: "exercise-003",
    exerciseName: "Bodyweight Squat",
    category: "Lower Body",
    equipment: "No equipment",
    categoryIcon: "mdi-weight-lifter",
    defaultSets: 3,
    defaultRepetitions: "15 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Keep your chest lifted, push your hips backward and keep your knees aligned with your toes.",
    videoUrl: "",
  },
  {
    id: "exercise-004",
    exerciseName: "Dumbbell Bench Press",
    category: "Chest",
    equipment: "Dumbbells and Flat Bench",
    categoryIcon: "mdi-dumbbell",
    defaultSets: 4,
    defaultRepetitions: "10–12 reps",
    defaultRestTime: "75 seconds",
    trainerInstructions:
      "Keep both feet on the floor. Lower the dumbbells slowly to chest level and press upward without locking your elbows.",
    videoUrl: "",
  },
  {
    id: "exercise-005",
    exerciseName: "Incline Dumbbell Press",
    category: "Upper Chest",
    equipment: "Dumbbells and Incline Bench",
    categoryIcon: "mdi-dumbbell",
    defaultSets: 3,
    defaultRepetitions: "10 reps",
    defaultRestTime: "75 seconds",
    trainerInstructions:
      "Set the bench to approximately 30 degrees. Keep your shoulder blades stable and control the dumbbells throughout the movement.",
    videoUrl: "",
  },
  {
    id: "exercise-006",
    exerciseName: "Cable Chest Fly",
    category: "Chest",
    equipment: "Cable Machine",
    categoryIcon: "mdi-cable-data",
    defaultSets: 3,
    defaultRepetitions: "12–15 reps",
    defaultRestTime: "60 seconds",
    trainerInstructions:
      "Maintain a slight bend in your elbows and bring both handles together using a controlled arc.",
    videoUrl: "",
  },
  {
    id: "exercise-007",
    exerciseName: "Wide-Grip Lat Pulldown",
    category: "Back",
    equipment: "Lat Pulldown Machine",
    categoryIcon: "mdi-arm-flex",
    defaultSets: 4,
    defaultRepetitions: "10–12 reps",
    defaultRestTime: "75 seconds",
    trainerInstructions:
      "Keep your chest lifted and pull the bar toward your upper chest by driving your elbows downward.",
    videoUrl: "",
  },
  {
    id: "exercise-008",
    exerciseName: "Seated Cable Row",
    category: "Back",
    equipment: "Cable Row Machine",
    categoryIcon: "mdi-rowing",
    defaultSets: 3,
    defaultRepetitions: "12 reps",
    defaultRestTime: "60 seconds",
    trainerInstructions:
      "Keep your spine neutral. Pull the handle toward your abdomen and squeeze your shoulder blades together.",
    videoUrl: "",
  },
  {
    id: "exercise-009",
    exerciseName: "Seated Dumbbell Shoulder Press",
    category: "Shoulders",
    equipment: "Dumbbells and Bench",
    categoryIcon: "mdi-dumbbell",
    defaultSets: 3,
    defaultRepetitions: "10 reps",
    defaultRestTime: "60 seconds",
    trainerInstructions:
      "Keep your back supported and avoid arching your lower back while pressing the dumbbells upward.",
    videoUrl: "",
  },
  {
    id: "exercise-010",
    exerciseName: "Dumbbell Lateral Raise",
    category: "Shoulders",
    equipment: "Dumbbells",
    categoryIcon: "mdi-human-handsup",
    defaultSets: 3,
    defaultRepetitions: "12–15 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Use a light weight and raise both arms to shoulder height. Avoid swinging your body.",
    videoUrl: "",
  },
  {
    id: "exercise-011",
    exerciseName: "Barbell Back Squat",
    category: "Legs",
    equipment: "Barbell and Squat Rack",
    categoryIcon: "mdi-weight-lifter",
    defaultSets: 4,
    defaultRepetitions: "8–10 reps",
    defaultRestTime: "90 seconds",
    trainerInstructions:
      "Brace your core before descending. Keep your knees aligned with your toes and drive upward through your heels.",
    videoUrl: "",
  },
  {
    id: "exercise-012",
    exerciseName: "Leg Press",
    category: "Legs",
    equipment: "Leg Press Machine",
    categoryIcon: "mdi-seat-recline-extra",
    defaultSets: 4,
    defaultRepetitions: "12 reps",
    defaultRestTime: "75 seconds",
    trainerInstructions:
      "Place your feet shoulder-width apart and lower the platform without allowing your lower back to lift.",
    videoUrl: "",
  },
  {
    id: "exercise-013",
    exerciseName: "Romanian Deadlift",
    category: "Hamstrings",
    equipment: "Barbell",
    categoryIcon: "mdi-weight-lifter",
    defaultSets: 4,
    defaultRepetitions: "8–10 reps",
    defaultRestTime: "90 seconds",
    trainerInstructions:
      "Keep the bar close to your legs, maintain a neutral spine and push your hips backward slowly.",
    videoUrl: "",
  },
  {
    id: "exercise-014",
    exerciseName: "Walking Lunges",
    category: "Legs and Glutes",
    equipment: "Dumbbells",
    categoryIcon: "mdi-walk",
    defaultSets: 3,
    defaultRepetitions: "12 reps each leg",
    defaultRestTime: "60 seconds",
    trainerInstructions:
      "Take controlled steps and lower your back knee toward the floor while keeping your front knee stable.",
    videoUrl: "",
  },
  {
    id: "exercise-015",
    exerciseName: "Standing Calf Raise",
    category: "Calves",
    equipment: "Calf Raise Machine",
    categoryIcon: "mdi-weight-lifter",
    defaultSets: 4,
    defaultRepetitions: "15 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Rise onto the balls of your feet, pause briefly at the top and lower your heels under control.",
    videoUrl: "",
  },
  {
    id: "exercise-016",
    exerciseName: "Dumbbell Biceps Curl",
    category: "Biceps",
    equipment: "Dumbbells",
    categoryIcon: "mdi-arm-flex",
    defaultSets: 3,
    defaultRepetitions: "12 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Keep your elbows close to your body and avoid using momentum when lifting the dumbbells.",
    videoUrl: "",
  },
  {
    id: "exercise-017",
    exerciseName: "Cable Triceps Pushdown",
    category: "Triceps",
    equipment: "Cable Machine",
    categoryIcon: "mdi-arm-flex-outline",
    defaultSets: 3,
    defaultRepetitions: "12–15 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Keep your elbows stationary beside your body and fully extend your arms without leaning forward.",
    videoUrl: "",
  },
  {
    id: "exercise-018",
    exerciseName: "Forearm Plank",
    category: "Core",
    equipment: "Exercise Mat",
    categoryIcon: "mdi-meditation",
    defaultSets: 3,
    defaultRepetitions: "45-second hold",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Keep your body in a straight line and tighten your abdominal and glute muscles throughout the hold.",
    videoUrl: "",
  },
  {
    id: "exercise-019",
    exerciseName: "Hanging Knee Raise",
    category: "Core",
    equipment: "Pull-up Station",
    categoryIcon: "mdi-gymnastics",
    defaultSets: 3,
    defaultRepetitions: "12 reps",
    defaultRestTime: "45 seconds",
    trainerInstructions:
      "Avoid swinging your body. Raise both knees using your abdominal muscles and lower them slowly.",
    videoUrl: "",
  },
  {
    id: "exercise-020",
    exerciseName: "Full Body Cool-down Stretch",
    category: "Recovery",
    equipment: "Exercise Mat",
    categoryIcon: "mdi-yoga",
    defaultSets: 1,
    defaultRepetitions: "8 minutes",
    defaultRestTime: "No rest",
    trainerInstructions:
      "Move slowly through each stretch and maintain relaxed breathing. Do not force any uncomfortable position.",
    videoUrl: "",
  },
];

// --------------------------------------------------
// Helper function
// --------------------------------------------------

// Build a customer exercise assignment from the exercise library.
// The spread operator creates a separate editable object.
const createAssignedExercise = (
  exerciseId,
  order,
  customValues = {},
) => {
  const libraryExercise = exerciseLibrary.find(
    (exercise) => exercise.id === exerciseId,
  );

  if (!libraryExercise) {
    throw new Error(
      `Exercise "${exerciseId}" was not found in the sample library.`,
    );
  }

  return {
    ...libraryExercise,
    assignmentId: `${customValues.scheduleId}-${exerciseId}`,
    order,
    sets: customValues.sets ?? libraryExercise.defaultSets,
    repetitions:
      customValues.repetitions ??
      libraryExercise.defaultRepetitions,
    restTime:
      customValues.restTime ??
      libraryExercise.defaultRestTime,
    trainerInstructions:
      customValues.trainerInstructions ??
      libraryExercise.trainerInstructions,
    status: customValues.status ?? "Pending",
  };
};

// --------------------------------------------------
// Daily customer workout schedules
// --------------------------------------------------

// A daily schedule can contain any number of exercises.
// The number is decided by the administrator.
export const sampleDailySchedules = [
  {
    id: "schedule-monday-001",
    customerId: sampleWorkoutCustomer.id,
    scheduledDate: "2026-09-07",
    workoutDay: "Monday",
    workoutDate: "07 September 2026",
    scheduledTime: "6:00 PM",
    scheduleName: "Upper Body Strength",
    assignedTrainer: sampleWorkoutCustomer.assignedTrainer,
    estimatedDuration: "75 minutes",

    exercises: [
      createAssignedExercise("exercise-001", 1, {
        scheduleId: "schedule-monday-001",
        status: "Completed",
      }),
      createAssignedExercise("exercise-002", 2, {
        scheduleId: "schedule-monday-001",
        status: "Completed",
      }),
      createAssignedExercise("exercise-004", 3, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-005", 4, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-006", 5, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-007", 6, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-008", 7, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-009", 8, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-010", 9, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-016", 10, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-017", 11, {
        scheduleId: "schedule-monday-001",
      }),
      createAssignedExercise("exercise-020", 12, {
        scheduleId: "schedule-monday-001",
      }),
    ],
  },

  {
    id: "schedule-wednesday-001",
    customerId: sampleWorkoutCustomer.id,
    scheduledDate: "2026-09-09",
    workoutDay: "Wednesday",
    workoutDate: "09 September 2026",
    scheduledTime: "6:00 PM",
    scheduleName: "Lower Body Development",
    assignedTrainer: sampleWorkoutCustomer.assignedTrainer,
    estimatedDuration: "70 minutes",

    exercises: [
      createAssignedExercise("exercise-001", 1, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-003", 2, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-011", 3, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-012", 4, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-013", 5, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-014", 6, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-015", 7, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-018", 8, {
        scheduleId: "schedule-wednesday-001",
      }),
      createAssignedExercise("exercise-020", 9, {
        scheduleId: "schedule-wednesday-001",
      }),
    ],
  },

  {
    id: "schedule-saturday-001",
    customerId: sampleWorkoutCustomer.id,
    scheduledDate: "2026-09-12",
    workoutDay: "Saturday",
    workoutDate: "12 September 2026",
    scheduledTime: "8:00 AM",
    scheduleName: "Complete Full Body Session",
    assignedTrainer: sampleWorkoutCustomer.assignedTrainer,
    estimatedDuration: "110 minutes",

    // Example daily schedule containing 20 exercises
    exercises: exerciseLibrary.map((exercise, index) =>
      createAssignedExercise(exercise.id, index + 1, {
        scheduleId: "schedule-saturday-001",
      }),
    ),
  },
];

// --------------------------------------------------
// Filter options
// --------------------------------------------------

export const workoutFilterOptions = [
  {
    label: "All Workouts",
    value: "all",
    icon: "mdi-view-grid-outline",
  },
  {
    label: "Today",
    value: "today",
    icon: "mdi-calendar-today-outline",
  },
  {
    label: "Completed",
    value: "completed",
    icon: "mdi-check-circle-outline",
  },
  {
    label: "Pending",
    value: "pending",
    icon: "mdi-clock-outline",
  },
];

// --------------------------------------------------
// Temporary compatibility export
// --------------------------------------------------

// This keeps the existing WorkoutScheduleView working until
// it is replaced with the new daily-session layout.
export const sampleWorkouts = sampleDailySchedules.flatMap(
  (schedule) =>
    schedule.exercises.map((exercise) => ({
      ...exercise,
      id: exercise.assignmentId,
      workoutDay: schedule.workoutDay,
      scheduledTime: schedule.scheduledTime,
      estimatedDuration: schedule.estimatedDuration,
    })),
);