<template>
  <div class="admin-announcements">
    <div class="admin-announcements__heading">
      <h2>Announcements</h2>
      <p>Create messages for all customers or selected members.</p>
    </div>

    <v-alert
      v-if="storageError"
      type="error"
      variant="tonal"
      class="admin-announcements__notice"
    >
      {{ storageError }}
    </v-alert>

    <AnnouncementForm
      v-else
      :customers="sampleCustomers"
      :saving="saving"
      :reset-key="resetKey"
      @submit="handleSave"
    />

    <section
      class="admin-announcements__history"
      aria-labelledby="announcement-history-heading"
    >
      <div class="admin-announcements__history-heading">
        <h3 id="announcement-history-heading">Saved Announcements</h3>

        <span>{{ announcements.length }} records</span>
      </div>

      <p v-if="storageError" class="admin-announcements__empty">
        Announcement history is unavailable.
      </p>

      <p
        v-else-if="announcements.length === 0"
        class="admin-announcements__empty"
      >
        No announcements saved yet.
      </p>

      <v-card
        v-for="announcement in announcements"
        :key="announcement.id"
        class="admin-announcements__record"
      >
        <div class="admin-announcements__record-heading">
          <h4>{{ announcement.title }}</h4>

          <v-chip color="primary" variant="tonal" size="small">
            {{ announcement.recipientIds.length }} recipients
          </v-chip>
        </div>

        <!-- Plain text interpolation; do not render message HTML -->
        <p class="admin-announcements__message">
          {{ announcement.message }}
        </p>

        <div class="admin-announcements__metadata">
          <span>
            {{
              announcement.audience === "all"
                ? "All customers at creation"
                : "Selected customers"
            }}
          </span>

          <time :datetime="announcement.createdAt">
            {{ formatDateTime(announcement.createdAt) }}
          </time>
        </div>

        <!-- Expand to inspect the exact intended recipients -->
        <details class="admin-announcements__recipients">
          <summary>View recipients</summary>

          <ul>
            <li v-for="memberId in announcement.recipientIds" :key="memberId">
              {{ getCustomerName(memberId) }} — {{ memberId }}
            </li>
          </ul>
        </details>
      </v-card>
    </section>

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
import { onMounted, reactive, ref } from "vue";

import AnnouncementForm from "../../components/admin/AnnouncementForm.vue";
import { sampleCustomers } from "../../data/admin/sampleCustomers.js";
import {
  readAnnouncements,
  saveAnnouncement,
} from "../../data/announcements.js";

const announcements = ref([]);
const storageError = ref("");
const saving = ref(false);
const resetKey = ref(0);

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

const getCustomerName = (memberId) =>
  sampleCustomers.find((customer) => customer.memberId === memberId)?.name ??
  "Customer no longer in directory";

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

onMounted(() => {
  try {
    announcements.value = readAnnouncements();
  } catch (error) {
    storageError.value =
      "Saved announcements could not be loaded. Creating announcements is disabled to preserve existing records.";
  }
});

const handleSave = (values) => {
  if (saving.value || storageError.value) return;

  // Verify that recipients still exist in the customer directory.
  const knownIds = new Set(
    sampleCustomers.map((customer) => customer.memberId),
  );

  if (
    !Array.isArray(values.recipientIds) ||
    values.recipientIds.length === 0 ||
    values.recipientIds.some((id) => !knownIds.has(id))
  ) {
    showFeedback("Select valid customers before saving.", "error");
    return;
  }

  saving.value = true;

  try {
    announcements.value = saveAnnouncement(values);

    // Reset the form only after storage succeeds.
    resetKey.value += 1;

    showFeedback(
      "Announcement saved in this browser. No SMS or email was sent.",
    );
  } catch (error) {
    showFeedback(
      "The announcement could not be saved. Your draft has been kept.",
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
  src="../../assets/styles/pages/admin/admin-announcements.scss"
></style>
