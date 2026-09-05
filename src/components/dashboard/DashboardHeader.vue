<template>
  <!-- Customer dashboard top header -->
  <header class="dashboard-header">
    <div class="dashboard-header__container">
      <!-- Forward Fit brand -->
      <router-link
        to="/"
        class="dashboard-header__brand"
        aria-label="Go to Forward Fit home"
      >
        <span class="dashboard-header__brand-icon">
          <v-icon icon="mdi-dumbbell" size="24" />
        </span>

        <span class="dashboard-header__brand-name">
          FORWARD <span>FIT</span>
        </span>
      </router-link>

      <!-- Right-side header actions -->
      <div class="dashboard-header__actions">
        <!-- Notification button -->
        <v-btn
          icon
          variant="text"
          class="dashboard-header__notification"
          aria-label="View notifications"
        >
          <v-badge
            color="primary"
            dot
            location="top end"
            offset-x="3"
            offset-y="3"
          >
            <v-icon icon="mdi-bell-outline" size="24" />
          </v-badge>
        </v-btn>

        <!-- Customer account menu -->
        <v-menu location="bottom end" :offset="10">
          <template #activator="{ props: menuProps }">
            <button
              v-bind="menuProps"
              type="button"
              class="dashboard-header__profile"
              aria-label="Open customer account menu"
            >
              <!-- Customer avatar -->
              <v-avatar
                color="primary"
                size="42"
                class="dashboard-header__avatar"
              >
                <span>{{ customerInitials }}</span>
              </v-avatar>

              <!-- Customer information -->
              <span class="dashboard-header__customer">
                <strong>{{ customerName }}</strong>
                <small>{{ memberId }}</small>
              </span>

              <v-icon
                icon="mdi-chevron-down"
                size="20"
                class="dashboard-header__chevron"
              />
            </button>
          </template>

          <!-- Dropdown menu -->
          <v-card class="dashboard-header__menu" width="230">
            <v-list density="comfortable">
              <v-list-item
                prepend-icon="mdi-view-dashboard-outline"
                title="Dashboard"
              />

              <v-list-item
                prepend-icon="mdi-account-outline"
                title="My Profile"
                @click="emit('profile')"
              />

              <v-divider class="dashboard-header__menu-divider" />

              <v-list-item
                prepend-icon="mdi-logout"
                title="Logout"
                class="dashboard-header__logout-item"
                @click="emit('logout')"
              />
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";

// Information received from the parent dashboard page
const props = defineProps({
  customerName: {
    type: String,
    default: "Kosala Lakshan",
  },

  memberId: {
    type: String,
    default: "FF-2026-00124",
  },
});

// Events sent back to the parent dashboard page
const emit = defineEmits(["profile", "logout"]);

// Create customer initials for the avatar
// Example: "Kosala Lakshan" becomes "KL"
const customerInitials = computed(() => {
  return props.customerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
});
</script>

<!-- All styles are stored in a separate SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/dashboard/dashboard-header.scss"
></style>