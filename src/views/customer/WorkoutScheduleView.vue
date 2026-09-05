<template>
  <div class="workout-schedule-page">
    <!-- Existing Forward Fit dashboard header -->
    <DashboardHeader
      :customer-name="customer.name"
      :member-id="customer.id"
      @profile="handleProfile"
      @logout="handleLogout"
    />

    <main class="workout-schedule-page__main">
      <div class="workout-schedule-page__container">
        <!-- Program and weekly progress header -->
        <WorkoutScheduleHeader
          :customer-name="customer.name"
          :member-id="customer.id"
          :program-name="customer.programName"
          :assigned-trainer="customer.assignedTrainer"
          :program-week="customer.programWeek"
          :total-workouts="workoutCounts.all"
          :completed-workouts="workoutCounts.completed"
          :pending-workouts="workoutCounts.pending"
          @back="goToDashboard"
        />

        <!-- Workout filter buttons -->
        <WorkoutFilterTabs
          v-model="selectedFilter"
          :filters="workoutFilterOptions"
          :counts="workoutCounts"
          class="workout-schedule-page__filters"
        />

        <!-- Filter result information -->
        <div class="workout-schedule-page__results-heading">
          <div>
            <span>{{ activeFilterLabel }}</span>

            <h2>
              {{ filteredWorkouts.length }}
              {{ filteredWorkouts.length === 1 ? "Workout" : "Workouts" }}
            </h2>
          </div>

          <p>Status changes are saved automatically in this browser.</p>
        </div>

        <!-- Workout cards -->
        <v-row
          v-if="filteredWorkouts.length"
          class="workout-schedule-page__grid"
        >
          <v-col
            v-for="workout in filteredWorkouts"
            :key="workout.id"
            cols="12"
            lg="6"
          >
            <WorkoutCard
              :workout="workout"
              :is-today="isTodayWorkout(workout)"
              @watch-video="openExerciseVideo"
              @complete="markWorkoutAsCompleted"
            />
          </v-col>
        </v-row>

        <!-- Empty filter result -->
        <v-card v-else class="workout-schedule-page__empty-state">
          <span class="workout-schedule-page__empty-icon">
            <v-icon icon="mdi-calendar-blank-outline" size="40" />
          </span>

          <h3>No workouts found</h3>

          <p>There are no workout records available for the selected filter.</p>

          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-view-grid-outline"
            @click="selectedFilter = 'all'"
          >
            View All Workouts
          </v-btn>
        </v-card>
      </div>
    </main>

    <!-- Selected exercise video -->
    <ExerciseVideoDialog v-model="showVideoDialog" :workout="selectedWorkout" />

    <!-- Page feedback -->
    <v-snackbar
      v-model="feedback.visible"
      :color="feedback.color"
      location="bottom center"
      :timeout="3500"
      rounded="lg"
    >
      <div class="workout-schedule-page__feedback">
        <v-icon :icon="feedback.icon" size="20" />
        <span>{{ feedback.message }}</span>
      </div>

      <template #actions>
        <v-btn variant="text" color="white" @click="feedback.visible = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

import { useRouter } from "vue-router";

import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";
import WorkoutScheduleHeader from "../../components/workout/WorkoutScheduleHeader.vue";
import WorkoutFilterTabs from "../../components/workout/WorkoutFilterTabs.vue";
import WorkoutCard from "../../components/workout/WorkoutCard.vue";
import ExerciseVideoDialog from "../../components/workout/ExerciseVideoDialog.vue";

import {
  sampleWorkoutCustomer,
  sampleWorkouts,
  workoutFilterOptions,
} from "../../data/sampleWorkouts.js";

// Access Vue Router
const router = useRouter();

// Local Storage key used for workout completion statuses
const workoutStatusStorageKey = "forwardFitWorkoutStatuses";

// Sample customer data
// This is not loaded from a backend API
const customer = sampleWorkoutCustomer;

// Create a new editable copy of the sample workout array
const workouts = ref(
  sampleWorkouts.map((workout) => ({
    ...workout,
  })),
);

// Currently selected filter
const selectedFilter = ref("all");

// Selected workout video
const selectedWorkout = ref(null);
const showVideoDialog = ref(false);

// Snackbar feedback state
const feedback = ref({
  visible: false,
  message: "",
  color: "success",
  icon: "mdi-check-circle-outline",
});

