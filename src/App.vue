<template>
  <!-- Root Vuetify application -->
  <v-app>
    <!--
      Vue Router displays the correct layout and page here.

      Home route:
      DefaultLayout → HomeView

      Authentication routes:
      AuthLayout → LoginView or RegistrationView
    -->
    <router-view />
  </v-app>
</template>

<script setup>
// No imports are required here.
// Vue Router controls the layouts and pages.
</script>