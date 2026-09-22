<template>
  <v-dialog
    v-model="dialogOpen"
    max-width="720"
    scrollable
    :persistent="saving"
    aria-labelledby="exercise-form-title"
  >
    <v-card class="exercise-form">
      <div class="exercise-form__heading">
        <div>
          <span>Exercise Library</span>

          <h2 id="exercise-form-title">
            {{ exercise ? "Edit Exercise" : "Add Exercise" }}
          </h2>
        </div>

        <v-btn
          icon="mdi-close"
          variant="text"
          aria-label="Close exercise form"
          :disabled="saving"
          @click="dialogOpen = false"
        />
      </div>

      <v-divider />

      <v-card-text>
        <!-- Submit also works when Enter is pressed -->
        <v-form
          id="admin-exercise-form"
          ref="formRef"
          @submit.prevent="submitForm"
        >
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.exerciseName"
                label="Exercise name"
                :rules="[required, nameLength]"
                variant="outlined"
                maxlength="100"
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <!-- Allow existing or new category names -->
              <v-combobox
                v-model="form.category"
                :items="categories"
                :rules="[required]"
                :return-object="false"
                label="Category"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="form.equipment"
                label="Required equipment"
                placeholder="Dumbbells / No equipment"
                :rules="[required]"
                variant="outlined"
                maxlength="120"
                required
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.defaultSets"
                label="Default sets"
                type="number"
                min="1"
                step="1"
                :rules="[validSets]"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.defaultRepetitions"
                label="Reps / duration"
                placeholder="12 reps / 30 seconds"
                :rules="[required]"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12" sm="4">
              <v-text-field
                v-model="form.defaultRestTime"
                label="Rest time"
                placeholder="60 seconds / No rest"
                :rules="[required]"
                variant="outlined"
                required
              />
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="form.trainerInstructions"
                label="Exercise instructions"
                :rules="[required]"
                variant="outlined"
                rows="3"
                auto-grow
                maxlength="1500"
                counter
                required
              />
            </v-col>
          </v-row>

          <div class="exercise-form__video-note">
            <v-icon icon="mdi-video-outline" size="24" />

            <div>
              <strong>Demonstration video</strong>
              <p>
                No video is added in this version. Video management will be
                connected later.
              </p>
            </div>
          </div>
        </v-form>
      </v-card-text>

      <v-divider />

      <v-card-actions class="exercise-form__actions">
        <v-btn variant="text" :disabled="saving" @click="dialogOpen = false">
          Cancel
        </v-btn>

        <v-btn
          type="submit"
          form="admin-exercise-form"
          color="primary"
          variant="flat"
          :loading="saving"
          :disabled="saving"
        >
          {{ exercise ? "Save Changes" : "Add Exercise" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  // Null means create mode; an exercise object means edit mode.
  exercise: {
    type: Object,
    default: null,
  },

  saving: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const formRef = ref(null);

const categories = [
  "Warm-up",
  "Mobility",
  "Chest",
  "Upper Chest",
  "Back",
  "Shoulders",
  "Legs",
  "Legs and Glutes",
  "Lower Body",
  "Hamstrings",
  "Calves",
  "Biceps",
  "Triceps",
  "Core",
  "Recovery",
];

// Return a fresh object each time the form is reset.
const createEmptyForm = () => ({
  exerciseName: "",
  category: "",
  equipment: "",
  defaultSets: 3,
  defaultRepetitions: "",
  defaultRestTime: "",
  trainerInstructions: "",
});

const form = reactive(createEmptyForm());

const dialogOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// Initialize local editable state from props.
// Editing this form does not directly change the original exercise.
watch(
  [() => props.modelValue, () => props.exercise],
  async ([isOpen, exercise]) => {
    if (!isOpen) return;

    Object.assign(form, createEmptyForm());

    if (exercise) {
      Object.assign(form, {
        exerciseName: exercise.exerciseName ?? "",
        category: exercise.category ?? "",
        equipment: exercise.equipment ?? "",
        defaultSets: exercise.defaultSets ?? 3,
        defaultRepetitions: exercise.defaultRepetitions ?? "",
        defaultRestTime: exercise.defaultRestTime ?? "",
        trainerInstructions: exercise.trainerInstructions ?? "",
      });
    }

    await nextTick();
    formRef.value?.resetValidation();
  },
  { immediate: true },
);

const required = (value) =>
  (typeof value === "string" && value.trim().length > 0) ||
  "This field is required.";

const nameLength = (value) =>
  (typeof value === "string" && value.trim().length >= 3) ||
  "Enter at least 3 characters.";

const validSets = (value) =>
  (Number.isInteger(Number(value)) && Number(value) > 0) ||
  "Enter a whole number greater than zero.";

const submitForm = async () => {
  if (props.saving || !formRef.value) return;

  const { valid } = await formRef.value.validate();
  if (!valid) return;

  // Send clean form values to the parent page.
  // The parent handles ID creation, storage and closing the dialog.
  emit("save", {
    exerciseName: form.exerciseName.trim(),
    category: form.category.trim(),
    equipment: form.equipment.trim(),
    defaultSets: Number(form.defaultSets),
    defaultRepetitions: form.defaultRepetitions.trim(),
    defaultRestTime: form.defaultRestTime.trim(),
    trainerInstructions: form.trainerInstructions.trim(),
    categoryIcon: props.exercise?.categoryIcon ?? "mdi-dumbbell",
    videoUrl: props.exercise?.videoUrl ?? "",
  });
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/admin/exercise-form-dialog.scss"
></style>
