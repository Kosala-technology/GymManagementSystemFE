<template>
  <v-card
    v-if="exercise"
    class="exercise-player"
    :class="{
      'exercise-player--completed': exercise.status === 'Completed',
    }"
  >
    <!-- Exercise position and status -->
    <div class="exercise-player__topbar">
      <div>
        <span class="exercise-player__position">
          Exercise {{ currentPosition }} of {{ totalExercises }}
        </span>

        <span class="exercise-player__progress-text">
          {{ completedExercises }} completed
        </span>
      </div>

      <v-chip
        :color="exercise.status === 'Completed' ? 'success' : 'warning'"
        variant="tonal"
        size="small"
        class="exercise-player__status"
      >
        <v-icon
          :icon="
            exercise.status === 'Completed'
              ? 'mdi-check-circle'
              : 'mdi-clock-outline'
          "
          start
          size="16"
        />

        {{ exercise.status }}
      </v-chip>
    </div>

    <!-- Overall exercise progress -->
    <v-progress-linear
      :model-value="completionPercentage"
      :color="completionPercentage === 100 ? 'success' : 'primary'"
      bg-color="grey-lighten-3"
      height="7"
    />

    <div class="exercise-player__body">
      <!-- Exercise video area -->
      <div class="exercise-player__video">
        <!-- Future video display -->
        <iframe
          v-if="exercise.videoUrl"
          :src="exercise.videoUrl"
          :title="`${exercise.exerciseName} demonstration`"
          allow="
            accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture;
          "
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>

        <!-- Current video placeholder -->
        <div v-else class="exercise-player__video-placeholder">
          <span class="exercise-player__play-icon">
            <v-icon icon="mdi-video-outline" size="43" />
          </span>

          <strong>Exercise demonstration video</strong>

          <p>
            The administrator has not added a demonstration video for this
            exercise yet.
          </p>

          <v-chip size="small" variant="tonal" color="secondary">
            <v-icon icon="mdi-video-plus-outline" start size="16" />

            Video pending
          </v-chip>
        </div>

        <!-- Video overlay information -->
        <div class="exercise-player__video-label">
          <v-icon icon="mdi-play-circle-outline" size="18" />

          <span>{{ exercise.exerciseName }}</span>
        </div>
      </div>

      <!-- Exercise information -->
      <div class="exercise-player__information">
        <span class="exercise-player__category">
          {{ exercise.category }}
        </span>

        <h1>{{ exercise.exerciseName }}</h1>

        <!-- Equipment -->
        <div class="exercise-player__equipment">
          <span>
            <v-icon icon="mdi-dumbbell" size="21" />
          </span>

          <div>
            <small>Required equipment</small>
            <strong>{{ exercise.equipment }}</strong>
          </div>
        </div>

        <!-- Sets, repetitions and rest -->
        <div class="exercise-player__measurements">
          <div>
            <span>
              <v-icon icon="mdi-repeat" size="22" />
            </span>

            <small>Sets</small>
            <strong>{{ exercise.sets }}</strong>
          </div>

          <div>
            <span>
              <v-icon icon="mdi-counter" size="22" />
            </span>

            <small>Repetitions</small>
            <strong>{{ exercise.repetitions }}</strong>
          </div>

          <div>
            <span>
              <v-icon icon="mdi-timer-outline" size="22" />
            </span>

            <small>Rest time</small>
            <strong>{{ exercise.restTime }}</strong>
          </div>
        </div>

        <!-- Trainer instructions -->
        <div class="exercise-player__instructions">
          <div class="exercise-player__instructions-heading">
            <span>
              <v-icon icon="mdi-account-voice" size="21" />
            </span>

            <div>
              <small>Assigned trainer</small>
              <strong>Trainer’s Instructions</strong>
            </div>
          </div>

          <p>{{ exercise.trainerInstructions }}</p>
        </div>
      </div>
    </div>

    <v-divider />

    <!-- Sequential exercise controls -->
    <v-card-actions class="exercise-player__actions">
      <v-btn
        variant="outlined"
        color="secondary"
        prepend-icon="mdi-arrow-left"
        :disabled="isFirstExercise"
        class="exercise-player__navigation-button"
        @click="emit('previous')"
      >
        Previous
      </v-btn>

      <v-btn
        v-if="exercise.status !== 'Completed'"
        color="primary"
        prepend-icon="mdi-check"
        class="exercise-player__complete-button"
        @click="emit('complete', exercise.assignmentId)"
      >
        Mark as Completed
      </v-btn>

      <v-btn
        v-else
        color="success"
        variant="tonal"
        prepend-icon="mdi-check-all"
        class="exercise-player__completed-button"
        disabled
      >
        Completed
      </v-btn>

      <v-btn
        variant="outlined"
        color="secondary"
        append-icon="mdi-arrow-right"
        :disabled="isLastExercise"
        class="exercise-player__navigation-button"
        @click="emit('next')"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  exercise: {
    type: Object,
    default: null,
  },

  currentIndex: {
    type: Number,
    default: 0,
  },

  totalExercises: {
    type: Number,
    default: 0,
  },

  completedExercises: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["previous", "next", "complete"]);

// Convert the zero-based index into a customer-friendly number
const currentPosition = computed(() => {
  return props.currentIndex + 1;
});

// Calculate overall session progress
const completionPercentage = computed(() => {
  if (props.totalExercises === 0) {
    return 0;
  }

  return Math.round((props.completedExercises / props.totalExercises) * 100);
});

const isFirstExercise = computed(() => {
  return props.currentIndex === 0;
});

const isLastExercise = computed(() => {
  return props.currentIndex === props.totalExercises - 1;
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/exercise-player.scss"
></style>
