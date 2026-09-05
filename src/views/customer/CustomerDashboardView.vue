<template>
  <div class="customer-dashboard">
    <!-- Dashboard top navigation -->
    <DashboardHeader
      :customer-name="customer.name"
      :member-id="customer.memberId"
      @profile="handleProfile"
      @logout="handleLogout"
    />

    <!-- Main dashboard content -->
    <main class="customer-dashboard__main">
      <div class="customer-dashboard__container">
        <!-- Page introduction -->
        <section class="customer-dashboard__introduction">
          <div>
            <span class="customer-dashboard__eyebrow">
              Customer Dashboard
            </span>

            <h2>Your fitness journey starts here.</h2>

            <p>
              Track your membership, trainer and upcoming workout information
              from one place.
            </p>
          </div>

          <!-- Current date -->
          <div class="customer-dashboard__date">
            <span class="customer-dashboard__date-icon">
              <v-icon icon="mdi-calendar-month-outline" size="21" />
            </span>

            <div>
              <small>Today</small>
              <strong>{{ currentDate }}</strong>
            </div>
          </div>
        </section>

        <!-- Customer profile and membership details -->
        <MemberProfileCard
          :customer-name="customer.name"
          :member-id="customer.memberId"
          :membership-type="customer.membershipType"
          :membership-status="customer.membershipStatus"
          :profile-image="customer.profileImage"
        />

        <!-- Fitness information cards -->
        <section
          class="customer-dashboard__information"
          aria-labelledby="fitness-summary-heading"
        >
          <div class="customer-dashboard__section-heading">
            <div>
              <span>Overview</span>
              <h2 id="fitness-summary-heading">Your Fitness Summary</h2>
            </div>

            <p>Information assigned to your member account.</p>
          </div>

          <v-row>
            <!-- Primary fitness goal -->
            <v-col cols="12" md="4">
              <DashboardInfoCard
                icon="mdi-target"
                label="Primary Fitness Goal"
                :value="customer.fitnessGoal"
                description="Your current training objective"
                description-icon="mdi-trending-up"
                color="primary"
              />
            </v-col>

            <!-- Assigned trainer -->
            <v-col cols="12" md="4">
              <DashboardInfoCard
                icon="mdi-account-supervisor-outline"
                label="Assigned Trainer"
                :value="customer.assignedTrainer"
                description="Certified personal trainer"
                description-icon="mdi-certificate-outline"
                color="success"
                show-action
                @action="handleTrainer"
              />
            </v-col>

            <!-- Next workout -->
            <v-col cols="12" md="4">
              <DashboardInfoCard
                icon="mdi-calendar-clock-outline"
                label="Next Workout"
                :value="customer.nextWorkoutDate"
                :description="customer.nextWorkoutTime"
                description-icon="mdi-clock-outline"
                color="warning"
                highlighted
                show-action
                @action="handleWorkoutSchedule"
              />
            </v-col>
          </v-row>
        </section>

        <!-- Dashboard navigation shortcuts -->
        <QuickActions
          @workout-schedule="handleWorkoutSchedule"
          @profile="handleProfile"
          @logout="handleLogout"
        />
      </div>
    </main>

    <!-- Temporary message for pages not developed yet -->
    <v-snackbar
      v-model="showMessage"
      :timeout="3000"
      color="secondary"
      location="bottom center"
      rounded="lg"
    >
      <div class="customer-dashboard__snackbar">
        <v-icon icon="mdi-information-outline" size="20" />
        <span>{{ message }}</span>
      </div>

      <template #actions>
        <v-btn variant="text" color="white" @click="showMessage = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";
import MemberProfileCard from "../../components/dashboard/MemberProfileCard.vue";
import DashboardInfoCard from "../../components/dashboard/DashboardInfoCard.vue";
import QuickActions from "../../components/dashboard/QuickActions.vue";

// Access Vue Router for page navigation
const router = useRouter();

// Temporary customer information
// This object can later be replaced with data received from the backend API
const customer = reactive({
  name: "Kosala Lakshan",
  profileImage: "",
  memberId: "FF-2026-00124",
  membershipType: "Premium Membership",
  membershipStatus: "Active",
  fitnessGoal: "Build Muscle",
  assignedTrainer: "Daniel Perera",
  nextWorkoutDate: "08 September 2026",
  nextWorkoutTime: "Monday at 6:30 PM",
});

// Snackbar state
const showMessage = ref(false);
const message = ref("");

// Format the current date for the header
const currentDate = computed(() => {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date());
});

// Display a temporary message for features developed later
const displayMessage = (text) => {
  message.value = text;
  showMessage.value = true;
};

// Navigate to the personalized Workout Schedule page
const handleWorkoutSchedule = () => {
  router.push({
    name: "workout-schedule",
  });
};

// Profile button action
const handleProfile = () => {
  displayMessage("The Customer Profile page will be added later.");
};

// Trainer information action
const handleTrainer = () => {
  displayMessage(
    `${customer.assignedTrainer} is your assigned personal trainer.`,
  );
};

// Logout the currently authenticated customer
const handleLogout = async () => {
  // Remove authentication from both storage locations
  localStorage.removeItem("forwardFitCustomerAuthenticated");

  sessionStorage.removeItem("forwardFitCustomerAuthenticated");

  // Redirect the customer to the Login page
  await router.replace({ name: "login" });
};
</script>

<!-- External page-level SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/customer-dashboard.scss"
></style>
