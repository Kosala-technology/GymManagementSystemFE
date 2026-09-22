<template>
  <!--
    App.vue already contains v-app.
    v-layout coordinates the admin drawer, header and main content.
  -->
  <v-layout class="admin-layout">
    <AdminSidebar
      v-model="sidebarOpen"
      :is-mobile="isMobile"
      :admin-name="adminName"
      @logout="handleLogout"
    />

    <AdminHeader
      :page-title="pageTitle"
      :admin-name="adminName"
      :is-mobile="isMobile"
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="toggleSidebar"
    />

    <!-- Vuetify reserves space for the header and desktop sidebar -->
    <v-main class="admin-layout__main">
      <div class="admin-layout__content">
        <!-- The selected admin child route appears here -->
        <router-view />
      </div>
    </v-main>

    <!-- Temporary feedback until admin authentication is developed -->
    <v-snackbar v-model="showLogoutMessage" color="secondary" :timeout="4000">
      Admin sign-in and logout will be connected when we add admin
      authentication.

      <template #actions>
        <v-btn variant="text" @click="showLogoutMessage = false"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import AdminSidebar from "../components/admin/AdminSidebar.vue";
import AdminHeader from "../components/admin/AdminHeader.vue";

const route = useRoute();

// Sample admin identity; no backend account is loaded here.
const adminName = "Admin";

// Keep this breakpoint consistent with the existing SCSS variables.
const isMobile = ref(window.matchMedia("(max-width: 960px)").matches);

const sidebarOpen = ref(!isMobile.value);
const showLogoutMessage = ref(false);

// Read the current page title from the route configuration.
const pageTitle = computed(() => {
  return route.meta.pageTitle || "Dashboard";
});

// Open or close the temporary mobile sidebar.
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Close the mobile drawer after any route change.
watch(
  () => route.fullPath,
  () => {
    if (isMobile.value) {
      sidebarOpen.value = false;
    }
  },
);

// This is only UI feedback until admin authentication is implemented.
const handleLogout = () => {
  showLogoutMessage.value = true;
};

// Watch the same breakpoint used by the external SCSS.
const mobileMediaQuery = window.matchMedia("(max-width: 960px)");

const handleScreenChange = (event) => {
  isMobile.value = event.matches;

  // Open on desktop and close on mobile.
  sidebarOpen.value = !event.matches;
};

onMounted(() => {
  mobileMediaQuery.addEventListener("change", handleScreenChange);
});

// Remove the listener when leaving the admin layout.
onUnmounted(() => {
  mobileMediaQuery.removeEventListener("change", handleScreenChange);
});
</script>

<style
  lang="scss"
  scoped
  src="../assets/styles/layouts/admin-layout.scss"
></style>
