<template>
  <div class="admin-schedules">
    <div class="admin-schedules__heading">
      <div>
        <h2>Schedule Builder</h2>
        <p>Create reusable workout schedules from your exercise library.</p>
      </div>

      <v-chip color="primary" variant="tonal"> Frontend demo </v-chip>
    </div>

    <v-alert
      v-if="storageError"
      type="error"
      variant="tonal"
      class="admin-schedules__notice"
    >
      {{ storageError }}
    </v-alert>

    <v-alert v-else type="info" variant="tonal" class="admin-schedules__notice">
      Templates are saved in this browser. Saving a template does not assign it
      to a customer.
    </v-alert>

    <!-- Saved templates -->
    <section class="admin-schedules__section">
      <div class="admin-schedules__section-heading">
        <h3>Saved Schedules</h3>
        <span>{{ templates.length }} templates</span>
      </div>

      <v-card class="admin-schedules__table-card">
        <v-table v-if="templates.length">
          <thead>
            <tr>
              <th scope="col">Schedule</th>
              <th scope="col">Exercises</th>
              <th scope="col">Estimated Duration</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="template in templates" :key="template.id">
              <td>{{ template.name }}</td>
              <td>{{ template.exercises.length }}</td>
              <td>{{ template.estimatedDuration }}</td>
              <td>
                <v-btn
                  color="primary"
                  variant="text"
                  size="small"
                  :disabled="saving || Boolean(storageError)"
                  :aria-label="`Edit ${template.name}`"
                  @click="requestEdit(template)"
                >
                  Edit
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>

        <p v-else class="admin-schedules__empty">
          No saved schedules yet. Create your first template below.
        </p>
      </v-card>
    </section>

    <!-- Builder form -->
    <v-form ref="formRef" @submit.prevent="saveTemplate">
      <v-card class="admin-schedules__builder">
        <div class="admin-schedules__section-heading">
          <h3>{{ editingId ? "Edit Schedule" : "Create Schedule" }}</h3>

          <v-btn
            type="button"
            variant="text"
            color="primary"
            :disabled="saving"
            @click="requestNew"
          >
            New Schedule
          </v-btn>
        </div>

        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="draft.name"
              label="Schedule name"
              placeholder="Example: Upper Body Strength"
              variant="outlined"
              maxlength="100"
              :rules="[required]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="draft.estimatedDuration"
              label="Estimated duration"
              placeholder="Example: 75 minutes"
              variant="outlined"
              maxlength="60"
              :rules="[required]"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="draft.description"
              label="Schedule notes (optional)"
              variant="outlined"
              rows="2"
              auto-grow
              maxlength="1000"
            />
          </v-col>
        </v-row>

        <v-divider class="admin-schedules__divider" />

        <!-- Add exercises from the browser library -->
        <div class="admin-schedules__picker">
          <v-autocomplete
            v-model="selectedLibraryId"
            :items="library"
            item-title="exerciseName"
            item-value="id"
            label="Choose an exercise"
            placeholder="Search the exercise library"
            variant="outlined"
            clearable
            hide-details
            :disabled="Boolean(storageError)"
          />

          <v-btn
            type="button"
            color="primary"
            variant="tonal"
            prepend-icon="mdi-plus"
            :disabled="!selectedLibraryId || Boolean(storageError)"
            @click="addExercise"
          >
            Add Exercise
          </v-btn>
        </div>

        <p class="admin-schedules__hint">
          Add as many exercises as required. Use the arrows to set their order.
          The same exercise can appear more than once.
        </p>

        <div
          v-if="draft.exercises.length"
          class="admin-schedules__exercise-list"
        >
          <ScheduleExerciseEditor
            v-for="(exercise, index) in draft.exercises"
            :key="exercise.templateExerciseId"
            :exercise="exercise"
            :position="index + 1"
            :total="draft.exercises.length"
            @update="updateExercise(index, $event)"
            @move-up="moveExercise(index, -1)"
            @move-down="moveExercise(index, 1)"
            @remove="removeExercise(index)"
          />
        </div>

        <div v-else class="admin-schedules__empty">
          Add an exercise to begin building this schedule.
        </div>

        <div class="admin-schedules__save-row">
          <span>{{ draft.exercises.length }} exercises selected</span>

          <v-btn
            type="submit"
            color="primary"
            prepend-icon="mdi-content-save-outline"
            :loading="saving"
            :disabled="
              saving || Boolean(storageError) || draft.exercises.length === 0
            "
          >
            {{ editingId ? "Save Changes" : "Save Schedule" }}
          </v-btn>
        </div>
      </v-card>
    </v-form>

    <!-- Protect unsaved edits when switching templates -->
    <v-dialog
      v-model="discardDialog"
      max-width="440"
      aria-labelledby="discard-schedule-title"
    >
      <v-card>
        <v-card-title id="discard-schedule-title">
          Discard unsaved changes?
        </v-card-title>

        <v-card-text> Your current edits have not been saved. </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn variant="text" @click="discardDialog = false">
            Keep Editing
          </v-btn>

          <v-btn color="error" variant="tonal" @click="confirmDiscard">
            Discard Changes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="feedback.visible"
      :color="feedback.color"
      :timeout="4000"
    >
      {{ feedback.message }}

      <template #actions>
        <v-btn variant="text" @click="feedback.visible = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue";

