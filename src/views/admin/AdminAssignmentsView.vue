<template>
  <div class="admin-assignments">
    <div class="admin-assignments__heading">
      <h2>Schedule Assignments</h2>
      <p>Assign a saved workout schedule to selected customers.</p>
    </div>

    <v-alert
      v-if="storageError"
      type="error"
      variant="tonal"
      class="admin-assignments__notice"
    >
      {{ storageError }}
    </v-alert>

    <v-alert
      v-else-if="templates.length === 0"
      type="info"
      variant="tonal"
      class="admin-assignments__notice"
    >
      Create and save a schedule in Schedule Builder first.
    </v-alert>

    <v-card class="admin-assignments__form-card">
      <v-form ref="formRef" @submit.prevent="assignSchedule">
        <v-row>
          <v-col cols="12">
            <v-select
              v-model="templateId"
              :items="templates"
              item-title="name"
              item-value="id"
              label="Saved schedule"
              variant="outlined"
              :rules="[required]"
              :disabled="Boolean(storageError)"
            />
          </v-col>

          <v-col cols="12">
            <!-- Search dropdown items by name or Member ID -->
            <v-autocomplete
              v-model="customerIds"
              :items="customerOptions"
              item-title="title"
              item-value="value"
              label="Select customers"
              placeholder="Search by Member ID or name"
              variant="outlined"
              multiple
              chips
              closable-chips
              :rules="[atLeastOneCustomer]"
              :disabled="Boolean(storageError)"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="scheduledDate"
              type="date"
              label="Workout date"
              variant="outlined"
              :rules="[validDate]"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-text-field
              v-model="scheduledTime"
              type="time"
              label="Starting time"
              variant="outlined"
              :rules="[validTime]"
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="trainer"
              label="Assigned trainer"
              variant="outlined"
              maxlength="100"
              :rules="[required]"
            />
          </v-col>
        </v-row>

        <p v-if="selectedTemplate" class="admin-assignments__preview">
          {{ selectedTemplate.exercises.length }} exercises ·
          {{ selectedTemplate.estimatedDuration }} ·
          {{ customerIds.length }} customers selected
        </p>

        <div class="admin-assignments__submit">
          <v-btn
            type="submit"
            color="primary"
            prepend-icon="mdi-calendar-check-outline"
            :loading="saving"
            :disabled="
              saving || Boolean(storageError) || templates.length === 0
            "
          >
            Assign Schedule
          </v-btn>
        </div>
      </v-form>
    </v-card>

    <div class="admin-assignments__section-heading">
      <h3>Saved Assignments</h3>
      <span>{{ assignments.length }} assignments</span>
    </div>

    <v-card class="admin-assignments__table-card">
      <v-table>
        <thead>
          <tr>
            <th scope="col">Customer</th>
            <th scope="col">Schedule</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Exercises</th>
            <th scope="col">Trainer</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="assignment in assignments" :key="assignment.id">
            <td>
              <strong>{{ getCustomerName(assignment.customerId) }}</strong>
              <small class="admin-assignments__member-id">
                {{ assignment.customerId }}
              </small>
            </td>

            <td>{{ assignment.scheduleName }}</td>
            <td>{{ assignment.workoutDate }}</td>
            <td>{{ assignment.scheduledTime }}</td>
            <td>{{ assignment.exercises.length }}</td>
            <td>{{ assignment.assignedTrainer }}</td>
          </tr>

          <tr v-if="assignments.length === 0">
            <td colspan="6" class="admin-assignments__empty">
              No schedules have been assigned yet.
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-snackbar
      v-model="feedback.visible"
      :color="feedback.color"
      :timeout="5000"
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

import { sampleCustomers } from "../../data/admin/sampleCustomers.js";

const templateStorageKey = "forwardFitScheduleTemplates:v1";
const assignmentStorageKey = "forwardFitScheduleAssignments:v1";

const templates = ref([]);
const assignments = ref([]);
const storageError = ref("");
const saving = ref(false);
const formRef = ref(null);

const templateId = ref(null);
const customerIds = ref([]);
const scheduledDate = ref("");
const scheduledTime = ref("18:00");
const trainer = ref("Daniel Perera");

const feedback = reactive({
  visible: false,
  message: "",
  color: "success",
});

const showFeedback = (message, color = "success") => {
  Object.assign(feedback, {
    visible: true,
    message,
    color,
  });
};

const customerOptions = sampleCustomers.map((customer) => ({
  title: `${customer.memberId} — ${customer.name}`,
  value: customer.memberId,
}));

const selectedTemplate = computed(() => {
  return templates.value.find((template) => template.id === templateId.value);
});

const required = (value) =>
  (typeof value === "string" && value.trim().length > 0) ||
  "This field is required.";

const atLeastOneCustomer = (value) =>
  (Array.isArray(value) && value.length > 0) || "Select at least one customer.";

// Parse local calendar dates without converting them to UTC.
const parseLocalDate = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value ?? "")) return null;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

const validDate = (value) =>
  Boolean(parseLocalDate(value)) || "Select a valid workout date.";

const validTime = (value) =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test(value ?? "") ||
  "Select a valid starting time.";

