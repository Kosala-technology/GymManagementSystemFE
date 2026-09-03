<template>
  <!-- Registration page -->
  <section class="registration-page">
    <div class="registration-form-container">
      <RegistrationForm />
    </div>
  </section>
</template>

<script setup>
// Import the reusable Registration form
import RegistrationForm from '../../components/auth/RegistrationForm.vue'
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/registration.scss"
></style>