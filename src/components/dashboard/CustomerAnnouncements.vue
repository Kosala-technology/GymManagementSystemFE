<template>
  <section
    class="customer-announcements"
    aria-labelledby="customer-announcements-title"
  >
    <div class="customer-announcements__heading">
      <div>
        <span>Gym updates</span>
        <h2 id="customer-announcements-title">Announcements</h2>
      </div>

      <v-btn
        variant="text"
        color="primary"
        prepend-icon="mdi-refresh"
        @click="loadMessages"
      >
        Refresh
      </v-btn>
    </div>

    <v-alert v-if="errorMessage" type="error" variant="tonal">
      {{ errorMessage }}
    </v-alert>

    <p
      v-else-if="announcements.length === 0"
      class="customer-announcements__empty"
      role="status"
    >
      No announcements for you yet.
    </p>

    <div v-else class="customer-announcements__list">
      <v-card
        v-for="announcement in announcements"
        :key="announcement.id"
        class="customer-announcements__card"
      >
        <div class="customer-announcements__card-heading">
          <span class="customer-announcements__icon">
            <v-icon icon="mdi-bullhorn-outline" size="23" />
          </span>

          <div>
            <h3>{{ announcement.title }}</h3>

            <time :datetime="announcement.createdAt">
              {{ formatDateTime(announcement.createdAt) }}
            </time>
          </div>
        </div>

        <!-- Render plain text, preserving message line breaks -->
        <p class="customer-announcements__message">
          {{ announcement.message }}
        </p>
      </v-card>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";

import { readCustomerAnnouncements } from "../../data/announcements.js";

const props = defineProps({
  memberId: {
    type: String,
    required: true,
  },
});

const announcements = ref([]);
const errorMessage = ref("");

const loadMessages = () => {
  errorMessage.value = "";

  // Clear the previous customer's messages before loading another ID.
  announcements.value = [];

  if (!props.memberId.trim()) {
    return;
  }

  try {
    announcements.value = readCustomerAnnouncements(props.memberId);
  } catch (error) {
    errorMessage.value =
      "Announcements could not be loaded. Please try refreshing.";
  }
};

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

// Load initially and whenever the parent supplies a different customer.
watch(() => props.memberId, loadMessages, { immediate: true });

// React to announcements changed in another tab on the same origin.
const handleStorageChange = (event) => {
  if (event.key === "forwardFitAnnouncements:v1" || event.key === null) {
    loadMessages();
  }
};

onMounted(() => {
  window.addEventListener("storage", handleStorageChange);
});

onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/customer-announcements.scss"
></style>
