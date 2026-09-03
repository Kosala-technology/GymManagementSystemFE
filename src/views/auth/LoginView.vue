<template>
  <!-- Login page -->
  <section class="login-page">
    <div class="login-form-container">
      <LoginForm />
    </div>
  </section>
</template>

<script setup>
// Import the reusable Login form
import LoginForm from '../../components/auth/LoginForm.vue'
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/login.scss"
></style>