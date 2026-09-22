<template>
  <div class="admin-dashboard">
    <!-- Page introduction -->
    <section class="admin-dashboard__intro">
      <div>
        <span class="admin-dashboard__eyebrow">Gym overview</span>
        <h2>Welcome to Forward Fit</h2>
        <p>Manage your members, exercise library and training schedules.</p>
      </div>

      <!-- Clearly identify the current frontend demonstration -->
      <v-chip
        color="primary"
        variant="tonal"
        prepend-icon="mdi-information-outline"
      >
        Sample data
      </v-chip>
    </section>

    <!-- Summary cards -->
    <v-row>
      <v-col
        v-for="stat in statistics"
        :key="stat.label"
        cols="12"
        sm="6"
        xl="3"
      >
        <v-card class="admin-dashboard__stat">
          <v-avatar :color="stat.color" variant="tonal" rounded="lg" size="48">
            <v-icon :icon="stat.icon" size="25" />
          </v-avatar>

          <div>
            <p>{{ stat.label }}</p>
            <strong>{{ stat.value }}</strong>
            <small>{{ stat.description }}</small>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Assigned schedules -->
    <section class="admin-dashboard__section">
      <div class="admin-dashboard__section-heading">
        <div>
          <h2>Recent assignments</h2>
          <p>Sample daily schedules assigned to gym members.</p>
        </div>

        <v-chip size="small" variant="outlined">
          {{ assignments.length }} assignments
        </v-chip>
      </div>

      <v-card class="admin-dashboard__table-card">
        <v-table class="admin-dashboard__table">
          <caption class="admin-dashboard__caption">
            Sample customer workout assignments
          </caption>

          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Schedule</th>
              <th scope="col">Date</th>
              <th scope="col">Exercises</th>
              <th scope="col">Trainer</th>
              <th scope="col">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="assignment in assignments" :key="assignment.id">
              <td>
                <div class="admin-dashboard__member">
                  <v-avatar
                    color="primary"
                    variant="tonal"
                    size="36"
                    aria-hidden="true"
                  >
                    {{ getInitials(getCustomer(assignment.customerId).name) }}
                  </v-avatar>

                  <div>
                    <strong>
                      {{ getCustomer(assignment.customerId).name }}
                    </strong>
                    <small>{{ assignment.customerId }}</small>
                  </div>
                </div>
              </td>

              <td>{{ assignment.scheduleName }}</td>
              <td>{{ formatDate(assignment.date) }}</td>
              <td>{{ assignment.exerciseCount }}</td>
              <td>{{ assignment.trainer }}</td>

              <td>
                <v-chip
                  :color="getStatusColor(assignment.status)"
                  variant="tonal"
                  size="small"
                >
                  {{ assignment.status }}
                </v-chip>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card>
    </section>

    <!-- Explain the admin workflow -->
    <section
      class="admin-dashboard__section"
      aria-labelledby="admin-workflow-heading"
    >
      <div class="admin-dashboard__section-heading">
        <div>
          <h2 id="admin-workflow-heading">Manage training plans</h2>
          <p>The steps for preparing a customer’s workout schedule.</p>
        </div>
      </div>

      <v-row>
        <v-col
          v-for="(step, index) in workflow"
          :key="step.title"
          cols="12"
          md="4"
        >
          <v-card class="admin-dashboard__workflow-card">
            <span class="admin-dashboard__step-number">
              {{ String(index + 1).padStart(2, "0") }}
            </span>

            <v-icon :icon="step.icon" color="primary" size="27" />

            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Reuse the existing sample exercise library.
// No backend requests are made by this page.
import { exerciseLibrary } from "../../data/sampleWorkouts.js";

// Temporary dashboard fixtures.
// These will be shared with customer management in a later step.
const customers = [
  {
    id: "FF-2026-00124",
    name: "Kosala Lakshan",
    membershipStatus: "Active",
  },
  {
    id: "FF-2026-00125",
    name: "Nimesha Bandara",
    membershipStatus: "Active",
  },
  {
    id: "FF-2026-00126",
    name: "Kasun Perera",
    membershipStatus: "Expired",
  },
  {
    id: "FF-2026-00127",
    name: "Amaya Silva",
    membershipStatus: "Active",
  },
];

const assignments = [
  {
    id: "demo-assignment-001",
    customerId: "FF-2026-00124",
    scheduleName: "Upper Body Strength",
    date: "2026-09-21",
    exerciseCount: 12,
    trainer: "Daniel Perera",
    status: "In Progress",
  },
  {
    id: "demo-assignment-002",
    customerId: "FF-2026-00125",
    scheduleName: "Full Body Foundation",
    date: "2026-09-22",
    exerciseCount: 10,
    trainer: "Daniel Perera",
    status: "Pending",
  },
  {
    id: "demo-assignment-003",
    customerId: "FF-2026-00127",
    scheduleName: "Lower Body Development",
    date: "2026-09-23",
    exerciseCount: 9,
    trainer: "Daniel Perera",
    status: "Pending",
  },
];

// Derive summary values from the sample records.
const statistics = computed(() => [
  {
    label: "Total Customers",
    value: customers.length,
    description: "Members in the sample directory",
    icon: "mdi-account-group-outline",
    color: "primary",
  },
  {
    label: "Active Memberships",
    value: customers.filter(
      (customer) => customer.membershipStatus === "Active",
    ).length,
    description: "Members with an active plan",
    icon: "mdi-card-account-details-outline",
    color: "success",
  },
  {
    label: "Exercise Library",
    value: exerciseLibrary.length,
    description: "Available exercise definitions",
    icon: "mdi-dumbbell",
    color: "primary",
  },
  {
    label: "Assigned Schedules",
    value: assignments.length,
    description: "Daily customer assignments",
    icon: "mdi-calendar-check-outline",
    color: "warning",
  },
]);

const workflow = [
  {
    title: "Maintain the exercise library",
    icon: "mdi-dumbbell",
    description:
      "Organize exercises, equipment and instructions. Video references can be added later.",
  },
  {
    title: "Build a workout schedule",
    icon: "mdi-clipboard-edit-outline",
    description:
      "Choose exercises and arrange their order, sets, repetitions and rest periods.",
  },
  {
    title: "Assign it to a customer",
    icon: "mdi-calendar-check-outline",
    description:
      "Select the member and workout date for their personalized daily schedule.",
  },
];

// Resolve a member using the assignment's customer ID.
const getCustomer = (customerId) => {
  return (
    customers.find((customer) => customer.id === customerId) ?? {
      name: "Unknown customer",
    }
  );
};

const getInitials = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

// Create a local calendar date without UTC date shifting.
const formatDate = (dateValue) => {
  const [year, month, day] = dateValue.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

const getStatusColor = (status) => {
  if (status === "Completed") return "success";
  if (status === "In Progress") return "primary";

  return "warning";
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/admin/admin-dashboard.scss"
></style>