const getCustomerName = (id) =>
  sampleCustomers.find((customer) => customer.memberId === id)?.name ??
  "Unknown customer";

// Validate the fields needed when copying a template.
const validExercise = (exercise) =>
  exercise &&
  typeof exercise.exerciseName === "string" &&
  typeof exercise.exerciseId === "string" &&
  typeof exercise.category === "string" &&
  typeof exercise.equipment === "string" &&
  Number.isInteger(exercise.sets) &&
  exercise.sets > 0 &&
  typeof exercise.repetitions === "string" &&
  typeof exercise.restTime === "string" &&
  typeof exercise.trainerInstructions === "string" &&
  typeof exercise.videoUrl === "string";

const validTemplate = (template) =>
  template &&
  typeof template.id === "string" &&
  typeof template.name === "string" &&
  typeof template.estimatedDuration === "string" &&
  Array.isArray(template.exercises) &&
  template.exercises.length > 0 &&
  template.exercises.every(validExercise);

const validAssignment = (assignment) =>
  assignment &&
  typeof assignment.id === "string" &&
  typeof assignment.templateId === "string" &&
  typeof assignment.customerId === "string" &&
  typeof assignment.scheduleName === "string" &&
  Boolean(parseLocalDate(assignment.scheduledDate)) &&
  typeof assignment.scheduledTime === "string" &&
  typeof assignment.assignedTrainer === "string" &&
  Array.isArray(assignment.exercises) &&
  assignment.exercises.length > 0 &&
  assignment.exercises.every(
    (exercise) =>
      validExercise(exercise) &&
      typeof exercise.assignmentId === "string" &&
      ["Pending", "Completed"].includes(exercise.status),
  );

const readRecords = (key, validator) => {
  const raw = localStorage.getItem(key);
  const records = raw === null ? [] : JSON.parse(raw);

  if (
    !Array.isArray(records) ||
    !records.every(validator) ||
    new Set(records.map((record) => record.id)).size !== records.length
  ) {
    throw new Error("Invalid saved records.");
  }

  return records;
};

onMounted(() => {
  try {
    templates.value = readRecords(templateStorageKey, validTemplate);
    assignments.value = readRecords(assignmentStorageKey, validAssignment);
  } catch (error) {
    storageError.value =
      "Saved schedules could not be loaded. Assignment saving is disabled to preserve existing data.";
  }
});

const assignSchedule = async () => {
  if (saving.value || storageError.value || !formRef.value) return;

  saving.value = true;

  try {
    const { valid } = await formRef.value.validate();
    if (!valid) return;

    // Read the latest saved values before creating assignments.
    const latestTemplates = readRecords(templateStorageKey, validTemplate);
    const latestAssignments = readRecords(
      assignmentStorageKey,
      validAssignment,
    );

    const template = latestTemplates.find(
      (item) => item.id === templateId.value,
    );

    if (!template) {
      showFeedback(
        "This template is no longer available. Refresh the page.",
        "error",
      );
      return;
    }

    const selectedIds = [...new Set(customerIds.value)];

    if (
      selectedIds.some(
        (id) => !sampleCustomers.some((customer) => customer.memberId === id),
      )
    ) {
      showFeedback("One of the selected customers is unavailable.", "error");
      return;
    }

    // Prevent accidental duplicate assignments for the same session.
    const duplicate = latestAssignments.some(
      (assignment) =>
        selectedIds.includes(assignment.customerId) &&
        assignment.templateId === template.id &&
        assignment.scheduledDate === scheduledDate.value &&
        assignment.scheduledTime === scheduledTime.value,
    );

    if (duplicate) {
      showFeedback(
        "This schedule is already assigned to a selected customer at this date and time. No new assignments were saved.",
        "warning",
      );
      return;
    }

    const date = parseLocalDate(scheduledDate.value);

    const newAssignments = selectedIds.map((customerId) => {
      const assignmentId = `assignment-${crypto.randomUUID()}`;

      return {
        id: assignmentId,
        templateId: template.id,
        customerId,
        scheduleName: template.name,
        scheduledDate: scheduledDate.value,
        scheduledTime: scheduledTime.value,

        workoutDate: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }).format(date),

        workoutDay: new Intl.DateTimeFormat("en-US", {
          weekday: "long",
        }).format(date),

        assignedTrainer: trainer.value.trim(),
        estimatedDuration: template.estimatedDuration,
        createdAt: new Date().toISOString(),

        // Each customer receives independent exercise copies.
        // Repeated exercises also receive distinct assignment IDs.
        exercises: template.exercises.map((exercise, index) => ({
          ...exercise,
          assignmentId: `${assignmentId}-exercise-${index + 1}`,
          order: index + 1,
          status: "Pending",
        })),
      };
    });

    const updated = [...latestAssignments, ...newAssignments];

    localStorage.setItem(assignmentStorageKey, JSON.stringify(updated));
    assignments.value = updated;
    templates.value = latestTemplates;

    showFeedback(
      `${newAssignments.length} customer assignment(s) saved in this browser.`,
    );
  } catch (error) {
    showFeedback(
      "Assignments could not be saved. Your selections have been kept.",
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
  src="../../assets/styles/pages/admin/admin-assignments.scss"
></style>
