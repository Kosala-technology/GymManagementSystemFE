<template>
  <div class="workout-session-page">
    <DashboardHeader
      :customer-name="customer.name"
      :member-id="customer.id"
      @profile="handleProfile"
      @logout="handleLogout"
    />

    <main class="workout-session-page__main">
      <div class="workout-session-page__container">
        <!-- Display session when the schedule ID is valid -->
        <template v-if="selectedSchedule">
          <!-- Session heading -->
          <section class="workout-session-page__header">
            <div class="workout-session-page__navigation">
              <v-btn
                variant="text"
                prepend-icon="mdi-arrow-left"
                class="workout-session-page__back-button"
                @click="goToWorkoutSchedule"
              >
                Back to Workout Schedule
              </v-btn>

              <v-chip
                :color="sessionCompleted ? 'success' : 'primary'"
                variant="tonal"
                size="small"
              >
                <v-icon
                  :icon="
                    sessionCompleted ? 'mdi-check-circle' : 'mdi-progress-clock'
                  "
                  start
                  size="16"
                />

                {{
                  sessionCompleted ? "Workout Completed" : "Workout in Progress"
                }}
              </v-chip>
            </div>

            <div class="workout-session-page__heading-content">
              <div>
                <span class="workout-session-page__eyebrow">
                  {{ selectedSchedule.workoutDay }} Workout
                </span>

                <h1>{{ selectedSchedule.scheduleName }}</h1>

                <p>
                  Complete each exercise in the assigned order and follow your
                  trainer’s instructions carefully.
                </p>
              </div>

              <!-- Daily session information -->
              <div class="workout-session-page__session-details">
                <div>
                  <v-icon icon="mdi-calendar-outline" size="20" />

                  <span>
                    <small>Date</small>
                    <strong>
                      {{ selectedSchedule.workoutDate }}
                    </strong>
                  </span>
                </div>

                <div>
                  <v-icon icon="mdi-account-supervisor-outline" size="20" />

                  <span>
                    <small>Trainer</small>
                    <strong>
                      {{ selectedSchedule.assignedTrainer }}
                    </strong>
                  </span>
                </div>

                <div>
                  <v-icon icon="mdi-format-list-numbered" size="20" />

                  <span>
                    <small>Exercises</small>
                    <strong>
                      {{ totalExercises }}
                    </strong>
                  </span>
                </div>

                <div>
                  <v-icon icon="mdi-timer-sand" size="20" />

                  <span>
                    <small>Duration</small>
                    <strong>
                      {{ selectedSchedule.estimatedDuration }}
                    </strong>
                  </span>
                </div>
              </div>
            </div>

            <!-- Session progress -->
            <div class="workout-session-page__progress">
              <div>
                <span>
                  {{ completedExercises }} of {{ totalExercises }} exercises
                  completed
                </span>

                <strong>{{ completionPercentage }}%</strong>
              </div>

              <v-progress-linear
                :model-value="completionPercentage"
                :color="sessionCompleted ? 'success' : 'primary'"
                bg-color="grey-lighten-3"
                height="9"
                rounded
              />
            </div>
          </section>

          <!-- Current exercise and exercise list -->
          <section class="workout-session-page__workspace">
            <ExercisePlayer
              :exercise="currentExercise"
              :current-index="currentExerciseIndex"
              :total-exercises="totalExercises"
              :completed-exercises="completedExercises"
              @previous="showPreviousExercise"
              @next="showNextExercise"
              @complete="markExerciseAsCompleted"
            />

            <ExerciseQueue
              :exercises="selectedSchedule.exercises"
              :current-index="currentExerciseIndex"
              @select="selectExercise"
            />
          </section>

          <!-- Completed session message -->
          <v-card
            v-if="sessionCompleted"
            class="workout-session-page__completion-card"
          >
            <span>
              <v-icon icon="mdi-trophy-outline" size="31" />
            </span>

            <div>
              <small>Daily workout completed</small>
              <h2>Excellent work, {{ customer.name }}!</h2>

              <p>
                You have completed all
                {{ totalExercises }} exercises assigned by your trainer.
              </p>
            </div>

            <v-btn
              color="success"
              variant="tonal"
              prepend-icon="mdi-arrow-left"
              @click="goToWorkoutSchedule"
            >
              Return to Schedule
            </v-btn>
          </v-card>
        </template>

        <!-- Invalid schedule ID -->
        <v-card v-else class="workout-session-page__not-found">
          <span>
            <v-icon icon="mdi-calendar-remove-outline" size="45" />
          </span>

          <h1>Workout schedule not found</h1>

          <p>The requested daily workout schedule is unavailable.</p>

          <v-btn
            color="primary"
            prepend-icon="mdi-arrow-left"
            @click="goToWorkoutSchedule"
          >
            Return to Workout Schedule
          </v-btn>
        </v-card>
      </div>
    </main>

    <!-- Action feedback -->
    <v-snackbar
      v-model="feedback.visible"
      :color="feedback.color"
      location="bottom center"
      :timeout="3000"
      rounded="lg"
    >
      <div class="workout-session-page__feedback">
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
import { computed, nextTick, onMounted, ref } from "vue";

import { useRoute, useRouter } from "vue-router";

import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";
import ExercisePlayer from "../../components/workout/ExercisePlayer.vue";
import ExerciseQueue from "../../components/workout/ExerciseQueue.vue";

