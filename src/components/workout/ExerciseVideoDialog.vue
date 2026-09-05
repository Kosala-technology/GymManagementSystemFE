<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="920"
    scrollable
    class="exercise-video-dialog"
  >
    <v-card class="exercise-video-dialog__card">
      <!-- Dialog heading -->
      <div class="exercise-video-dialog__header">
        <div class="exercise-video-dialog__heading-content">
          <span class="exercise-video-dialog__icon">
            <v-icon icon="mdi-play" size="23" />
          </span>

          <div>
            <span class="exercise-video-dialog__eyebrow"> Exercise Guide </span>

            <h2>
              {{ workout?.exerciseName || "Workout Video" }}
            </h2>
          </div>
        </div>

        <!-- Close dialog button -->
        <v-btn
          icon="mdi-close"
          variant="text"
          class="exercise-video-dialog__close"
          aria-label="Close exercise video"
          @click="closeDialog"
        />
      </div>

      <v-divider />

      <v-card-text class="exercise-video-dialog__body">
        <!-- Video container -->
        <div class="exercise-video-dialog__video-wrapper">
          <!--
            Remove the iframe when the dialog closes.
            This also stops the video automatically.
          -->
          <iframe
            v-if="dialogOpen && workout?.videoUrl"
            :src="workout.videoUrl"
            :title="workout.videoTitle"
            loading="lazy"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
              web-share;
            "
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

          <!-- Display fallback when no video is assigned -->
          <div
            v-else-if="dialogOpen"
            class="exercise-video-dialog__unavailable"
          >
            <v-icon icon="mdi-video-off-outline" size="48" />

            <strong>Video unavailable</strong>

            <span>
              Your trainer has not assigned a video to this exercise.
            </span>
          </div>
        </div>

        <!-- Exercise summary -->
        <div v-if="workout" class="exercise-video-dialog__summary">
          <div class="exercise-video-dialog__summary-heading">
            <div>
              <span>Trainer guidance</span>
              <h3>{{ workout.videoTitle }}</h3>
            </div>

            <v-chip color="primary" variant="tonal" size="small">
              {{ workout.category }}
            </v-chip>
          </div>

          <!-- Workout measurements -->
          <div class="exercise-video-dialog__measurements">
            <div>
              <v-icon icon="mdi-repeat" size="19" />

              <span>
                <small>Sets</small>
                <strong>{{ workout.sets }}</strong>
              </span>
            </div>

            <div>
              <v-icon icon="mdi-counter" size="19" />

              <span>
                <small>Repetitions</small>
                <strong>{{ workout.repetitions }}</strong>
              </span>
            </div>

            <div>
              <v-icon icon="mdi-timer-outline" size="19" />

              <span>
                <small>Rest time</small>
                <strong>{{ workout.restTime }}</strong>
              </span>
            </div>
          </div>

          <!-- Safety note -->
          <div class="exercise-video-dialog__notice">
            <v-icon icon="mdi-shield-check-outline" size="20" />

            <p>
              Follow your trainer’s instructions and stop the exercise if you
              experience unusual pain or discomfort.
            </p>
          </div>
        </div>
      </v-card-text>

      <v-divider />

      <!-- Dialog actions -->
      <v-card-actions class="exercise-video-dialog__actions">
        <v-btn variant="text" color="secondary" @click="closeDialog">
          Close
        </v-btn>

        <!-- Open original video in a separate browser tab -->
        <v-btn
          v-if="workout?.videoSourceUrl"
          :href="workout.videoSourceUrl"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          prepend-icon="mdi-open-in-new"
          class="exercise-video-dialog__source-button"
        >
          Open video source
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";

// Receive dialog state and selected workout
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  workout: {
    type: Object,
    default: null,
  },
});

// Send the updated dialog state to the parent component
const emit = defineEmits(["update:modelValue"]);

// Provide v-model support for the dialog
const dialogOpen = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit("update:modelValue", value);
  },
});

// Close the dialog
const closeDialog = () => {
  dialogOpen.value = false;
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/exercise-video-dialog.scss"
></style>
