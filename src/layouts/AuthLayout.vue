<template>
  <!-- Authentication pages use a separate layout -->
  <v-main class="auth-layout">
    <!-- Login or Registration page appears here -->
    <router-view />
  </v-main>
</template>

<script setup>
// No JavaScript is required for the basic authentication layout
</script>

<style
  lang="scss"
  scoped
  src="../assets/styles/layouts/auth-layout.scss"
></style>