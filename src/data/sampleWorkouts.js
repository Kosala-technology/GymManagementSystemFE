// --------------------------------------------------
// Forward Fit frontend sample customer information
// --------------------------------------------------

// This is local sample data only.
// It does not represent information received from a backend API.
export const sampleWorkoutCustomer = {
  id: "FF-2026-00124",
  name: "Kosala Lakshan",
  membershipType: "Premium Membership",
  fitnessGoal: "Build Muscle and Improve Strength",
  assignedTrainer: "Daniel Perera",
  programName: "Strength Foundation Program",
  programWeek: 3,
};

// --------------------------------------------------
// Personalized weekly workout schedule
// --------------------------------------------------

// Every workout has a stable ID.
// These IDs will later be used to save completion status
// inside the browser's Local Storage.
export const sampleWorkouts = [
  {
    id: "workout-monday-01",
    workoutDay: "Monday",
    exerciseName: "Dumbbell Bench Press",
    category: "Chest and Triceps",
    categoryIcon: "mdi-arm-flex-outline",
    sets: 4,
    repetitions: "10–12 reps",
    restTime: "75 seconds",
    scheduledTime: "6:30 PM",
    estimatedDuration: "35 minutes",

    trainerInstructions:
      "Keep both feet firmly on the floor. Lower the dumbbells slowly until they reach chest level, then press upward without locking your elbows.",

    status: "Completed",

    // External instructional video used only as sample content
    videoTitle: "How to perform a Dumbbell Bench Press",
    videoUrl: "https://www.youtube-nocookie.com/embed/VmB1G1K7v94",
    videoSourceUrl: "https://www.youtube.com/watch?v=VmB1G1K7v94",
  },

  {
    id: "workout-tuesday-01",
    workoutDay: "Tuesday",
    exerciseName: "Barbell Back Squat",
    category: "Legs and Glutes",
    categoryIcon: "mdi-weight-lifter",
    sets: 4,
    repetitions: "8–10 reps",
    restTime: "90 seconds",
    scheduledTime: "6:30 PM",
    estimatedDuration: "40 minutes",

    trainerInstructions:
      "Keep your chest lifted and brace your core before descending. Push your knees in the same direction as your toes and drive upward through your heels.",

    status: "Completed",

    videoTitle: "How to perform a Barbell Squat",
    videoUrl: "https://www.youtube-nocookie.com/embed/gcNh17Ckjgg",
    videoSourceUrl: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
  },

  {
    id: "workout-wednesday-01",
    workoutDay: "Wednesday",
    exerciseName: "Wide-Grip Lat Pulldown",
    category: "Back and Biceps",
    categoryIcon: "mdi-arm-flex",
    sets: 4,
    repetitions: "10–12 reps",
    restTime: "75 seconds",
    scheduledTime: "6:00 PM",
    estimatedDuration: "35 minutes",

    trainerInstructions:
      "Keep your torso slightly leaned back. Pull the bar toward your upper chest while driving your elbows downward. Avoid using body momentum.",

    status: "Pending",

    videoTitle: "How to perform a Lat Pulldown",
    videoUrl: "https://www.youtube-nocookie.com/embed/CAwf7n6Luuc",
    videoSourceUrl: "https://www.youtube.com/watch?v=CAwf7n6Luuc",
  },

  {
    id: "workout-thursday-01",
    workoutDay: "Thursday",
    exerciseName: "Seated Dumbbell Shoulder Press",
    category: "Shoulders",
    categoryIcon: "mdi-dumbbell",
    sets: 3,
    repetitions: "10 reps",
    restTime: "60 seconds",
    scheduledTime: "6:30 PM",
    estimatedDuration: "30 minutes",

    trainerInstructions:
      "Keep your back supported by the bench and avoid arching your lower back. Press the dumbbells upward with controlled movement.",

    status: "Pending",

    videoTitle: "How to perform a Dumbbell Shoulder Press",
    videoUrl: "https://www.youtube-nocookie.com/embed/qEwKCR5JCog",
    videoSourceUrl: "https://www.youtube.com/watch?v=qEwKCR5JCog",
  },

  {
    id: "workout-friday-01",
    workoutDay: "Friday",
    exerciseName: "Romanian Deadlift",
    category: "Hamstrings and Glutes",
    categoryIcon: "mdi-weight-lifter",
    sets: 4,
    repetitions: "8–10 reps",
    restTime: "90 seconds",
    scheduledTime: "6:00 PM",
    estimatedDuration: "35 minutes",

    trainerInstructions:
      "Maintain a neutral spine and keep the bar close to your legs. Push your hips backward until you feel tension in the hamstrings, then return to standing.",

    status: "Pending",

    videoTitle: "How to perform a Romanian Deadlift",
    videoUrl: "https://www.youtube-nocookie.com/embed/JCXUYuzwNrM",
    videoSourceUrl: "https://www.youtube.com/watch?v=JCXUYuzwNrM",
  },

  {
    id: "workout-saturday-01",
    workoutDay: "Saturday",
    exerciseName: "Forearm Plank",
    category: "Core Stability",
    categoryIcon: "mdi-meditation",
    sets: 3,
    repetitions: "45-second hold",
    restTime: "45 seconds",
    scheduledTime: "8:00 AM",
    estimatedDuration: "20 minutes",

    trainerInstructions:
      "Keep your body in a straight line from your head to your heels. Tighten your core and glutes while maintaining steady breathing.",

    status: "Pending",

    videoTitle: "Plank exercise for beginners",
    videoUrl: "https://www.youtube-nocookie.com/embed/ASdvN_XEl_c",
    videoSourceUrl: "https://www.youtube.com/watch?v=ASdvN_XEl_c",
  },

  {
    id: "workout-sunday-01",
    workoutDay: "Sunday",
    exerciseName: "Full Body Mobility Flow",
    category: "Recovery and Mobility",
    categoryIcon: "mdi-yoga",
    sets: 2,
    repetitions: "10 minutes",
    restTime: "60 seconds",
    scheduledTime: "8:30 AM",
    estimatedDuration: "25 minutes",

    trainerInstructions:
      "Perform every movement slowly without forcing the joints. Focus on controlled breathing and stop if you experience sharp pain.",

    status: "Pending",

    videoTitle: "Full body recovery and mobility routine",
    videoUrl: "https://www.youtube-nocookie.com/embed/v7AYKMP6rOE",
    videoSourceUrl: "https://www.youtube.com/watch?v=v7AYKMP6rOE",
  },
];

// Filter options displayed on the Workout Schedule page
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
