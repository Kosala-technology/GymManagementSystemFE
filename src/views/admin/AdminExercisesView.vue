<template>
  <div class="admin-exercises">
    <div class="admin-exercises__heading">
      <div>
        <h2>Exercise Library</h2>
        <p>Manage exercises used to build customer workout schedules.</p>
      </div>

      <v-btn color="primary" prepend-icon="mdi-plus" @click="openCreateDialog">
        Add Exercise
      </v-btn>
    </div>

    <v-alert type="info" variant="tonal" class="admin-exercises__notice">
      Frontend demo: changes are saved in this browser only. Demonstration
      videos will be added later.
    </v-alert>

    <!-- Search and category filter -->
    <v-card class="admin-exercises__filters">
      <v-row>
        <v-col cols="12" md="8">
          <v-text-field
            v-model="search"
            label="Search exercises"
            placeholder="Exercise name or equipment"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            hide-details
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="Category"
            placeholder="All categories"
            variant="outlined"
            clearable
            hide-details
          />
        </v-col>
      </v-row>
    </v-card>

    <p class="admin-exercises__count" role="status">
      {{ filteredExercises.length }} exercises found
    </p>

    <!-- Exercise records -->
    <v-card class="admin-exercises__table-card">
      <v-table>
        <thead>
          <tr>
            <th scope="col">Exercise</th>
            <th scope="col">Category</th>
            <th scope="col">Equipment</th>
            <th scope="col">Sets</th>
            <th scope="col">Reps / Duration</th>
            <th scope="col">Rest</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="exercise in filteredExercises" :key="exercise.id">
            <td>
              <div class="admin-exercises__exercise">
                <v-avatar
                  color="primary"
                  variant="tonal"
                  rounded="lg"
                  size="36"
                >
                  <v-icon
                    :icon="exercise.categoryIcon || 'mdi-dumbbell'"
                    size="20"
                  />
                </v-avatar>

                <strong>{{ exercise.exerciseName }}</strong>
              </div>
            </td>

            <td>
              <v-chip color="primary" variant="tonal" size="small">
                {{ exercise.category }}
              </v-chip>
            </td>

            <td>{{ exercise.equipment }}</td>
            <td>{{ exercise.defaultSets }}</td>
            <td>{{ exercise.defaultRepetitions }}</td>
            <td>{{ exercise.defaultRestTime }}</td>

            <td>
              <v-btn
                color="primary"
                variant="text"
                size="small"
                prepend-icon="mdi-pencil-outline"
                :aria-label="`Edit ${exercise.exerciseName}`"
                @click="openEditDialog(exercise)"
              >
                Edit
              </v-btn>
            </td>
          </tr>

          <tr v-if="filteredExercises.length === 0">
            <td colspan="7" class="admin-exercises__empty">
              No exercises match your search.
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Reuse the form created in the previous step -->
    <ExerciseFormDialog
      v-model="formOpen"
      :exercise="selectedExercise"
      :saving="saving"
      @save="saveExercise"
    />

    <v-snackbar
      v-model="feedback.visible"
      :color="feedback.color"
      :timeout="4500"
    >
      {{ feedback.message }}

      <template #actions>
        <v-btn variant="text" @click="feedback.visible = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";

import ExerciseFormDialog from "../../components/admin/ExerciseFormDialog.vue";
import { exerciseLibrary } from "../../data/sampleWorkouts.js";

// A separate key keeps exercise definitions apart from workout progress.
const storageKey = "forwardFitExerciseLibrary:v1";

// Copy the sample library without modifying its original objects.
const exercises = ref(exerciseLibrary.map((exercise) => ({ ...exercise })));

const search = ref("");
const selectedCategory = ref(null);
const selectedExercise = ref(null);
const formOpen = ref(false);
const saving = ref(false);

// Prevent overwriting saved data when it could not be read correctly.
const storageReady = ref(false);

const feedback = reactive({
  visible: false,
  message: "",
  color: "success",
});

