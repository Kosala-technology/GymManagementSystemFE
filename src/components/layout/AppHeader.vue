<template>
  <!-- Fixed website header -->
  <header class="app-header">
    <div class="page-container header-content">
      <!-- PULSEFIT brand identity -->
      <a href="#home" class="brand" aria-label="Go to PULSEFIT home">
        <!-- Logo symbol -->
        <span class="brand-symbol">
          <v-icon icon="mdi-dumbbell" size="26" />
        </span>

        <!-- Gym name -->
        <span class="brand-name"> PULSE<span>FIT</span> </span>
      </a>

      <!-- Navigation displayed on desktop -->
      <nav class="desktop-navigation" aria-label="Main navigation">
        <a
          v-for="item in navigationItems"
          :key="item.name"
          :href="item.link"
          class="navigation-link"
          :class="{ active: item.name === 'Home' }"
        >
          {{ item.name }}
        </a>
      </nav>

      <!-- Desktop actions -->
      <div class="desktop-actions">
        <!-- Login is currently a visual button only -->
        <v-btn
          variant="text"
          color="secondary"
          prepend-icon="mdi-account-outline"
          class="login-button"
        >
          Login
        </v-btn>

        <!-- Registration will be connected later -->
        <v-btn color="primary" size="large" class="register-button">
          Join Now

          <v-icon icon="mdi-arrow-right" end size="19" />
        </v-btn>
      </div>

      <!-- Mobile navigation button -->
      <v-btn
        class="mobile-menu-button"
        icon="mdi-menu"
        variant="text"
        color="secondary"
        aria-label="Open navigation menu"
        @click="mobileMenuOpen = true"
      />
    </div>
  </header>

  <!-- Mobile and tablet navigation drawer -->
  <v-navigation-drawer
    v-model="mobileMenuOpen"
    location="right"
    temporary
    width="310"
    color="white"
  >
    <!-- Drawer heading -->
    <div class="drawer-header">
      <a
        href="#home"
        class="brand"
        aria-label="Go to PULSEFIT home"
        @click="mobileMenuOpen = false"
      >
        <span class="brand-symbol drawer-brand-symbol">
          <v-icon icon="mdi-dumbbell" size="23" />
        </span>

        <span class="brand-name drawer-brand-name">
          PULSE<span>FIT</span>
        </span>
      </a>

      <!-- Close drawer button -->
      <v-btn
        icon="mdi-close"
        variant="text"
        color="secondary"
        aria-label="Close navigation menu"
        @click="mobileMenuOpen = false"
      />
    </div>

    <v-divider />

    <!-- Mobile navigation links -->
    <nav class="mobile-navigation" aria-label="Mobile navigation">
      <a
        v-for="item in navigationItems"
        :key="item.name"
        :href="item.link"
        class="mobile-navigation-link"
        :class="{ active: item.name === 'Home' }"
        @click="mobileMenuOpen = false"
      >
        <v-icon :icon="item.icon" size="21" />

        <span>{{ item.name }}</span>
      </a>
    </nav>

    <!-- Mobile action buttons -->
    <div class="mobile-actions">
      <v-btn
        variant="outlined"
        color="secondary"
        size="large"
        block
        prepend-icon="mdi-account-outline"
        @click="mobileMenuOpen = false"
      >
        Login
      </v-btn>

      <v-btn color="primary" size="large" block @click="mobileMenuOpen = false">
        Join Now

        <v-icon icon="mdi-arrow-right" end size="19" />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
// Import Vue's reactive reference function
import { ref } from "vue";

// Track whether the mobile menu is open
const mobileMenuOpen = ref(false);

// Store navigation details in one reusable array
const navigationItems = [
  {
    name: "Home",
    link: "#home",
    icon: "mdi-home-outline",
  },
  {
    name: "Programs",
    link: "#programs",
    icon: "mdi-weight-lifter",
  },
  {
    name: "About",
    link: "#about",
    icon: "mdi-information-outline",
  },
  {
    name: "Contact",
    link: "#contact",
    icon: "mdi-phone-outline",
  },
];
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/app-header.scss"
></style>
