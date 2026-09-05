<template>
  <!-- Main customer profile card -->
  <v-card class="member-profile-card">
    <div class="member-profile-card__content">
      <!-- Profile avatar section -->
      <div class="member-profile-card__avatar-wrapper">
        <v-avatar size="92" color="primary" class="member-profile-card__avatar">
          <!-- Display image when an image URL is available -->
          <v-img
            v-if="profileImage"
            :src="profileImage"
            :alt="`${customerName} profile image`"
            cover
          />

          <!-- Display initials when an image is not available -->
          <span v-else>{{ customerInitials }}</span>
        </v-avatar>

        <!-- Active indicator -->
        <span
          class="member-profile-card__online-indicator"
          aria-label="Active member"
        ></span>
      </div>

      <!-- Customer identity -->
      <div class="member-profile-card__identity">
        <span class="member-profile-card__welcome">Welcome back</span>

        <h1>{{ customerName }}</h1>

        <div class="member-profile-card__member-id">
          <v-icon icon="mdi-identifier" size="18" />

          <span>Member ID</span>

          <strong>{{ memberId }}</strong>
        </div>
      </div>

      <!-- Membership information -->
      <div class="member-profile-card__membership">
        <div class="member-profile-card__membership-item">
          <span class="member-profile-card__label"> Membership plan </span>

          <div class="member-profile-card__membership-value">
            <v-icon icon="mdi-crown-outline" size="20" />

            <strong>{{ membershipType }}</strong>
          </div>
        </div>

        <div class="member-profile-card__divider"></div>

        <div class="member-profile-card__membership-item">
          <span class="member-profile-card__label"> Membership status </span>

          <v-chip
            :color="statusColor"
            variant="tonal"
            size="small"
            class="member-profile-card__status"
          >
            <v-icon icon="mdi-check-circle" start size="16" />

            {{ membershipStatus }}
          </v-chip>
        </div>
      </div>
    </div>

    <!-- Decorative background element -->
    <div class="member-profile-card__decoration">
      <v-icon icon="mdi-dumbbell" />
    </div>
  </v-card>
</template>

<script setup>
import { computed } from "vue";

// Receive customer details from the dashboard page
const props = defineProps({
  customerName: {
    type: String,
    default: "Kosala Lakshan",
  },

  memberId: {
    type: String,
    default: "FF-2026-00124",
  },

  membershipType: {
    type: String,
    default: "Premium Membership",
  },

  membershipStatus: {
    type: String,
    default: "Active",
  },

  profileImage: {
    type: String,
    default: "",
  },
});

// Generate initials when the customer has no profile image
const customerInitials = computed(() => {
  return props.customerName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((name) => name.charAt(0).toUpperCase())
    .join("");
});

// Select the status colour according to membership status
const statusColor = computed(() => {
  const status = props.membershipStatus.toLowerCase();

  if (status === "active") {
    return "success";
  }

  if (status === "pending") {
    return "warning";
  }

  return "error";
});
</script>

<!-- External SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/dashboard/member-profile-card.scss"
></style>
