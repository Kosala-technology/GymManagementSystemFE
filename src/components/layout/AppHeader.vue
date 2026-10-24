<template>
  <!-- Fixed website header -->
  <header class="app-header">
    <div class="page-container header-content">
      <!-- FORWARD FIT brand identity -->
      <router-link
        :to="{ name: 'home' }"
        class="brand"
        aria-label="Go to FORWARD FIT home"
      >
        <!-- Logo symbol -->
        <span class="brand-symbol">
          <v-icon icon="mdi-dumbbell" size="26" />
        </span>

        <!-- Gym name -->
        <span class="brand-name"> FORWARD <span>FIT</span> </span>
      </router-link>

      <!-- Navigation displayed on desktop -->

      <!-- Desktop Navigation -->
      <nav class="desktop-navigation" aria-label="Main navigation">
        <template v-for="item in navigationItems" :key="item.name">
          <!-- Home, Programs and About Routes -->
          <router-link
            v-if="item.routeName"
            :to="{ name: item.routeName }"
            class="navigation-link"
            :class="{
              active: $route.name === item.routeName,
            }"
          >
            {{ item.name }}
          </router-link>

          <!-- Contact Link (will be updated later) -->
          <a v-else :href="item.link" class="navigation-link">
            {{ item.name }}
          </a>
        </template>
      </nav>

      <!-- Desktop action buttons -->
      <div class="desktop-actions">
        <!-- Navigate to the Login page -->
        <v-btn
          :to="{ name: 'login' }"
          variant="text"
          color="secondary"
          prepend-icon="mdi-account-outline"
          class="login-button"
        >
          Login
        </v-btn>

        <!-- Navigate to the Registration page -->
        <v-btn
          :to="{ name: 'register' }"
          color="primary"
          size="large"
          class="register-button"
        >
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
    <!-- Mobile drawer header -->
    <div class="drawer-header">
      <!-- Mobile brand identity -->
      <router-link
        :to="{ name: 'home' }"
        class="brand"
        aria-label="Go to FORWARD FIT home"
        @click="closeMobileMenu"
      >
        <span class="brand-symbol drawer-brand-symbol">
          <v-icon icon="mdi-dumbbell" size="23" />
        </span>

        <span class="brand-name drawer-brand-name">
          FORWARD <span>FIT</span>
        </span>
      </router-link>

      <!-- Close mobile drawer button -->
      <v-btn
        icon="mdi-close"
        variant="text"
        color="secondary"
        aria-label="Close navigation menu"
        @click="closeMobileMenu"
      />
    </div>

    <v-divider />

    <!-- Mobile Navigation -->
    <nav class="mobile-navigation" aria-label="Mobile navigation">
      <template v-for="item in navigationItems" :key="item.name">
        <!-- Home, Programs and About Routes -->
        <router-link
          v-if="item.routeName"
          :to="{ name: item.routeName }"
          class="mobile-navigation-link"
          :class="{
            active: $route.name === item.routeName,
          }"
          @click="closeMobileMenu"
        >
          <v-icon :icon="item.icon" size="21" />
          <span>{{ item.name }}</span>
        </router-link>

        <!-- Contact Link (will be updated later) -->
        <a
          v-else
          :href="item.link"
          class="mobile-navigation-link"
          @click="closeMobileMenu"
        >
          <v-icon :icon="item.icon" size="21" />
          <span>{{ item.name }}</span>
        </a>
      </template>
    </nav>

    <!-- Mobile action buttons -->
    <div class="mobile-actions">
      <!-- Navigate to the Login page -->
      <v-btn
        :to="{ name: 'login' }"
        variant="outlined"
        color="secondary"
        size="large"
        block
        prepend-icon="mdi-account-outline"
        @click="closeMobileMenu"
      >
        Login
      </v-btn>

      <!-- Navigate to the Registration page -->
      <v-btn
        :to="{ name: 'register' }"
        color="primary"
        size="large"
        block
        @click="closeMobileMenu"
      >
        Join Now

        <v-icon icon="mdi-arrow-right" end size="19" />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script setup>
// Import Vue's reactive reference function
import { ref } from "vue";

// Control whether the mobile navigation drawer is open
const mobileMenuOpen = ref(false);

// Close the mobile navigation drawer
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

// Navigation links used by desktop and mobile menus

const navigationItems = [
  {
    name: "Home",
    routeName: "home",
    icon: "mdi-home-outline",
  },
  {
    name: "Programs",
    routeName: "programs",
    icon: "mdi-weight-lifter",
  },
  {
    name: "About",
    routeName: "about",
    icon: "mdi-information-outline",
  },

  {
    name: "Contact",
    routeName: "contact",
    icon: "mdi-phone-outline",
  },
];
</script>

<!-- Load component styles from the external SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/app-header.scss"
></style>
