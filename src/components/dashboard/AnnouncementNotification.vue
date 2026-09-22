<template>
  <v-menu
    v-model="menuOpen"
    location="bottom end"
    :offset="12"
    :close-on-content-click="false"
  >
    <template #activator="{ props: menuProps }">
      <v-btn
        v-bind="menuProps"
        icon
        variant="text"
        class="announcement-notification__button"
        :aria-label="`Announcements: ${announcements.length} messages`"
      >
        <!-- Hide the badge when there are no announcements -->
        <v-badge
          :model-value="announcements.length > 0"
          :content="badgeCount"
          color="primary"
          offset-x="2"
          offset-y="2"
        >
          <v-icon icon="mdi-bell-outline" size="24" />
        </v-badge>
      </v-btn>
    </template>

    <v-card class="announcement-notification__panel">
      <div class="announcement-notification__heading">
        <h2>Announcements</h2>

        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          aria-label="Close announcements"
          @click="menuOpen = false"
        />
      </div>

      <v-divider />

      <div class="announcement-notification__list">
        <v-alert v-if="errorMessage" type="error" variant="tonal">
          {{ errorMessage }}
        </v-alert>

        <p
          v-else-if="announcements.length === 0"
          class="announcement-notification__empty"
        >
          No announcements for you yet.
        </p>

        <article
          v-for="announcement in announcements"
          v-else
          :key="announcement.id"
          class="announcement-notification__item"
        >
          <span class="announcement-notification__icon">
            <v-icon icon="mdi-bullhorn-outline" size="21" />
          </span>

          <div class="announcement-notification__content">
            <h3>{{ announcement.title }}</h3>

            <!-- Plain text keeps the message safe to display -->
            <p>{{ announcement.message }}</p>

            <time :datetime="announcement.createdAt">
              {{ formatDateTime(announcement.createdAt) }}
            </time>
          </div>
        </article>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

import { readCustomerAnnouncements } from "../../data/announcements.js";

const props = defineProps({
  memberId: {
    type: String,
    required: true,
  },
});

const menuOpen = ref(false);
const announcements = ref([]);
const errorMessage = ref("");

const badgeCount = computed(() =>
  announcements.value.length > 99 ? "99+" : announcements.value.length,
);

const loadAnnouncements = () => {
  announcements.value = [];
  errorMessage.value = "";

  if (!props.memberId.trim()) return;

  try {
    // Read only announcements addressed to this customer.
    announcements.value = readCustomerAnnouncements(props.memberId);
  } catch (error) {
    errorMessage.value = "Announcements could not be loaded.";
  }
};

const formatDateTime = (value) =>
  new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));

// Reload when the customer changes.
watch(
  () => props.memberId,
  () => {
    menuOpen.value = false;
    loadAnnouncements();
  },
  { immediate: true },
);

// Get the latest messages whenever the bell is opened.
watch(menuOpen, (isOpen) => {
  if (isOpen) loadAnnouncements();
});

// Update when another tab changes announcement storage.
const handleStorageChange = (event) => {
  if (event.key === "forwardFitAnnouncements:v1" || event.key === null) {
    loadAnnouncements();
  }
};

onMounted(() => {
  window.addEventListener("storage", handleStorageChange);
  window.addEventListener("focus", loadAnnouncements);
});

onUnmounted(() => {
  window.removeEventListener("storage", handleStorageChange);
  window.removeEventListener("focus", loadAnnouncements);
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/announcement-notification.scss"
></style>
