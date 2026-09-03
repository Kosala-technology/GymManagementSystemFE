<template>
  <!-- Root Vuetify application -->
  <v-app>
    <!-- Shared website header -->
    <AppHeader />

    <!-- Main page content -->
    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script setup>
// Import the shared header component
import AppHeader from "./components/layout/AppHeader.vue";

// Import the home page
import HomeView from "./views/HomeView.vue";
</script>
