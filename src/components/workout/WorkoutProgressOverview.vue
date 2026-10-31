<template>
  <v-card class="workout-progress" elevation="0">
    <div class="workout-progress__header">
      <div>
        <span class="workout-progress__eyebrow"> FITNESS JOURNEY </span>

        <h2>Workout Progress Overview</h2>
        <p>Track your assigned workout progress.</p>
      </div>

      <v-icon icon="mdi-chart-line" color="primary" size="30" />
    </div>

    <v-row>
      <v-col
        v-for="stat in statistics"
        :key="stat.label"
        cols="12"
        sm="6"
        lg="3"
      >
        <div class="workout-progress__stat">
          <v-icon :icon="stat.icon" :color="stat.color" size="28" />

          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </v-col>
    </v-row>

    <div class="workout-progress__completion">
      <div class="workout-progress__completion-heading">
        <span>Overall Workout Completion</span>
        <strong>{{ completionPercentage }}%</strong>
      </div>

      <v-progress-linear
        :model-value="completionPercentage"
        color="primary"
        bg-color="grey-lighten-3"
        height="12"
        rounded
      />

      <p v-if="totalWorkouts === 0">
        No workouts assigned yet. Your progress will appear here.
      </p>

      <p v-else>
        {{ completedExercises }} of {{ totalExercises }}
        assigned exercises completed.
      </p>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  schedules: {
    type: Array,
    default: () => [],
  },
});

const totalWorkouts = computed(() => props.schedules.length);

const totalExercises = computed(() =>
  props.schedules.reduce(
    (total, schedule) => total + (schedule.exercises?.length ?? 0),
    0,
  ),
);

const completedExercises = computed(() =>
  props.schedules.reduce(
    (total, schedule) =>
      total +
      (schedule.exercises?.filter((exercise) => exercise.status === "Completed")
        .length ?? 0),
    0,
  ),
);

const completedWorkouts = computed(
  () =>
    props.schedules.filter(
      (schedule) =>
        schedule.exercises?.length > 0 &&
        schedule.exercises.every((exercise) => exercise.status === "Completed"),
    ).length,
);

const inProgressWorkouts = computed(
  () =>
    props.schedules.filter((schedule) => {
      const completed =
        schedule.exercises?.filter(
          (exercise) => exercise.status === "Completed",
        ).length ?? 0;

      return completed > 0 && completed < (schedule.exercises?.length ?? 0);
    }).length,
);

const completionPercentage = computed(() =>
  totalExercises.value > 0
    ? Math.round((completedExercises.value / totalExercises.value) * 100)
    : 0,
);

const statistics = computed(() => [
  {
    label: "Total Workouts",
    value: totalWorkouts.value,
    icon: "mdi-dumbbell",
    color: "primary",
  },
  {
    label: "Completed",
    value: completedWorkouts.value,
    icon: "mdi-check-circle-outline",
    color: "success",
  },
  {
    label: "In Progress",
    value: inProgressWorkouts.value,
    icon: "mdi-progress-clock",
    color: "warning",
  },
  {
    label: "Completion Rate",
    value: `${completionPercentage.value}%`,
    icon: "mdi-chart-donut",
    color: "primary",
  },
]);
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/workout-progress-overview.scss"
></style>
