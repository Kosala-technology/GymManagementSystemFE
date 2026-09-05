<template>
  <v-card
    class="daily-schedule-card"
    :class="{
      'daily-schedule-card--today': isToday,
      'daily-schedule-card--completed': scheduleStatus === 'Completed',
    }"
  >
    <!-- Top section -->
    <div class="daily-schedule-card__header">
      <div class="daily-schedule-card__day">
        <span class="daily-schedule-card__calendar">
          <v-icon icon="mdi-calendar-check-outline" size="25" />
        </span>

        <div>
          <div class="daily-schedule-card__day-title">
            <strong>{{ schedule.workoutDay }}</strong>

            <v-chip
              v-if="isToday"
              color="primary"
              variant="flat"
              size="x-small"
            >
              Today
            </v-chip>
          </div>

          <small>{{ schedule.workoutDate }}</small>
        </div>
      </div>

      <!-- Overall daily schedule status -->
      <v-chip
        :color="statusColor"
        variant="tonal"
        size="small"
        class="daily-schedule-card__status"
      >
        <v-icon :icon="statusIcon" start size="16" />

        {{ scheduleStatus }}
      </v-chip>
    </div>

    <v-divider />

    <!-- Schedule information -->
    <div class="daily-schedule-card__body">
      <span class="daily-schedule-card__eyebrow"> Assigned Workout </span>

      <h2>{{ schedule.scheduleName }}</h2>

      <div class="daily-schedule-card__trainer">
        <v-avatar color="primary" variant="tonal" size="35">
          <v-icon icon="mdi-account-supervisor-outline" size="20" />
        </v-avatar>

        <div>
          <small>Assigned trainer</small>
          <strong>{{ schedule.assignedTrainer }}</strong>
        </div>
      </div>

      <!-- Schedule summary -->
      <div class="daily-schedule-card__summary">
        <div>
          <span class="daily-schedule-card__summary-icon">
            <v-icon icon="mdi-format-list-numbered" size="20" />
          </span>

          <span>
            <small>Exercises</small>
            <strong>{{ totalExercises }}</strong>
          </span>
        </div>

        <div>
          <span class="daily-schedule-card__summary-icon">
            <v-icon icon="mdi-clock-outline" size="20" />
          </span>

          <span>
            <small>Starting time</small>
            <strong>{{ schedule.scheduledTime }}</strong>
          </span>
        </div>

        <div>
          <span class="daily-schedule-card__summary-icon">
            <v-icon icon="mdi-timer-sand" size="20" />
          </span>

          <span>
            <small>Duration</small>
            <strong>{{ schedule.estimatedDuration }}</strong>
          </span>
        </div>
      </div>

      <!-- Exercise completion progress -->
      <div class="daily-schedule-card__progress">
        <div class="daily-schedule-card__progress-heading">
          <span>
            {{ completedExercises }} of {{ totalExercises }} exercises completed
          </span>

          <strong>{{ completionPercentage }}%</strong>
        </div>

        <v-progress-linear
          :model-value="completionPercentage"
          :color="scheduleStatus === 'Completed' ? 'success' : 'primary'"
          bg-color="grey-lighten-3"
          height="8"
          rounded
        />
      </div>
    </div>

    <!-- Open daily session -->
    <v-card-actions class="daily-schedule-card__actions">
      <v-btn
        block
        :color="scheduleStatus === 'Completed' ? 'success' : 'primary'"
        :variant="scheduleStatus === 'Completed' ? 'tonal' : 'flat'"
        :prepend-icon="actionIcon"
        append-icon="mdi-arrow-right"
        class="daily-schedule-card__action-button"
        @click="emit('open-schedule', schedule.id)"
      >
        {{ actionLabel }}
      </v-btn>
    </v-card-actions>

    <!-- Bottom status line -->
    <div
      class="daily-schedule-card__status-line"
      :class="`daily-schedule-card__status-line--${statusClass}`"
    ></div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  schedule: {
    type: Object,
    required: true,
  },

  isToday: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["open-schedule"]);

// Total number of admin-assigned exercises
const totalExercises = computed(() => {
  return props.schedule.exercises.length;
});

// Number of completed exercises
const completedExercises = computed(() => {
  return props.schedule.exercises.filter(
    (exercise) => exercise.status === "Completed",
  ).length;
});

// Overall daily schedule progress
const completionPercentage = computed(() => {
  if (totalExercises.value === 0) {
    return 0;
  }

  return Math.round((completedExercises.value / totalExercises.value) * 100);
});

// Derive the overall status from individual exercise statuses
const scheduleStatus = computed(() => {
  if (
    totalExercises.value > 0 &&
    completedExercises.value === totalExercises.value
  ) {
    return "Completed";
  }

  if (completedExercises.value > 0) {
    return "In Progress";
  }

  return "Pending";
});

const statusColor = computed(() => {
  if (scheduleStatus.value === "Completed") {
    return "success";
  }

  if (scheduleStatus.value === "In Progress") {
    return "primary";
  }

  return "warning";
});

const statusIcon = computed(() => {
  if (scheduleStatus.value === "Completed") {
    return "mdi-check-circle";
  }

  if (scheduleStatus.value === "In Progress") {
    return "mdi-progress-clock";
  }

  return "mdi-clock-outline";
});

const statusClass = computed(() => {
  return scheduleStatus.value.toLowerCase().replace(" ", "-");
});

// Change the button according to current progress
const actionLabel = computed(() => {
  if (scheduleStatus.value === "Completed") {
    return "Review Workout";
  }

  if (scheduleStatus.value === "In Progress") {
    return "Continue Workout";
  }

  return "Start Workout";
});

const actionIcon = computed(() => {
  if (scheduleStatus.value === "Completed") {
    return "mdi-eye-outline";
  }

  if (scheduleStatus.value === "In Progress") {
    return "mdi-play-circle-outline";
  }

  return "mdi-play";
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/daily-schedule-card.scss"
></style>
