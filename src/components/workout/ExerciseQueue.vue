<template>
  <v-card class="exercise-queue">
    <!-- List heading -->
    <div class="exercise-queue__header">
      <div>
        <span class="exercise-queue__eyebrow"> Exercise Queue </span>

        <h2>Today’s Exercise Order</h2>
      </div>

      <v-chip color="primary" variant="tonal" size="small">
        {{ exercises.length }} Exercises
      </v-chip>
    </div>

    <!-- Completion summary -->
    <div class="exercise-queue__summary">
      <div>
        <v-icon icon="mdi-check-circle-outline" size="19" />

        <span>
          <strong>{{ completedCount }}</strong>
          completed
        </span>
      </div>

      <div>
        <v-icon icon="mdi-clock-outline" size="19" />

        <span>
          <strong>{{ pendingCount }}</strong>
          pending
        </span>
      </div>
    </div>

    <!-- Scrollable exercise list -->
    <div class="exercise-queue__list">
      <button
        v-for="(exercise, index) in exercises"
        :key="exercise.assignmentId"
        type="button"
        class="exercise-queue__item"
        :class="{
          'exercise-queue__item--active': index === currentIndex,
          'exercise-queue__item--completed': exercise.status === 'Completed',
        }"
        :aria-current="index === currentIndex ? 'step' : undefined"
        @click="emit('select', index)"
      >
        <!-- Exercise order number or completed icon -->
        <span class="exercise-queue__number">
          <v-icon
            v-if="exercise.status === 'Completed'"
            icon="mdi-check"
            size="18"
          />

          <span v-else>
            {{ String(exercise.order).padStart(2, "0") }}
          </span>
        </span>

        <!-- Exercise information -->
        <span class="exercise-queue__information">
          <strong>{{ exercise.exerciseName }}</strong>

          <small>
            {{ exercise.category }} · {{ exercise.sets }} sets ·
            {{ exercise.repetitions }}
          </small>
        </span>

        <!-- Current or status indicator -->
        <span class="exercise-queue__indicator">
          <v-chip
            v-if="index === currentIndex"
            color="primary"
            variant="flat"
            size="x-small"
          >
            Current
          </v-chip>

          <v-icon
            v-else-if="exercise.status === 'Completed'"
            icon="mdi-check-circle"
            color="success"
            size="20"
          />

          <v-icon v-else icon="mdi-chevron-right" size="20" />
        </span>
      </button>
    </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  exercises: {
    type: Array,
    required: true,
  },

  currentIndex: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["select"]);

// Calculate completed exercises
const completedCount = computed(() => {
  return props.exercises.filter((exercise) => exercise.status === "Completed")
    .length;
});

// Calculate pending exercises
const pendingCount = computed(() => {
  return props.exercises.length - completedCount.value;
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/exercise-queue.scss"
></style>
