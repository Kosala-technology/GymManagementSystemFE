<template>
  <!-- Temporary registration page used to verify routing -->
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9" md="6" lg="4" class="text-center">
        <v-icon
          icon="mdi-account-plus-outline"
          color="primary"
          size="56"
          class="mb-4"
        />

        <h1 class="text-h3 font-weight-bold mb-3">Registration</h1>

        <p class="text-medium-emphasis mb-6">
          Create your FORWARD FIT member account
        </p>

        <!-- Temporary navigation link -->
        <v-btn :to="{ name: 'login' }" color="primary" size="large">
          Go to Login
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
// The complete registration form will replace this temporary content
</script>