import ScheduleExerciseEditor from "../../components/admin/ScheduleExerciseEditor.vue";
import { exerciseLibrary } from "../../data/sampleWorkouts.js";

// Use the same library key as the Exercise Library page.
const libraryStorageKey = "forwardFitExerciseLibrary:v1";
const templateStorageKey = "forwardFitScheduleTemplates:v1";

const library = ref([]);
const templates = ref([]);
const storageError = ref("");
const saving = ref(false);
const formRef = ref(null);

const editingId = ref(null);
const selectedLibraryId = ref(null);
const discardDialog = ref(false);
const pendingTemplate = ref(null);

const createEmptyDraft = () => ({
  name: "",
  estimatedDuration: "",
  description: "",
  exercises: [],
});

const draft = reactive(createEmptyDraft());
const savedDraftSnapshot = ref(JSON.stringify(draft));

const feedback = reactive({
  visible: false,
  message: "",
  color: "success",
});

const required = (value) =>
  (typeof value === "string" && value.trim().length > 0) ||
  "This field is required.";

const hasUnsavedChanges = computed(() => {
  return JSON.stringify(draft) !== savedDraftSnapshot.value;
});

const showFeedback = (message, color = "success") => {
  feedback.message = message;
  feedback.color = color;
  feedback.visible = true;
};

const isNonEmptyString = (value) =>
  typeof value === "string" && value.trim().length > 0;

// Reject malformed saved data without overwriting it.
const isValidLibraryExercise = (exercise) => {
  return (
    exercise &&
    isNonEmptyString(exercise.id) &&
    isNonEmptyString(exercise.exerciseName) &&
    isNonEmptyString(exercise.category) &&
    isNonEmptyString(exercise.equipment) &&
    Number.isInteger(exercise.defaultSets) &&
    exercise.defaultSets > 0 &&
    isNonEmptyString(exercise.defaultRepetitions) &&
    isNonEmptyString(exercise.defaultRestTime) &&
    isNonEmptyString(exercise.trainerInstructions) &&
    typeof exercise.videoUrl === "string"
  );
};

const isValidTemplateExercise = (exercise) => {
  return (
    exercise &&
    isNonEmptyString(exercise.templateExerciseId) &&
    isNonEmptyString(exercise.exerciseId) &&
    isNonEmptyString(exercise.exerciseName) &&
    isNonEmptyString(exercise.category) &&
    isNonEmptyString(exercise.equipment) &&
    Number.isInteger(exercise.sets) &&
    exercise.sets > 0 &&
    isNonEmptyString(exercise.repetitions) &&
    isNonEmptyString(exercise.restTime) &&
    isNonEmptyString(exercise.trainerInstructions) &&
    typeof exercise.videoUrl === "string"
  );
};

const isValidTemplate = (template) => {
  return (
    template &&
    isNonEmptyString(template.id) &&
    isNonEmptyString(template.name) &&
    isNonEmptyString(template.estimatedDuration) &&
    typeof template.description === "string" &&
    Array.isArray(template.exercises) &&
    template.exercises.length > 0 &&
    template.exercises.every(isValidTemplateExercise) &&
    new Set(template.exercises.map((exercise) => exercise.templateExerciseId))
      .size === template.exercises.length
  );
};

const readStoredArray = (key, fallback, validator) => {
  const raw = localStorage.getItem(key);
  const records = raw === null ? fallback : JSON.parse(raw);

  if (
    !Array.isArray(records) ||
    !records.every(validator) ||
    new Set(records.map((record) => record.id)).size !== records.length
  ) {
    throw new Error(`Invalid records for ${key}`);
  }

  return records;
};

