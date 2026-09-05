<template>
  <div class="workout-schedule-page">
    <DashboardHeader
      :customer-name="customer.name"
      :member-id="customer.id"
      @profile="handleProfile"
      @logout="handleLogout"
    />

    <main class="workout-schedule-page__main">
      <div class="workout-schedule-page__container">
        <!-- Weekly schedule heading -->
        <WorkoutScheduleHeader
          :customer-name="customer.name"
          :member-id="customer.id"
          :program-name="customer.programName"
          :assigned-trainer="customer.assignedTrainer"
          :program-week="customer.programWeek"
          :total-workouts="scheduleCounts.all"
          :completed-workouts="scheduleCounts.completed"
          :pending-workouts="scheduleCounts.pending"
          @back="goToDashboard"
        />

        <!-- Schedule filters -->
        <WorkoutFilterTabs
          v-model="selectedFilter"
          :filters="workoutFilterOptions"
          :counts="scheduleCounts"
          class="workout-schedule-page__filters"
        />

        <!-- Filter result information -->
        <div class="workout-schedule-page__results-heading">
          <div>
            <span>{{ activeFilterLabel }}</span>

            <h2>
              {{ filteredSchedules.length }}
              {{
                filteredSchedules.length === 1
                  ? "Daily Schedule"
                  : "Daily Schedules"
              }}
            </h2>
          </div>

          <p>
            Open an assigned schedule and complete each exercise in the given
            order.
          </p>
        </div>

        <!-- Daily workout schedule cards -->
        <v-row
          v-if="filteredSchedules.length"
          class="workout-schedule-page__grid"
        >
          <v-col
            v-for="schedule in filteredSchedules"
            :key="schedule.id"
            cols="12"
            md="6"
            lg="4"
          >
            <DailyScheduleCard
              :schedule="schedule"
              :is-today="isTodaySchedule(schedule)"
              @open-schedule="openWorkoutSession"
            />
          </v-col>
        </v-row>

        <!-- Empty result -->
        <v-card v-else class="workout-schedule-page__empty-state">
          <span class="workout-schedule-page__empty-icon">
            <v-icon icon="mdi-calendar-blank-outline" size="40" />
          </span>

          <h3>No daily schedules found</h3>

          <p>
            There are no assigned workout schedules available for the selected
            filter.
          </p>

          <v-btn
            color="primary"
            variant="tonal"
            prepend-icon="mdi-view-grid-outline"
            @click="selectedFilter = 'all'"
          >
            View All Schedules
          </v-btn>
        </v-card>
      </div>
    </main>

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
import DailyScheduleCard from "../../components/workout/DailyScheduleCard.vue";

import {
  sampleDailySchedules,
  sampleWorkoutCustomer,
  workoutFilterOptions,
} from "../../data/sampleWorkouts.js";

const router = useRouter();

const customer = sampleWorkoutCustomer;

const exerciseStatusStorageKey = "forwardFitExerciseStatuses";

// Create an editable copy of schedules and nested exercises
const schedules = ref(
  sampleDailySchedules.map((schedule) => ({
    ...schedule,

    exercises: schedule.exercises.map((exercise) => ({
      ...exercise,
    })),
  })),
);

const selectedFilter = ref("all");

const feedback = ref({
  visible: false,
  message: "",
  color: "info",
  icon: "mdi-information-outline",
});

// Return the customer's current local date as YYYY-MM-DD.
// Avoid converting to UTC because it can change the calendar date.
const getLocalDateKey = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// Match the full assigned date, not only the weekday.
const isTodaySchedule = (schedule) => {
  return schedule.scheduledDate === getLocalDateKey();
};

// Return the number of completed exercises
const getCompletedExerciseCount = (schedule) => {
  return schedule.exercises.filter(
    (exercise) => exercise.status === "Completed",
  ).length;
};

// Calculate daily schedule status from exercise statuses
const getScheduleStatus = (schedule) => {
  const totalExercises = schedule.exercises.length;
  const completedExercises = getCompletedExerciseCount(schedule);

  if (totalExercises > 0 && completedExercises === totalExercises) {
    return "Completed";
  }

  if (completedExercises > 0) {
    return "In Progress";
  }

  return "Pending";
};

// Calculate filter counts
const scheduleCounts = computed(() => {
  const completedSchedules = schedules.value.filter(
    (schedule) => getScheduleStatus(schedule) === "Completed",
  ).length;

  const todaySchedules = schedules.value.filter((schedule) =>
    isTodaySchedule(schedule),
  ).length;

  return {
    all: schedules.value.length,
    today: todaySchedules,
    completed: completedSchedules,

    // In Progress schedules are included because
    // they still contain pending exercises.
    pending: schedules.value.length - completedSchedules,
  };
});

// Filter daily schedule cards
const filteredSchedules = computed(() => {
  switch (selectedFilter.value) {
    case "today":
      return schedules.value.filter((schedule) => isTodaySchedule(schedule));

    case "completed":
      return schedules.value.filter(
        (schedule) => getScheduleStatus(schedule) === "Completed",
      );

    case "pending":
      return schedules.value.filter(
        (schedule) => getScheduleStatus(schedule) !== "Completed",
      );

    default:
      return schedules.value;
  }
});

// Filter heading
const activeFilterLabel = computed(() => {
  const activeFilter = workoutFilterOptions.find(
    (filter) => filter.value === selectedFilter.value,
  );

  return activeFilter?.label || "All Workouts";
});

// Restore exercise statuses saved from Workout Session
const loadExerciseStatuses = () => {
  const savedData = localStorage.getItem(exerciseStatusStorageKey);

  if (!savedData) {
    return;
  }

  try {
    const parsedStatuses = JSON.parse(savedData);

    if (!Array.isArray(parsedStatuses)) {
      return;
    }

    schedules.value = schedules.value.map((schedule) => ({
      ...schedule,

      exercises: schedule.exercises.map((exercise) => {
        const savedExercise = parsedStatuses.find(
          (item) => item.assignmentId === exercise.assignmentId,
        );

        const validStatus = ["Completed", "Pending"].includes(
          savedExercise?.status,
        );

        return {
          ...exercise,

          status: validStatus ? savedExercise.status : exercise.status,
        };
      }),
    }));
  } catch (error) {
    localStorage.removeItem(exerciseStatusStorageKey);

    console.error("Unable to read saved exercise statuses:", error);
  }
};

// Open the selected daily session
const openWorkoutSession = (scheduleId) => {
  router.push({
    name: "workout-session",

    params: {
      scheduleId,
    },
  });
};

// Return to Customer Dashboard
const goToDashboard = () => {
  router.push({
    name: "customer-dashboard",
  });
};

const handleProfile = () => {
  feedback.value = {
    visible: true,
    message: "The Customer Profile page will be added later.",
    color: "info",
    icon: "mdi-information-outline",
  };
};

// Logout the customer
const handleLogout = async () => {
  localStorage.removeItem("forwardFitCustomerAuthenticated");

  sessionStorage.removeItem("forwardFitCustomerAuthenticated");

  await router.replace({
    name: "login",
  });
};

// Load completion progress when the page opens
onMounted(() => {
  loadExerciseStatuses();
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/workout-schedule.scss"
></style>