const showFeedback = (message, color = "success") => {
  feedback.message = message;
  feedback.color = color;
  feedback.visible = true;
};

// Generate categories from the actual library records.
const categories = computed(() => {
  return [
    ...new Set(exercises.value.map((exercise) => exercise.category)),
  ].sort();
});

const filteredExercises = computed(() => {
  const query = (search.value ?? "").trim().toLowerCase();

  return exercises.value.filter((exercise) => {
    const matchesSearch =
      exercise.exerciseName.toLowerCase().includes(query) ||
      exercise.equipment.toLowerCase().includes(query);

    const matchesCategory =
      !selectedCategory.value || exercise.category === selectedCategory.value;

    return matchesSearch && matchesCategory;
  });
});

// Check saved records before using them in the UI.
const isValidExercise = (exercise) => {
  if (!exercise || typeof exercise !== "object") return false;

  const requiredStrings = [
    "id",
    "exerciseName",
    "category",
    "equipment",
    "defaultRepetitions",
    "defaultRestTime",
    "trainerInstructions",
  ];

  return (
    requiredStrings.every(
      (key) =>
        typeof exercise[key] === "string" && exercise[key].trim().length > 0,
    ) &&
    Number.isInteger(exercise.defaultSets) &&
    exercise.defaultSets > 0 &&
    typeof exercise.videoUrl === "string"
  );
};

const loadExercises = () => {
  try {
    const storedValue = localStorage.getItem(storageKey);

    if (storedValue !== null) {
      const parsed = JSON.parse(storedValue);

      if (
        !Array.isArray(parsed) ||
        !parsed.every(isValidExercise) ||
        new Set(parsed.map((exercise) => exercise.id)).size !== parsed.length
      ) {
        throw new Error("Invalid saved exercise library.");
      }

      exercises.value = parsed;
    }

    storageReady.value = true;
  } catch (error) {
    storageReady.value = false;

    showFeedback(
      "The saved library could not be loaded. Sample exercises are shown; saving is disabled to preserve your data.",
      "error",
    );
  }
};

const openCreateDialog = () => {
  selectedExercise.value = null;
  formOpen.value = true;
};

const openEditDialog = (exercise) => {
  selectedExercise.value = exercise;
  formOpen.value = true;
};

const saveExercise = async (values) => {
  if (saving.value) return;

  if (!storageReady.value) {
    showFeedback(
      "Browser storage is unavailable or contains invalid data. Please resolve this before saving.",
      "error",
    );
    return;
  }

  saving.value = true;

  try {
    const editingId = selectedExercise.value?.id;
    let updatedLibrary;

    if (editingId) {
      const exists = exercises.value.some(
        (exercise) => exercise.id === editingId,
      );

      if (!exists) {
        throw new Error("The exercise could not be found.");
      }

      // Keep the existing ID when editing.
      updatedLibrary = exercises.value.map((exercise) =>
        exercise.id === editingId
          ? { ...exercise, ...values, id: editingId }
          : exercise,
      );
    } else {
      // Create a stable unique ID for the new definition.
      updatedLibrary = [
        ...exercises.value,
        {
          ...values,
          id: `exercise-${crypto.randomUUID()}`,
        },
      ];
    }

    // Save first. Update the displayed library only after success.
    localStorage.setItem(storageKey, JSON.stringify(updatedLibrary));
    exercises.value = updatedLibrary;

    // Keep the saved record visible if its category was changed.
    search.value = "";
    selectedCategory.value = null;
    formOpen.value = false;
    selectedExercise.value = null;

    showFeedback(
      editingId
        ? "Exercise updated in this browser."
        : "Exercise added to this browser’s library.",
    );
  } catch (error) {
    showFeedback(
      "The exercise could not be saved. Your form values have been kept; please try again.",
      "error",
    );
  } finally {
    saving.value = false;
  }
};

onMounted(loadExercises);
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/admin/admin-exercises.scss"
></style>