onMounted(() => {
  try {
    library.value = readStoredArray(
      libraryStorageKey,
      exerciseLibrary.map((exercise) => ({ ...exercise })),
      isValidLibraryExercise,
    );

    templates.value = readStoredArray(templateStorageKey, [], isValidTemplate);
  } catch (error) {
    storageError.value =
      "Saved data could not be loaded. Saving is disabled to preserve existing records.";
  }
});

// Create a separate schedule item.
// Each occurrence gets its own ID, even if the exercise is repeated.
const addExercise = () => {
  const source = library.value.find(
    (exercise) => exercise.id === selectedLibraryId.value,
  );

  if (!source) return;

  draft.exercises.push({
    templateExerciseId: crypto.randomUUID(),
    exerciseId: source.id,
    exerciseName: source.exerciseName,
    category: source.category,
    equipment: source.equipment,
    categoryIcon: source.categoryIcon || "mdi-dumbbell",
    sets: source.defaultSets,
    repetitions: source.defaultRepetitions,
    restTime: source.defaultRestTime,
    trainerInstructions: source.trainerInstructions,
    videoUrl: source.videoUrl,
  });

  selectedLibraryId.value = null;
};

const updateExercise = (index, exercise) => {
  draft.exercises[index] = exercise;
};

const moveExercise = (index, direction) => {
  const target = index + direction;

  if (target < 0 || target >= draft.exercises.length) return;

  const [exercise] = draft.exercises.splice(index, 1);
  draft.exercises.splice(target, 0, exercise);
};

const removeExercise = (index) => {
  draft.exercises.splice(index, 1);
};

// Copy template data so editing never changes the saved list immediately.
const loadDraft = async (template = null) => {
  editingId.value = template?.id ?? null;

  Object.assign(
    draft,
    template
      ? {
          name: template.name,
          estimatedDuration: template.estimatedDuration,
          description: template.description,
          exercises: template.exercises.map((exercise) => ({
            ...exercise,
          })),
        }
      : createEmptyDraft(),
  );

  selectedLibraryId.value = null;
  savedDraftSnapshot.value = JSON.stringify(draft);

  await nextTick();
  formRef.value?.resetValidation();
};

const requestDraftChange = (template) => {
  if (hasUnsavedChanges.value) {
    pendingTemplate.value = template;
    discardDialog.value = true;
    return;
  }

  loadDraft(template);
};

const requestNew = () => requestDraftChange(null);
const requestEdit = (template) => requestDraftChange(template);

const confirmDiscard = () => {
  const template = pendingTemplate.value;
  pendingTemplate.value = null;
  discardDialog.value = false;
  loadDraft(template);
};

const saveTemplate = async () => {
  if (saving.value || storageError.value || !formRef.value) return;

  saving.value = true;

  try {
    const { valid } = await formRef.value.validate();

    if (!valid || draft.exercises.length === 0) {
      showFeedback("Complete the required schedule fields.", "error");
      return;
    }

    const existing = templates.value.find(
      (template) => template.id === editingId.value,
    );

    const timestamp = new Date().toISOString();

    const template = {
      id: editingId.value || `schedule-template-${crypto.randomUUID()}`,
      name: draft.name.trim(),
      estimatedDuration: draft.estimatedDuration.trim(),
      description: draft.description.trim(),
      createdAt: existing?.createdAt || timestamp,
      updatedAt: timestamp,

      // Save order explicitly and convert sets to a number.
      exercises: draft.exercises.map((exercise, index) => ({
        ...exercise,
        order: index + 1,
        sets: Number(exercise.sets),
        repetitions: exercise.repetitions.trim(),
        restTime: exercise.restTime.trim(),
        trainerInstructions: exercise.trainerInstructions.trim(),
      })),
    };

    if (!isValidTemplate(template)) {
      showFeedback("Check the exercise details before saving.", "error");
      return;
    }

    const updatedTemplates = editingId.value
      ? templates.value.map((item) =>
          item.id === editingId.value ? template : item,
        )
      : [...templates.value, template];

    // Update the UI only after browser storage succeeds.
    localStorage.setItem(templateStorageKey, JSON.stringify(updatedTemplates));

    templates.value = updatedTemplates;
    await loadDraft(template);

    showFeedback("Schedule saved in this browser.");
  } catch (error) {
    showFeedback(
      "The schedule could not be saved. Your current edits are still available.",
      "error",
    );
  } finally {
    saving.value = false;
  }
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/admin/admin-schedules.scss"
></style>
