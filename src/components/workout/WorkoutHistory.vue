<template>
  <section class="workout-history" aria-labelledby="workout-history-title">
    <div class="workout-history__header">
      <div>
        <span class="workout-history__eyebrow"> YOUR FITNESS JOURNEY </span>

        <h2 id="workout-history-title">Workout History</h2>

        <p>Review your previously completed workout sessions.</p>
      </div>

      <v-chip
        color="success"
        variant="tonal"
        prepend-icon="mdi-check-circle-outline"
      >
        {{ completedSchedules.length }} Completed
      </v-chip>
    </div>

    <!-- Empty workout history -->
    <v-card
      v-if="completedSchedules.length === 0"
      class="workout-history__empty"
      elevation="0"
    >
      <v-icon icon="mdi-history" color="primary" size="45" />

      <h3>No Completed Workouts Yet</h3>

      <p>
        Your completed workout sessions will appear here once you finish all
        assigned exercises.
      </p>
    </v-card>

    <!-- Completed workout list -->
    <div v-else class="workout-history__list">
      <v-card
        v-for="schedule in visibleSchedules"
        :key="schedule.id"
        class="workout-history__item"
        elevation="0"
      >
        <div class="workout-history__item-content">
          <div class="workout-history__icon">
            <v-icon icon="mdi-check-circle" color="success" size="28" />
          </div>

          <div class="workout-history__details">
            <span class="workout-history__date">
              <v-icon icon="mdi-calendar-outline" size="16" />

              Scheduled:
              {{ formatDate(schedule.scheduledDate) }}
            </span>

            <h3>{{ schedule.scheduleName }}</h3>

            <p>
              <v-icon icon="mdi-dumbbell" size="16" />

              {{ schedule.exercises.length }}
              Exercises Completed
            </p>

            <p v-if="schedule.assignedTrainer">
              <v-icon icon="mdi-account-outline" size="16" />

              Trainer: {{ schedule.assignedTrainer }}
            </p>
          </div>
        </div>

        <v-btn
          color="primary"
          variant="tonal"
          append-icon="mdi-arrow-right"
          @click="emit('open-schedule', schedule.id)"
        >
          Review Session
        </v-btn>
      </v-card>

      <!-- Show more completed workouts -->
      <div v-if="completedSchedules.length > 4" class="workout-history__more">
        <v-btn variant="outlined" color="primary" @click="showAll = !showAll">
          {{ showAll ? "Show Less" : "View All History" }}
        </v-btn>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  schedules: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["open-schedule"]);

const showAll = ref(false);

// Display only fully completed workouts.
const completedSchedules = computed(() => {
  return props.schedules
    .filter(
      (schedule) =>
        Array.isArray(schedule.exercises) &&
        schedule.exercises.length > 0 &&
        schedule.exercises.every((exercise) => exercise.status === "Completed"),
    )
    .slice()
    .sort((a, b) => {
      const first = `${a.scheduledDate ?? ""} ${a.scheduledTime ?? ""}`;
      const second = `${b.scheduledDate ?? ""} ${b.scheduledTime ?? ""}`;

      return second.localeCompare(first);
    });
});

// Show the latest four records first.
const visibleSchedules = computed(() => {
  return showAll.value
    ? completedSchedules.value
    : completedSchedules.value.slice(0, 4);
});

// Format the scheduled workout date.
const formatDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) {
    return "Date unavailable";
  }

  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/workout-history.scss"
></style>
