<template>
  <!-- Reusable dashboard information card -->
  <v-card
    class="dashboard-info-card"
    :class="{ 'dashboard-info-card--highlighted': highlighted }"
  >
    <div class="dashboard-info-card__content">
      <!-- Information icon -->
      <div
        class="dashboard-info-card__icon"
        :class="`dashboard-info-card__icon--${color}`"
      >
        <v-icon :icon="icon" size="25" />
      </div>

      <!-- Main information -->
      <div class="dashboard-info-card__details">
        <span class="dashboard-info-card__label">
          {{ label }}
        </span>

        <h3>{{ value }}</h3>

        <div v-if="description" class="dashboard-info-card__description">
          <v-icon v-if="descriptionIcon" :icon="descriptionIcon" size="16" />

          <span>{{ description }}</span>
        </div>
      </div>

      <!-- Optional arrow button -->
      <v-btn
        v-if="showAction"
        icon="mdi-arrow-top-right"
        variant="text"
        size="small"
        class="dashboard-info-card__action"
        :aria-label="`Open ${label}`"
        @click="emit('action')"
      />
    </div>

    <!-- Bottom accent line -->
    <div
      class="dashboard-info-card__accent"
      :class="`dashboard-info-card__accent--${color}`"
    ></div>
  </v-card>
</template>

<script setup>
// Properties allow the same component to display different information
defineProps({
  icon: {
    type: String,
    required: true,
  },

  label: {
    type: String,
    required: true,
  },

  value: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  descriptionIcon: {
    type: String,
    default: "",
  },

  // Supported values: primary, success and warning
  color: {
    type: String,
    default: "primary",
  },

  highlighted: {
    type: Boolean,
    default: false,
  },

  showAction: {
    type: Boolean,
    default: false,
  },
});

// Send the button click to the parent dashboard page
const emit = defineEmits(["action"]);
</script>

<!-- External SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/dashboard/dashboard-info-card.scss"
></style>
