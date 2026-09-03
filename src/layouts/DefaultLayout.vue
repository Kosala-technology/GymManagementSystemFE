<template>
  <!-- Header used by the public website pages -->
  <AppHeader />

  <!-- Child public routes are displayed here -->
  <v-main>
    <router-view />
  </v-main>
</template>

<script setup>
// Import the shared website header
import AppHeader from '../components/layout/AppHeader.vue'
</script>