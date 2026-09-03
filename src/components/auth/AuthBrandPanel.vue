<template>
  <!-- Branding panel displayed on desktop authentication pages -->
  <aside class="auth-brand-panel">
    <!-- Decorative background shapes -->
    <span
      class="brand-decoration decoration-one"
      aria-hidden="true"
    />

    <span
      class="brand-decoration decoration-two"
      aria-hidden="true"
    />

    <!-- Brand logo -->
    <router-link
      :to="{ name: 'home' }"
      class="auth-brand"
      aria-label="Return to FORWARD FIT home"
    >
      <span class="auth-brand-symbol">
        <v-icon
          icon="mdi-dumbbell"
          size="25"
        />
      </span>

      <span class="auth-brand-name">
        FORWARD <strong>FIT</strong>
      </span>
    </router-link>

    <!-- Main branding message -->
    <div class="brand-message">
      <span class="brand-badge">
        <v-icon
          icon="mdi-lightning-bolt"
          size="17"
        />

        Personalized fitness
      </span>

      <h2>
        Your goals.<br>
        Your workout.<br>
        <span>Your progress.</span>
      </h2>

      <p>
        Access a personalized workout schedule designed by your gym
        administrator and continue moving towards your fitness goals.
      </p>

      <!-- Main system benefits -->
      <ul class="brand-benefits">
        <li
          v-for="benefit in benefits"
          :key="benefit"
        >
          <span>
            <v-icon
              icon="mdi-check"
              size="17"
            />
          </span>

          {{ benefit }}
        </li>
      </ul>
    </div>

    <!-- Athlete image used in the brand panel -->
    <img
      :src="heroAthlete"
      class="auth-athlete-image"
      alt="FORWARD FIT athlete holding a dumbbell"
    >

    <!-- Footer note -->
    <p class="brand-footer">
      Train smarter. Become stronger.
    </p>
  </aside>
</template>

<script setup>
// Import the FORWARD FIT athlete image
import heroAthlete from '../../assets/images/hero-athlete.png'

// Benefits displayed in the authentication brand panel
const benefits = [
  'Secure member account access',
  'Personalized workout schedules',
  'Easy access from any device',
]
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/auth-brand-panel.scss"
></style>