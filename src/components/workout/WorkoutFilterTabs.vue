<template>
  <section class="workout-filter-tabs" aria-labelledby="workout-filter-heading">
    <!-- Filter section heading -->
    <div class="workout-filter-tabs__heading">
      <div>
        <span class="workout-filter-tabs__eyebrow"> Weekly Plan </span>

        <h2 id="workout-filter-heading">Assigned Workouts</h2>
      </div>

      <p>Select a filter to find the workouts you need.</p>
    </div>

    <!-- Vuetify filter buttons -->
    <v-btn-toggle
      v-model="selectedFilter"
      mandatory
      class="workout-filter-tabs__buttons"
      aria-label="Filter workout records"
    >
      <v-btn
        v-for="filter in filters"
        :key="filter.value"
        :value="filter.value"
        class="workout-filter-tabs__button"
      >
        <v-icon :icon="filter.icon" start size="19" />

        <span>{{ filter.label }}</span>

        <!-- Display the number of matching records -->
        <span class="workout-filter-tabs__count">
          {{ getFilterCount(filter.value) }}
        </span>
      </v-btn>
    </v-btn-toggle>
  </section>
</template>

<script setup>
import { computed } from "vue";

// Receive selected filter and available filter options
const props = defineProps({
  modelValue: {
    type: String,
    default: "all",
  },

  filters: {
    type: Array,
    required: true,
  },

  counts: {
    type: Object,
    default: () => ({
      all: 0,
      today: 0,
      completed: 0,
      pending: 0,
    }),
  },
});

// Update v-model in the parent component
const emit = defineEmits(["update:modelValue"]);

// Computed getter and setter provide two-way data binding
const selectedFilter = computed({
  get() {
    return props.modelValue;
  },

  set(value) {
    emit("update:modelValue", value);
  },
});

// Return the number displayed inside each filter button
const getFilterCount = (filterValue) => {
  return props.counts[filterValue] ?? 0;
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/workout/workout-filter-tabs.scss"
></style>
