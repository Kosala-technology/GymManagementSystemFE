<template>
  <!-- Shared layout for Login and Registration pages -->
  <v-main class="auth-layout">
    <div class="auth-shell">
      <!-- Reusable desktop brand panel -->
      <AuthBrandPanel />

      <!-- Login or Registration page section -->
      <section class="auth-content">
        <!-- Authentication page top bar -->
        <div class="auth-topbar">
          <!-- Compact brand displayed on tablet and mobile -->
          <router-link
            :to="{ name: 'home' }"
            class="mobile-auth-brand"
            aria-label="Return to FORWARD FIT home"
          >
            <span class="mobile-brand-symbol">
              <v-icon
                icon="mdi-dumbbell"
                size="22"
              />
            </span>

            <span>
              FORWARD <strong>FIT</strong>
            </span>
          </router-link>

          <!-- Back to home link -->
          <router-link
            :to="{ name: 'home' }"
            class="back-home-link"
          >
            <v-icon
              icon="mdi-arrow-left"
              size="19"
            />

            Back to home
          </router-link>
        </div>

        <!-- Current Login or Registration route -->
        <div class="auth-route-content">
          <router-view />
        </div>

        <!-- Authentication footer -->
        <p class="auth-footer">
          © {{ currentYear }} FORWARD FIT. All rights reserved.
        </p>
      </section>
    </div>
  </v-main>
</template>

<script setup>
// Import the reusable authentication brand panel
import AuthBrandPanel from '../components/auth/AuthBrandPanel.vue'

// Get the current year automatically
const currentYear = new Date().getFullYear()
</script>

<style
  lang="scss"
  scoped
  src="../assets/styles/layouts/auth-layout.scss"
></style>