<template>
  <!-- Vuetify positions this header alongside the navigation drawer -->
  <v-app-bar flat height="76" class="admin-header">
    <div class="admin-header__content">
      <div class="admin-header__left">
        <!-- Mobile/tablet sidebar toggle -->
        <v-btn
          v-if="isMobile"
          icon="mdi-menu"
          variant="text"
          aria-label="Open admin navigation"
          :aria-expanded="sidebarOpen"
          class="admin-header__menu-button"
          @click="emit('toggle-sidebar')"
        />

        <!-- Title is supplied by the parent layout -->
        <div class="admin-header__heading">
          <span>Administration</span>
          <h1>{{ pageTitle }}</h1>
        </div>
      </div>

      <div class="admin-header__actions">
        <!-- Existing public home route -->
        <v-btn
          to="/"
          variant="text"
          prepend-icon="mdi-home-outline"
          class="admin-header__website-button"
        >
          View Website
        </v-btn>

        <!-- Display identity without implying an account menu -->
        <div class="admin-header__account">
          <v-avatar
            color="primary"
            variant="tonal"
            size="40"
            aria-hidden="true"
          >
            <span>{{ adminInitials }}</span>
          </v-avatar>

          <div class="admin-header__account-text">
            <strong>{{ adminName }}</strong>
            <small>Gym Administrator</small>
          </div>
        </div>
      </div>
    </div>
  </v-app-bar>
</template>

<script setup>
import { computed } from "vue";

// The layout provides the current title and sidebar state.
const props = defineProps({
  pageTitle: {
    type: String,
    default: "Dashboard",
  },

  adminName: {
    type: String,
    default: "Admin",
  },

  isMobile: {
    type: Boolean,
    default: false,
  },

  sidebarOpen: {
    type: Boolean,
    default: false,
  },
});

// Let the parent layout control the sidebar.
const emit = defineEmits(["toggle-sidebar"]);

// Example: "Gym Admin" becomes "GA".
// Use "A" when the supplied name is empty.
const adminInitials = computed(() => {
  const initials = props.adminName
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return initials || "A";
});
</script>

<!-- All custom styling stays in the external SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/admin/admin-header.scss"
></style>
