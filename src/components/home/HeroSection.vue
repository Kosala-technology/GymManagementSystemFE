<template>
  <!-- Main landing-page hero section -->
  <section id="home" class="hero-section">
    <!-- Decorative background shapes -->
    <div class="hero-decoration hero-decoration-one" aria-hidden="true" />

    <div class="hero-decoration hero-decoration-two" aria-hidden="true" />

    <div class="page-container hero-container">
      <!-- Left: Hero content -->
      <div class="hero-content animate-fade-up">
        <!-- Small introductory badge -->
        <div class="hero-badge">
          <span class="badge-icon">
            <v-icon icon="mdi-lightning-bolt" size="17" />
          </span>

          Personalized fitness experience
        </div>

        <!-- Main marketing heading -->
        <h1 class="hero-title">
          Build your strength.
          <span>Transform your life.</span>
        </h1>

        <!-- System-focused description -->
        <p class="hero-description">
          Take control of your fitness journey with personalized workout
          schedules designed around your goals. Access your training plan
          securely, track your routine and train with confidence.
        </p>

        <!-- Hero action buttons -->
        <div class="hero-actions">
          <!-- Main call-to-action button -->
          <v-btn
            color="primary"
            size="x-large"
            class="primary-action"
            aria-label="Get started with PULSEFIT"
          >
            <span>Get Started</span>

            <v-icon icon="mdi-arrow-right" end size="21" class="action-icon" />
          </v-btn>

          <!-- Secondary programs button -->
          <v-btn
            variant="outlined"
            size="x-large"
            class="secondary-action"
            aria-label="View available workout programs"
          >
            <v-icon
              icon="mdi-play-circle-outline"
              start
              size="23"
              class="program-icon"
            />

            <span>View Programs</span>
          </v-btn>
        </div>

        <!-- Member trust message -->
        <div class="trust-message">
          <div class="member-avatars">
            <span>KL</span>
            <span>ND</span>
            <span>KP</span>
          </div>

          <div class="trust-content">
            <div class="trust-rating">
              <v-icon
                v-for="star in 5"
                :key="star"
                icon="mdi-star"
                color="warning"
                size="16"
              />
            </div>

            <span>Built for goal-focused gym members</span>
          </div>
        </div>

        <!-- Main system highlights -->
        <HeroStats />
      </div>

      <!-- Right: Hero image composition -->
      <div class="hero-visual">
        <div class="visual-background" aria-hidden="true" />

        <div class="visual-pattern" aria-hidden="true" />

        <!-- Generated PULSEFIT athlete image -->
        <img
          :src="heroAthlete"
          class="hero-image"
          alt="PULSEFIT athlete holding a dumbbell and ready for a personalized workout"
        />

        <!-- Personalized workout floating card -->
        <div class="workout-card">
          <div class="workout-card-icon">
            <v-icon icon="mdi-arm-flex-outline" size="24" />
          </div>

          <div class="workout-card-content">
            <span>Today's workout</span>
            <strong>Upper Body Strength</strong>
          </div>

          <span class="workout-duration"> 45 min </span>
        </div>

        <!-- Schedule status card -->
        <div class="schedule-card">
          <span class="schedule-check">
            <v-icon icon="mdi-check" size="18" />
          </span>

          <div>
            <strong>Personal plan ready</strong>
            <span>Updated by your trainer</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import the generated athlete image
import heroAthlete from "../../assets/images/hero-athlete.png";

// Import the reusable hero highlights component
import HeroStats from "./HeroStats.vue";
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/hero-section.scss"
></style>
