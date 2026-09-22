<template>
  <v-card class="schedule-exercise-editor">
    <div class="schedule-exercise-editor__header">
      <div class="schedule-exercise-editor__identity">
        <span class="schedule-exercise-editor__number">
          {{ position }}
        </span>

        <div>
          <h3>{{ exercise.exerciseName }}</h3>
          <p>{{ exercise.equipment }}</p>
        </div>
      </div>

      <!-- Parent handles reordering and removal -->
      <div class="schedule-exercise-editor__controls">
        <v-btn
          icon="mdi-arrow-up"
          variant="text"
          size="small"
          :disabled="position === 1"
          :aria-label="`Move ${exercise.exerciseName} up`"
          @click="emit('move-up')"
        />

        <v-btn
          icon="mdi-arrow-down"
          variant="text"
          size="small"
          :disabled="position === total"
          :aria-label="`Move ${exercise.exerciseName} down`"
          @click="emit('move-down')"
        />

        <v-btn
          icon="mdi-close"
          variant="text"
          color="error"
          size="small"
          :aria-label="`Remove ${exercise.exerciseName} from this schedule`"
          @click="emit('remove')"
        />
      </div>
    </div>

    <div class="schedule-exercise-editor__body">
      <!-- Fields participate in the parent Schedule Builder's v-form -->
      <v-row>
        <v-col cols="12" sm="4">
          <v-text-field
            :model-value="exercise.sets"
            label="Sets"
            type="number"
            min="1"
            step="1"
            variant="outlined"
            density="comfortable"
            :rules="[validSets]"
            hide-details="auto"
            @update:model-value="updateField('sets', $event)"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            :model-value="exercise.repetitions"
            label="Reps / duration"
            placeholder="12 reps / 30 seconds"
            variant="outlined"
            density="comfortable"
            :rules="[required]"
            hide-details="auto"
            @update:model-value="updateField('repetitions', $event)"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            :model-value="exercise.restTime"
            label="Rest time"
            placeholder="60 seconds / No rest"
            variant="outlined"
            density="comfortable"
            :rules="[required]"
            hide-details="auto"
            @update:model-value="updateField('restTime', $event)"
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            :model-value="exercise.trainerInstructions"
            label="Instructions for this schedule"
            variant="outlined"
            rows="2"
            auto-grow
            maxlength="1500"
            :rules="[required]"
            hide-details="auto"
            @update:model-value="updateField('trainerInstructions', $event)"
          />
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script setup>
// The parent supplies a schedule-specific copy of the exercise.
const props = defineProps({
  exercise: {
    type: Object,
    required: true,
  },

  // Human-readable order: 1, 2, 3...
  position: {
    type: Number,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["update", "move-up", "move-down", "remove"]);

const required = (value) =>
  (typeof value === "string" && value.trim().length > 0) ||
  "This field is required.";

const validSets = (value) =>
  (Number.isInteger(Number(value)) && Number(value) > 0) ||
  "Enter a whole number greater than zero.";

// Emit a new object instead of directly modifying the exercise prop.
const updateField = (field, value) => {
  emit("update", {
    ...props.exercise,
    [field]: value,
  });
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/admin/schedule-exercise-editor.scss"
></style>
