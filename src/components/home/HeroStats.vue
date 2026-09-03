<template>
  <!-- Main system highlights -->
  <div class="hero-stats" aria-label="PULSEFIT system highlights">
    <div v-for="item in highlights" :key="item.title" class="stat-item">
      <!-- Highlight icon -->
      <span class="stat-icon">
        <v-icon :icon="item.icon" size="22" />
      </span>

      <!-- Highlight information -->
      <div>
        <strong class="stat-title">
          {{ item.title }}
        </strong>

        <span class="stat-description">
          {{ item.description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
// These highlights explain the main benefits of the future system
const highlights = [
  {
    icon: "mdi-account-check-outline",
    title: "Unique Member ID",
    description: "Secure personal access",
  },
  {
    icon: "mdi-clipboard-text-outline",
    title: "Personal Plans",
    description: "Workouts built for you",
  },
  {
    icon: "mdi-calendar-check-outline",
    title: "Easy Schedule Access",
    description: "View plans anytime",
  },
];
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/hero-stats.scss"
></style>
