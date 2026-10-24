<template>
  <main class="about-page">
    <!-- SECTION 01 - ABOUT HERO -->
    <section class="about-hero">
      <div class="page-container about-hero-grid">
        <!-- Introduction -->
        <div class="about-hero-content">
          <span class="about-badge">
            <v-icon icon="mdi-dumbbell" size="18" />
            ABOUT FORWARD FIT
          </span>

          <h1 class="about-hero-title">
            Built for Progress.
            <span>Designed for You.</span>
          </h1>

          <p class="about-hero-description">
            Forward Fit combines fitness and modern technology to create a more
            connected gym experience. Our platform helps members manage their
            fitness journey through secure accounts, personal fitness
            information, and organized workout schedules.
          </p>

          <v-btn
            :to="{ name: 'programs' }"
            color="primary"
            size="large"
            class="about-hero-button"
          >
            Explore Our Programs

            <v-icon icon="mdi-arrow-right" end size="20" />
          </v-btn>

          <div class="about-hero-highlights">
            <span>
              <v-icon icon="mdi-check-circle" />
              Member-Focused
            </span>

            <span>
              <v-icon icon="mdi-check-circle" />
              Technology-Driven
            </span>
          </div>
        </div>

        <!-- Visual Information Panel -->
        <div class="about-hero-visual">
          <div class="about-visual-panel">
            <div class="about-panel-heading">
              <span>THE FORWARD FIT EXPERIENCE</span>
              <v-icon icon="mdi-arrow-top-right" size="22" />
            </div>

            <div class="about-panel-symbol">
              <v-icon icon="mdi-dumbbell" size="70" />
            </div>

            <h2>
              Fitness Meets
              <span>Innovation.</span>
            </h2>

            <p>
              A smarter and more organized way to manage your gym experience.
            </p>

            <div class="about-panel-features">
              <div>
                <v-icon icon="mdi-account-circle-outline" size="23" />
                <span>Member Accounts</span>
              </div>

              <div>
                <v-icon icon="mdi-calendar-check-outline" size="23" />
                <span>Workout Schedules</span>
              </div>

              <div>
                <v-icon icon="mdi-target" size="23" />
                <span>Personal Fitness Goals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 02 - MISSION AND VISION -->
    <section class="about-purpose-section">
      <div class="page-container">
        <div class="about-section-heading">
          <span class="about-section-label"> WHAT DRIVES US </span>

          <h2>
            Our Mission &
            <span>Vision.</span>
          </h2>

          <p>
            We aim to make fitness management simpler, more organized, and
            accessible through modern technology.
          </p>
        </div>

        <div class="about-purpose-grid">
          <article class="about-purpose-card">
            <div class="about-purpose-icon">
              <v-icon icon="mdi-bullseye-arrow" size="34" />
            </div>

            <h3>Our Mission</h3>

            <p>
              To support members in achieving their fitness goals by providing a
              simple, secure, and convenient platform for managing their gym
              experience.
            </p>
          </article>

          <article class="about-purpose-card">
            <div class="about-purpose-icon">
              <v-icon icon="mdi-eye-outline" size="34" />
            </div>

            <h3>Our Vision</h3>

            <p>
              To create a connected fitness environment where technology helps
              gym members stay organized, motivated, and focused on their
              personal progress.
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 03 - WHY CHOOSE FORWARD FIT -->
    <section class="about-features-section">
      <div class="page-container">
        <div class="about-section-heading">
          <span class="about-section-label"> WHY FORWARD FIT </span>

          <h2>
            A Better Way to
            <span>Manage Fitness.</span>
          </h2>

          <p>
            Forward Fit provides useful digital features to make the gym
            experience more convenient for registered members.
          </p>
        </div>

        <div class="about-features-grid">
          <article
            v-for="feature in features"
            :key="feature.title"
            class="about-feature-card"
          >
            <div class="about-feature-icon">
              <v-icon :icon="feature.icon" size="31" />
            </div>

            <h3>{{ feature.title }}</h3>

            <p>{{ feature.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 04 - CALL TO ACTION -->
    <section class="about-cta-section">
      <div class="page-container">
        <div class="about-cta-content">
          <div>
            <span class="about-cta-label">
              JOIN THE FORWARD FIT COMMUNITY
            </span>

            <h2>Your Fitness Journey Starts Here.</h2>

            <p>
              Create your member account and take the next step towards your
              fitness goals.
            </p>
          </div>

          <v-btn
            :to="{ name: 'register' }"
            color="primary"
            size="large"
            class="about-cta-button"
          >
            Join Forward Fit

            <v-icon icon="mdi-arrow-right" end size="20" />
          </v-btn>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// Forward Fit System Features
const features = [
  {
    title: "Easy Member Registration",
    icon: "mdi-account-plus-outline",
    description:
      "Create a member account through a simple registration process.",
  },
  {
    title: "Secure Account Access",
    icon: "mdi-shield-lock-outline",
    description:
      "Access your account using secure login and email verification.",
  },
  {
    title: "Personal Fitness Goals",
    icon: "mdi-target",
    description: "View your member information and selected fitness goal.",
  },
  {
    title: "Workout Schedule Access",
    icon: "mdi-calendar-clock-outline",
    description:
      "Access assigned workout schedules through your member dashboard.",
  },
];
</script>

<!-- External SCSS File -->
<style lang="scss" scoped src="../assets/styles/pages/about.scss"></style>
