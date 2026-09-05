<template>
  <v-card
    class="workout-card"
    :class="{
      'workout-card--completed': isCompleted,
      'workout-card--today': isToday,
    }"
  >
    <!-- Card top section -->
    <div class="workout-card__header">
      <div class="workout-card__day-section">
        <span class="workout-card__day-icon">
          <v-icon :icon="workout.categoryIcon" size="24" />
        </span>

        <div>
          <div class="workout-card__day-label">
            <span>{{ workout.workoutDay }}</span>

            <v-chip
              v-if="isToday"
              color="primary"
              size="x-small"
              variant="flat"
              class="workout-card__today-chip"
            >
              Today
            </v-chip>
          </div>

          <small>{{ workout.scheduledTime }}</small>
        </div>
      </div>

      <!-- Completed or Pending status -->
      <v-chip
        :color="isCompleted ? 'success' : 'warning'"
        variant="tonal"
        size="small"
        class="workout-card__status"
      >
        <v-icon
          :icon="isCompleted ? 'mdi-check-circle' : 'mdi-clock-outline'"
          start
          size="16"
        />

        {{ workout.status }}
      </v-chip>
    </div>

    <v-divider />

    <!-- Exercise details -->
    <div class="workout-card__body">
      <div class="workout-card__exercise-heading">
        <div>
          <span class="workout-card__category">
            {{ workout.category }}
          </span>

          <h3>{{ workout.exerciseName }}</h3>
        </div>

        <span class="workout-card__duration">
          <v-icon icon="mdi-timer-sand" size="17" />

          {{ workout.estimatedDuration }}
        </span>
      </div>

      <!-- Workout measurements -->
      <div class="workout-card__measurements">
        <div class="workout-card__measurement">
          <span class="workout-card__measurement-icon">
            <v-icon icon="mdi-repeat" size="19" />
          </span>

          <div>
            <small>Sets</small>
            <strong>{{ workout.sets }}</strong>
          </div>
        </div>

        <div class="workout-card__measurement">
          <span class="workout-card__measurement-icon">
            <v-icon icon="mdi-counter" size="19" />
          </span>

          <div>
            <small>Repetitions</small>
            <strong>{{ workout.repetitions }}</strong>
          </div>
        </div>

        <div class="workout-card__measurement">
          <span class="workout-card__measurement-icon">
            <v-icon icon="mdi-timer-outline" size="19" />
          </span>

          <div>
            <small>Rest time</small>
            <strong>{{ workout.restTime }}</strong>
          </div>
        </div>
      </div>

      <!-- Trainer instructions -->
      <div class="workout-card__instructions">
        <div class="workout-card__instructions-heading">
          <span>
            <v-icon icon="mdi-account-voice" size="19" />
          </span>

          <strong>Trainer’s Instructions</strong>
        </div>

        <p>{{ workout.trainerInstructions }}</p>
      </div>
    </div>

    <!-- Card buttons -->
    <v-card-actions class="workout-card__actions">
      <v-btn
        variant="outlined"
        color="secondary"
        prepend-icon="mdi-play-circle-outline"
        class="workout-card__video-button"
        @click="emit('watch-video', workout)"
      >
        Watch Video
      </v-btn>

      <!-- Pending workout completion button -->
      <v-btn
        v-if="!isCompleted"
        color="primary"
        prepend-icon="mdi-check"
        class="workout-card__complete-button"
        @click="emit('complete', workout.id)"
      >
        Mark as Completed
      </v-btn>

      <!-- Completed state button -->
      <v-btn
        v-else
        color="success"
        variant="tonal"
        prepend-icon="mdi-check-all"
        class="workout-card__completed-button"
        disabled
      >
        Workout Completed
      </v-btn>
    </v-card-actions>

    <!-- Completed card accent -->
    <div class="workout-card__status-line"></div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

// Receive the workout record and Today state
const props = defineProps({
  workout: {
    type: Object,
    required: true,
  },

  isToday: {
    type: Boolean,
    default: false,
  },
});

// Send actions to the Workout Schedule page
const emit = defineEmits(["watch-video", "complete"]);

// Determine whether this workout has been completed
const isCompleted = computed(() => {
  return props.workout.status === "Completed";
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/workout-card.scss"
></style>
