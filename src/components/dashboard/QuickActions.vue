<template>
  <!-- Dashboard quick-access section -->
  <section class="quick-actions" aria-labelledby="quick-actions-heading">
    <div class="quick-actions__heading">
      <div>
        <span class="quick-actions__eyebrow">Shortcuts</span>

        <h2 id="quick-actions-heading">Quick Actions</h2>
      </div>

      <p>Access your important membership features.</p>
    </div>

    <!-- Quick-action buttons -->
    <div class="quick-actions__grid">
      <!-- Workout schedule action -->
      <button
        type="button"
        class="quick-action-card quick-action-card--primary"
        @click="emit('workout-schedule')"
      >
        <span class="quick-action-card__icon">
          <v-icon icon="mdi-calendar-check-outline" size="27" />
        </span>

        <span class="quick-action-card__content">
          <strong>Workout Schedule</strong>
          <small>View your assigned workout plan</small>
        </span>

        <span class="quick-action-card__arrow">
          <v-icon icon="mdi-arrow-right" size="20" />
        </span>
      </button>

      <!-- Customer profile action -->
      <button type="button" class="quick-action-card" @click="emit('profile')">
        <span class="quick-action-card__icon">
          <v-icon icon="mdi-account-outline" size="27" />
        </span>

        <span class="quick-action-card__content">
          <strong>My Profile</strong>
          <small>View and update your information</small>
        </span>

        <span class="quick-action-card__arrow">
          <v-icon icon="mdi-arrow-right" size="20" />
        </span>
      </button>

      <!-- Logout action -->
      <button
        type="button"
        class="quick-action-card quick-action-card--logout"
        @click="emit('logout')"
      >
        <span class="quick-action-card__icon">
          <v-icon icon="mdi-logout" size="27" />
        </span>

        <span class="quick-action-card__content">
          <strong>Logout</strong>
          <small>Securely exit your customer account</small>
        </span>

        <span class="quick-action-card__arrow">
          <v-icon icon="mdi-arrow-right" size="20" />
        </span>
      </button>
    </div>
  </section>
</template>

<script setup>
// Send each selected action to the parent dashboard page
const emit = defineEmits(["workout-schedule", "profile", "logout"]);
</script>

<!-- External SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/dashboard/quick-actions.scss"
></style>