import {
  sampleDailySchedules,
  sampleWorkoutCustomer,
} from "../../data/sampleWorkouts.js";

const route = useRoute();
const router = useRouter();

const customer = sampleWorkoutCustomer;

// Local Storage key shared with the Schedule page
const exerciseStatusStorageKey = "forwardFitExerciseStatuses";

// Create an editable copy of daily schedules and exercises
const schedules = ref(
  sampleDailySchedules.map((schedule) => ({
    ...schedule,

    exercises: schedule.exercises.map((exercise) => ({
      ...exercise,
    })),
  })),
);

const currentExerciseIndex = ref(0);

const feedback = ref({
  visible: false,
  message: "",
  color: "success",
  icon: "mdi-check-circle-outline",
});

// Find the schedule selected through the route parameter
const selectedSchedule = computed(() => {
  return schedules.value.find(
    (schedule) => schedule.id === route.params.scheduleId,
  );
});

const totalExercises = computed(() => {
  return selectedSchedule.value?.exercises.length ?? 0;
});

const completedExercises = computed(() => {
  return (
    selectedSchedule.value?.exercises.filter(
      (exercise) => exercise.status === "Completed",
    ).length ?? 0
  );
});

const completionPercentage = computed(() => {
  if (totalExercises.value === 0) {
    return 0;
  }

  return Math.round((completedExercises.value / totalExercises.value) * 100);
});

const sessionCompleted = computed(() => {
  return (
    totalExercises.value > 0 &&
    completedExercises.value === totalExercises.value
  );
});

const currentExercise = computed(() => {
  return selectedSchedule.value?.exercises[currentExerciseIndex.value] ?? null;
});

// Save all customer exercise completion values
const saveExerciseStatuses = () => {
  const statusRecords = schedules.value.flatMap((schedule) =>
    schedule.exercises.map((exercise) => ({
      assignmentId: exercise.assignmentId,
      status: exercise.status,
    })),
  );

  localStorage.setItem(exerciseStatusStorageKey, JSON.stringify(statusRecords));
};

// Restore status values after refresh
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

// Select the first exercise that is not completed
const selectFirstPendingExercise = () => {
  if (!selectedSchedule.value) {
    return;
  }

  const firstPendingIndex = selectedSchedule.value.exercises.findIndex(
    (exercise) => exercise.status === "Pending",
  );

  currentExerciseIndex.value = firstPendingIndex >= 0 ? firstPendingIndex : 0;
};

// Complete an exercise and continue to the next pending assignment.
const markExerciseAsCompleted = (assignmentId) => {
  const exercises = selectedSchedule.value?.exercises;

  if (!exercises) {
    return;
  }

  const completedIndex = exercises.findIndex(
    (exercise) => exercise.assignmentId === assignmentId,
  );

  if (completedIndex === -1) {
    return;
  }

  const exercise = exercises[completedIndex];

  // Do not complete the same exercise twice.
  if (exercise.status === "Completed") {
    return;
  }

  exercise.status = "Completed";

  try {
    // Save progress before moving to another exercise.
    saveExerciseStatuses();
  } catch (error) {
    // Restore the previous status if browser storage fails.
    exercise.status = "Pending";

    feedback.value = {
      visible: true,
      message: "Progress could not be saved. Please try again.",
      color: "error",
      icon: "mdi-alert-circle-outline",
    };

    return;
  }

  // First look for a pending exercise after the completed one.
  let nextPendingIndex = exercises.findIndex(
    (item, index) => index > completedIndex && item.status === "Pending",
  );

  // If none remain ahead, return to an earlier unfinished exercise.
  if (nextPendingIndex === -1) {
    nextPendingIndex = exercises.findIndex((item) => item.status === "Pending");
  }

  const allCompleted = nextPendingIndex === -1;

  feedback.value = {
    visible: true,
    message: allCompleted
      ? "All exercises in this schedule are completed!"
      : `${exercise.exerciseName} completed.`,
    color: "success",
    icon: "mdi-check-circle-outline",
  };

  if (!allCompleted) {
    currentExerciseIndex.value = nextPendingIndex;
    scrollToExercisePlayer();
  }
};

const showPreviousExercise = () => {
  if (currentExerciseIndex.value > 0) {
    currentExerciseIndex.value -= 1;
    scrollToExercisePlayer();
  }
};

const showNextExercise = () => {
  if (currentExerciseIndex.value < totalExercises.value - 1) {
    currentExerciseIndex.value += 1;
    scrollToExercisePlayer();
  }
};

const selectExercise = (index) => {
  if (index >= 0 && index < totalExercises.value) {
    currentExerciseIndex.value = index;
    scrollToExercisePlayer();
  }
};

// Return the exercise player to the visible area
const scrollToExercisePlayer = async () => {
  await nextTick();

  const player = document.querySelector(".exercise-player");

  player?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const goToWorkoutSchedule = () => {
  router.push({
    name: "workout-schedule",
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

const handleLogout = async () => {
  localStorage.removeItem("forwardFitCustomerAuthenticated");

  sessionStorage.removeItem("forwardFitCustomerAuthenticated");

  await router.replace({
    name: "login",
  });
};

onMounted(() => {
  loadExerciseStatuses();
  selectFirstPendingExercise();
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/workout-session.scss"
></style>
