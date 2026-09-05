<template>
  <section class="workout-schedule-header">
    <!-- Top navigation row -->
    <div class="workout-schedule-header__navigation">
      <v-btn
        variant="text"
        prepend-icon="mdi-arrow-left"
        class="workout-schedule-header__back-button"
        @click="emit('back')"
      >
        Back to Dashboard
      </v-btn>

      <div class="workout-schedule-header__member">
        <v-icon icon="mdi-identifier" size="18" />

        <span>{{ memberId }}</span>
      </div>
    </div>

    <!-- Schedule heading and completion progress -->
    <div class="workout-schedule-header__content">
      <div class="workout-schedule-header__introduction">
        <span class="workout-schedule-header__eyebrow">
          Personalized Training
        </span>

        <h1>Your Weekly Workout Schedule</h1>

        <p>
          Hello, <strong>{{ customerName }}</strong
          >. Follow the exercises assigned by your trainer and track your weekly
          progress.
        </p>

        <!-- Program details -->
        <div class="workout-schedule-header__details">
          <div class="workout-schedule-header__detail">
            <span class="workout-schedule-header__detail-icon">
              <v-icon icon="mdi-clipboard-text-outline" size="20" />
            </span>

            <div>
              <small>Training program</small>
              <strong>{{ programName }}</strong>
            </div>
          </div>

          <div class="workout-schedule-header__detail">
            <span class="workout-schedule-header__detail-icon">
              <v-icon icon="mdi-account-supervisor-outline" size="20" />
            </span>

            <div>
              <small>Assigned trainer</small>
              <strong>{{ assignedTrainer }}</strong>
            </div>
          </div>

          <div class="workout-schedule-header__detail">
            <span class="workout-schedule-header__detail-icon">
              <v-icon icon="mdi-calendar-week-outline" size="20" />
            </span>

            <div>
              <small>Current progress</small>
              <strong>Program Week {{ programWeek }}</strong>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly progress display -->
      <div class="workout-schedule-header__progress-card">
        <div class="workout-schedule-header__progress-heading">
          <span>Weekly progress</span>

          <strong>{{ progressPercentage }}%</strong>
        </div>

        <v-progress-linear
          :model-value="progressPercentage"
          color="primary"
          bg-color="grey-lighten-3"
          height="9"
          rounded
          class="workout-schedule-header__progress-bar"
        />

        <div class="workout-schedule-header__progress-summary">
          <div>
            <strong>{{ completedWorkouts }}</strong>
            <span>Completed</span>
          </div>

          <span class="workout-schedule-header__summary-divider"></span>

          <div>
            <strong>{{ pendingWorkouts }}</strong>
            <span>Pending</span>
          </div>

          <span class="workout-schedule-header__summary-divider"></span>

          <div>
            <strong>{{ totalWorkouts }}</strong>
            <span>Total</span>
          </div>
        </div>

        <div class="workout-schedule-header__encouragement">
          <v-icon icon="mdi-fire" size="19" />

          <span>{{ progressMessage }}</span>
        </div>
      </div>
    </div>

    <!-- Decorative icon -->
    <v-icon
      icon="mdi-weight-lifter"
      class="workout-schedule-header__decoration"
    />
  </section>
</template>

<script setup>
import { computed } from "vue";

// Information received from the Workout Schedule page
const props = defineProps({
  customerName: {
    type: String,
    required: true,
  },

  memberId: {
    type: String,
    required: true,
  },

  programName: {
    type: String,
    required: true,
  },

  assignedTrainer: {
    type: String,
    required: true,
  },

  programWeek: {
    type: Number,
    required: true,
  },

  totalWorkouts: {
    type: Number,
    default: 0,
  },

  completedWorkouts: {
    type: Number,
    default: 0,
  },

  pendingWorkouts: {
    type: Number,
    default: 0,
  },
});

// Send the Back button click to the parent page
const emit = defineEmits(["back"]);

// Calculate the completed workout percentage
const progressPercentage = computed(() => {
  if (props.totalWorkouts === 0) {
    return 0;
  }

  return Math.round((props.completedWorkouts / props.totalWorkouts) * 100);
});

// Display a message based on workout completion
const progressMessage = computed(() => {
  if (progressPercentage.value === 100) {
    return "Excellent! You completed your weekly program.";
  }

  if (progressPercentage.value >= 60) {
    return "Great progress. Keep your momentum going!";
  }

  if (props.completedWorkouts > 0) {
    return "Good start. Stay consistent with your plan.";
  }

  return "Complete your first workout to begin your progress.";
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/workout-schedule-header.scss"
></style>
