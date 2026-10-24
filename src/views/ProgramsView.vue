<template>
  <main class="programs-page">
    <!-- =====================================
         SECTION 01 - INTRODUCTION
    ====================================== -->
    <section class="programs-hero">
      <div class="page-container programs-hero-container">
        <!-- Left Side Content -->
        <div class="programs-hero-content">
          <div class="programs-hero-badge">
            <v-icon icon="mdi-lightning-bolt" size="18" />
            WELCOME TO FORWARD FIT
          </div>

          <h1 class="programs-hero-title">
            Train Smarter.
            <span>Become Stronger.</span>
          </h1>

          <p class="programs-hero-description">
            Forward Fit brings fitness and technology together to make your gym
            experience simpler. Discover training programs, create your member
            account, and access your personal fitness information in one place.
          </p>

          <div class="programs-hero-actions">
            <v-btn
              :to="{ name: 'register' }"
              color="primary"
              size="large"
              class="programs-primary-btn"
            >
              Join Forward Fit

              <v-icon icon="mdi-arrow-right" end size="20" />
            </v-btn>

            <a href="#training-programs" class="programs-explore-btn">
              Explore Programs

              <v-icon icon="mdi-arrow-down" size="19" />
            </a>
          </div>

          <!-- System Highlights -->
          <div class="programs-hero-features">
            <span>
              <v-icon icon="mdi-shield-check-outline" size="20" />
              Secure Member Access
            </span>

            <span>
              <v-icon icon="mdi-account-heart-outline" size="20" />
              Goal-Focused Experience
            </span>
          </div>
        </div>

        <!-- Right Side Athlete Image -->
        <div class="programs-hero-visual">
          <div class="programs-visual-circle"></div>

          <img
            :src="heroAthlete"
            alt="Athlete holding a dumbbell"
            class="programs-athlete-image"
          />

          <!-- Floating Information Card -->
          <div class="programs-floating-card">
            <div class="programs-floating-icon">
              <v-icon icon="mdi-dumbbell" size="23" />
            </div>

            <div>
              <span>Your Fitness Journey</span>
              <strong>Starts Here</strong>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================
         SECTION 02 - TRAINING PROGRAMS
    ====================================== -->
    <section id="training-programs" class="programs-section">
      <div class="page-container">
        <div class="programs-section-heading">
          <div class="programs-section-badge">OUR TRAINING PROGRAMS</div>

          <h2>
            Find the Right Program
            <span>for Your Goals.</span>
          </h2>

          <p>
            Every fitness journey is different. Explore training options that
            focus on strength, endurance, weight management, and personal
            fitness development.
          </p>
        </div>

        <!-- Program Cards -->
        <v-row class="programs-grid">
          <v-col
            v-for="(program, index) in programs"
            :key="program.title"
            cols="12"
            sm="6"
            lg="3"
          >
            <v-card class="program-card h-100" elevation="0">
              <div class="program-card-top">
                <div class="program-icon">
                  <v-icon :icon="program.icon" size="35" />
                </div>

                <span class="program-number"> 0{{ index + 1 }} </span>
              </div>

              <h3 class="program-title">
                {{ program.title }}
              </h3>

              <p class="program-description">
                {{ program.description }}
              </p>

              <div class="program-card-footer">
                <span>
                  {{ program.focus }}
                </span>

                <v-icon icon="mdi-arrow-top-right" size="20" />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </section>

    <!-- =====================================
         SECTION 03 - HOW FORWARD FIT WORKS
    ====================================== -->
    <section class="programs-how-section">
      <div class="page-container">
        <div class="programs-section-heading">
          <div class="programs-section-badge">HOW FORWARD FIT WORKS</div>

          <h2>
            Your Fitness Journey,
            <span>Made Simple.</span>
          </h2>

          <p>
            Getting started with Forward Fit is simple. Explore training
            options, create your secure member account, and manage your fitness
            information through your personal dashboard.
          </p>
        </div>

        <div class="programs-steps-grid">
          <div
            v-for="step in steps"
            :key="step.number"
            class="programs-step-card"
          >
            <div class="programs-step-number">
              {{ step.number }}
            </div>

            <div class="programs-step-icon">
              <v-icon :icon="step.icon" size="32" />
            </div>

            <h3>
              {{ step.title }}
            </h3>

            <p>
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="programs-info-note">
          <v-icon icon="mdi-information-outline" size="24" />

          <p>
            Your Forward Fit member account helps you securely access your
            personal details, Member ID, and fitness goal. Contact the gym team
            for guidance on suitable training activities.
          </p>
        </div>
      </div>
    </section>

    <!-- =====================================
         SECTION 04 - JOIN FORWARD FIT
    ====================================== -->
    <section class="programs-cta-section">
      <div class="page-container">
        <div class="programs-cta-container">
          <div class="programs-cta-content">
            <span> YOUR JOURNEY STARTS TODAY </span>

            <h2>Ready to Make a Change?</h2>

            <p>
              Take the first step towards your fitness goals and become part of
              the Forward Fit community.
            </p>
          </div>

          <v-btn
            :to="{ name: 'register' }"
            color="primary"
            size="large"
            class="programs-cta-button"
          >
            Create Your Account

            <v-icon icon="mdi-arrow-right" end size="20" />
          </v-btn>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// Reuse existing Forward Fit athlete image
import heroAthlete from "../assets/images/hero-athlete.png";

// Training Program Information
const programs = [
  {
    title: "Strength Training",
    icon: "mdi-dumbbell",
    focus: "Strength & Muscle",
    description:
      "Build muscle, develop strength, and improve physical performance through structured training.",
  },
  {
    title: "Cardio Training",
    icon: "mdi-run",
    focus: "Endurance & Fitness",
    description:
      "Improve stamina, cardiovascular health, and overall endurance through active workouts.",
  },
  {
    title: "Weight Management",
    icon: "mdi-scale-bathroom",
    focus: "Weight & Wellness",
    description:
      "Support your weight management goals through consistent exercise and healthy fitness habits.",
  },
  {
    title: "Personal Training",
    icon: "mdi-account-supervisor-outline",
    focus: "Personal Guidance",
    description:
      "Explore goal-focused training approaches and receive guidance suited to your fitness needs.",
  },
];

// How Forward Fit Works
const steps = [
  {
    number: "01",
    icon: "mdi-magnify",
    title: "Explore Programs",
    description:
      "Discover training options and learn which types of workouts may suit your fitness goals.",
  },
  {
    number: "02",
    icon: "mdi-account-check-outline",
    title: "Create Your Account",
    description:
      "Register with Forward Fit and verify your email address to activate your secure member account.",
  },
  {
    number: "03",
    icon: "mdi-view-dashboard-outline",
    title: "Access Your Dashboard",
    description:
      "Sign in to view your member information and fitness goal, and continue your gym journey.",
  },
];
</script>

<!-- External SCSS -->
<style lang="scss" scoped src="../assets/styles/pages/programs.scss"></style>