// Return today's English weekday name
const currentWorkoutDay = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  }).format(new Date());
});

// Check whether a workout belongs to today
const isTodayWorkout = (workout) => {
  return workout.workoutDay === currentWorkoutDay.value;
};

// Calculate values displayed on filter buttons and progress section
const workoutCounts = computed(() => {
  return {
    all: workouts.value.length,

    today: workouts.value.filter((workout) => isTodayWorkout(workout)).length,

    completed: workouts.value.filter(
      (workout) => workout.status === "Completed",
    ).length,

    pending: workouts.value.filter((workout) => workout.status === "Pending")
      .length,
  };
});

// Filter workouts using the selected filter
const filteredWorkouts = computed(() => {
  switch (selectedFilter.value) {
    case "today":
      return workouts.value.filter((workout) => isTodayWorkout(workout));

    case "completed":
      return workouts.value.filter((workout) => workout.status === "Completed");

    case "pending":
      return workouts.value.filter((workout) => workout.status === "Pending");

    default:
      return workouts.value;
  }
});

// Display the selected filter heading
const activeFilterLabel = computed(() => {
  const activeFilter = workoutFilterOptions.find(
    (filter) => filter.value === selectedFilter.value,
  );

  return activeFilter?.label || "All Workouts";
});

// Display page feedback
const displayFeedback = (
  message,
  color = "success",
  icon = "mdi-check-circle-outline",
) => {
  feedback.value = {
    visible: true,
    message,
    color,
    icon,
  };
};

// Save only workout IDs and statuses in Local Storage
const saveWorkoutStatuses = () => {
  const workoutStatuses = workouts.value.map((workout) => ({
    id: workout.id,
    status: workout.status,
  }));

  localStorage.setItem(
    workoutStatusStorageKey,
    JSON.stringify(workoutStatuses),
  );
};

// Restore saved workout statuses after page refresh
const loadWorkoutStatuses = () => {
  const savedStatuses = localStorage.getItem(workoutStatusStorageKey);

  if (!savedStatuses) {
    return;
  }

  try {
    const parsedStatuses = JSON.parse(savedStatuses);

    // Ignore invalid Local Storage values
    if (!Array.isArray(parsedStatuses)) {
      return;
    }

    workouts.value = workouts.value.map((workout) => {
      const savedWorkout = parsedStatuses.find(
        (item) => item.id === workout.id,
      );

      // Only allow the two supported status values
      const savedStatusIsValid = ["Completed", "Pending"].includes(
        savedWorkout?.status,
      );

      return {
        ...workout,
        status: savedStatusIsValid ? savedWorkout.status : workout.status,
      };
    });
  } catch (error) {
    // Remove corrupted workout data from Local Storage
    localStorage.removeItem(workoutStatusStorageKey);

    console.error("Unable to read saved workout statuses:", error);
  }
};

// Change a Pending workout to Completed
const markWorkoutAsCompleted = (workoutId) => {
  const selectedRecord = workouts.value.find(
    (workout) => workout.id === workoutId,
  );

  if (!selectedRecord) {
    displayFeedback(
      "The selected workout could not be found.",
      "error",
      "mdi-alert-circle-outline",
    );

    return;
  }

  // Prevent unnecessary updates
  if (selectedRecord.status === "Completed") {
    return;
  }

  selectedRecord.status = "Completed";

  // Preserve the change after browser refresh
  saveWorkoutStatuses();

  displayFeedback(`${selectedRecord.exerciseName} marked as completed.`);
};

// Open the selected workout video
const openExerciseVideo = (workout) => {
  selectedWorkout.value = workout;
  showVideoDialog.value = true;
};

// Navigate back to Customer Dashboard
const goToDashboard = () => {
  router.push({
    name: "customer-dashboard",
  });
};

// Profile page will be developed later
const handleProfile = () => {
  displayFeedback(
    "The Customer Profile page will be added later.",
    "info",
    "mdi-information-outline",
  );
};

// Logout the customer
const handleLogout = async () => {
  localStorage.removeItem("forwardFitCustomerAuthenticated");

  sessionStorage.removeItem("forwardFitCustomerAuthenticated");

  await router.replace({
    name: "login",
  });
};

// Load stored completion states when the page opens
onMounted(() => {
  loadWorkoutStatuses();
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/workout-schedule.scss"
></style>
