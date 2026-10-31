<template>
  <div class="customer-profile">
    <DashboardHeader
      :customer-name="customer.name"
      :member-id="customer.memberId"
      @profile="goToProfile"
      @logout="handleLogout"
    />

    <main class="customer-profile__main">
      <div class="customer-profile__container">
        <v-btn
          variant="text"
          prepend-icon="mdi-arrow-left"
          color="primary"
          class="customer-profile__back"
          @click="goToDashboard"
        >
          Back to Dashboard
        </v-btn>

        <div class="customer-profile__heading">
          <span>MY ACCOUNT</span>
          <h1>My Profile</h1>
          <p>View your personal details and fitness information.</p>
        </div>

        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-5">
          {{ errorMessage }}
        </v-alert>

        <div v-if="loading" class="customer-profile__loading">
          <v-progress-circular indeterminate color="primary" size="40" />
          <p>Loading your profile...</p>
        </div>

        <template v-else-if="profileLoaded">
          <!-- Profile Summary -->
          <v-card class="customer-profile__summary" elevation="0">
            <!-- Profile Avatar with Image Preview -->
            <v-avatar
              color="primary"
              size="80"
              class="customer-profile__avatar"
            >
              <v-img
                v-if="imagePreview"
                :src="imagePreview"
                :alt="`${customer.name} profile preview`"
                cover
              />

              <span v-else>{{ initials }}</span>
            </v-avatar>

            <div class="customer-profile__summary-info">
              <h2>{{ customer.name }}</h2>
              <p>{{ customer.memberId }}</p>

              <v-chip
                color="success"
                variant="tonal"
                size="small"
                prepend-icon="mdi-check-circle-outline"
              >
                {{
                  customer.emailVerified
                    ? "Email Verified"
                    : "Email Not Verified"
                }}
              </v-chip>

              <!-- Hidden Image File Input -->
              <input
                ref="avatarInput"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                class="customer-profile__file-input"
                @change="handleAvatarChange"
              />

              <!-- Profile Picture Actions -->
              <div class="customer-profile__image-actions">
                <v-btn
                  color="primary"
                  variant="tonal"
                  size="small"
                  prepend-icon="mdi-camera-outline"
                  @click="selectProfileImage"
                >
                  Choose Photo
                </v-btn>

                <v-btn
                  v-if="imagePreview"
                  color="error"
                  variant="text"
                  size="small"
                  prepend-icon="mdi-delete-outline"
                  @click="removeProfileImage"
                >
                  Remove Preview
                </v-btn>
              </div>

              <p
                v-if="imageError"
                class="customer-profile__image-error"
                role="alert"
              >
                {{ imageError }}
              </p>

              <small class="customer-profile__image-note">
                JPG, PNG or WebP · Max 2MB · Preview only
              </small>
            </div>
          </v-card>

          <v-row class="mt-5">
            <!-- Personal Information -->
            <v-col cols="12" md="6">
              <v-card class="customer-profile__card" elevation="0">
                <div class="customer-profile__card-heading">
                  <v-icon
                    icon="mdi-account-outline"
                    color="primary"
                    size="27"
                  />
                  <h2>Personal Information</h2>
                </div>

                <div
                  v-for="detail in personalDetails"
                  :key="detail.label"
                  class="customer-profile__detail"
                >
                  <span>{{ detail.label }}</span>
                  <strong>{{ detail.value }}</strong>
                </div>
              </v-card>
            </v-col>

            <!-- Fitness Information -->
            <v-col cols="12" md="6">
              <v-card class="customer-profile__card" elevation="0">
                <div class="customer-profile__card-heading">
                  <v-icon icon="mdi-dumbbell" color="primary" size="27" />
                  <h2>Fitness Information</h2>
                </div>

                <div
                  v-for="detail in fitnessDetails"
                  :key="detail.label"
                  class="customer-profile__detail"
                >
                  <span>{{ detail.label }}</span>
                  <strong>{{ detail.value }}</strong>
                </div>
              </v-card>
            </v-col>
          </v-row>

          <!-- Edit Customer Profile -->
          <v-card class="customer-profile__edit-card" elevation="0">
            <div class="customer-profile__edit-heading">
              <div>
                <h2>Edit Profile Information</h2>
                <p>Review and validate your personal and fitness details.</p>
              </div>

              <v-btn
                v-if="!isEditing"
                color="primary"
                prepend-icon="mdi-pencil-outline"
                @click="startEditing"
              >
                Edit Profile
              </v-btn>
            </div>

            <v-form
              v-if="isEditing"
              ref="editFormRef"
              @submit.prevent="validateProfile"
            >
              <v-alert type="info" variant="tonal" class="mb-5">
                This is a frontend preview. Changes are not saved to the
                database. Email and Member ID are read-only.
              </v-alert>

              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="draft.name"
                    label="Full Name"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    maxlength="100"
                    :rules="[nameRule]"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="draft.phone"
                    label="Phone Number"
                    prepend-inner-icon="mdi-phone-outline"
                    variant="outlined"
                    maxlength="20"
                    :rules="[phoneRule]"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="draft.dateOfBirth"
                    type="date"
                    label="Date of Birth"
                    variant="outlined"
                    :max="todayDate"
                    :rules="[dateOfBirthRule]"
                  />
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="draft.gender"
                    label="Gender"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    maxlength="50"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="draft.fitnessGoal"
                    label="Primary Fitness Goal"
                    prepend-inner-icon="mdi-target"
                    variant="outlined"
                    maxlength="100"
                    :rules="[fitnessGoalRule]"
                  />
                </v-col>
              </v-row>

              <v-alert
                v-if="validationMessage"
                type="info"
                variant="tonal"
                class="mb-4"
              >
                {{ validationMessage }}
              </v-alert>

              <div class="customer-profile__edit-actions">
                <v-btn
                  variant="outlined"
                  color="secondary"
                  @click="cancelEditing"
                >
                  Cancel
                </v-btn>

                <v-btn
                  type="submit"
                  color="primary"
                  prepend-icon="mdi-check-circle-outline"
                >
                  Validate Changes
                </v-btn>
              </div>
            </v-form>
          </v-card>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";

import { useRouter } from "vue-router";

import DashboardHeader from "../../components/dashboard/DashboardHeader.vue";

import api from "../../services/api";

const router = useRouter();

const loading = ref(true);
const profileLoaded = ref(false);
const errorMessage = ref("");

// ========================================
// CUSTOMER PROFILE PICTURE PREVIEW
// ========================================

const avatarInput = ref(null);
const imagePreview = ref("");
const imageError = ref("");

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

// Open image selection dialog
const selectProfileImage = () => {
  avatarInput.value?.click();
};

// Validate and preview selected image
const handleAvatarChange = (event) => {
  const file = event.target.files?.[0];

  if (!file) return;

  imageError.value = "";

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    imageError.value = "Please select a JPG, PNG or WebP image.";

    event.target.value = "";
    return;
  }

  if (file.size > MAX_IMAGE_SIZE) {
    imageError.value = "Image size must be less than 2MB.";

    event.target.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === "string") {
      imagePreview.value = reader.result;
    }
  };

  reader.onerror = () => {
    imageError.value = "Unable to preview the selected image.";
  };

  reader.readAsDataURL(file);
};

// Remove selected image preview
const removeProfileImage = () => {
  imagePreview.value = "";
  imageError.value = "";

  if (avatarInput.value) {
    avatarInput.value.value = "";
  }
};

const customer = ref({
  name: "",
  memberId: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  fitnessGoal: "",
  emailVerified: false,
});

// ========================================
// CUSTOMER PROFILE EDIT FORM
// Frontend validation preview only
// ========================================

const isEditing = ref(false);
const editFormRef = ref(null);
const validationMessage = ref("");

const draft = reactive({
  name: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  fitnessGoal: "",
});

// Local date for date-of-birth validation
const todayDate = (() => {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
})();

// Form validation rules
const nameRule = (value) =>
  (typeof value === "string" && value.trim().length >= 2) ||
  "Enter a valid name with at least 2 characters.";

const phoneRule = (value) =>
  !value ||
  /^\+?[0-9][0-9\s-]{6,16}$/.test(value.trim()) ||
  "Enter a valid phone number.";

const dateOfBirthRule = (value) => {
  if (!value) return true;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return "Enter a valid date of birth.";
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const isValid =
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day &&
    value <= todayDate;

  return isValid || "Enter a valid date that is not in the future.";
};

const fitnessGoalRule = (value) =>
  !value || value.trim().length >= 2 || "Enter a valid fitness goal.";

// Open edit form with the current profile details
const startEditing = () => {
  Object.assign(draft, {
    name: customer.value.name,
    phone: customer.value.phone,
    dateOfBirth: String(customer.value.dateOfBirth || "").slice(0, 10),
    gender: customer.value.gender,
    fitnessGoal: customer.value.fitnessGoal,
  });

  validationMessage.value = "";
  isEditing.value = true;
};

// Cancel changes without modifying the profile
const cancelEditing = () => {
  isEditing.value = false;
  validationMessage.value = "";
};

// Validate without saving to the database
const validateProfile = async () => {
  if (!editFormRef.value) return;

  const { valid } = await editFormRef.value.validate();

  if (!valid) {
    validationMessage.value = "";
    return;
  }

  validationMessage.value =
    "Profile details are valid. This is a frontend preview. Your changes have not been saved.";
};

// Clear old validation messages when fields change
watch(
  draft,
  () => {
    validationMessage.value = "";
  },
  { deep: true },
);

const displayValue = (value) => {
  return value || "Not provided";
};

const initials = computed(() => {
  return customer.value.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
});

const personalDetails = computed(() => [
  {
    label: "Full Name",
    value: displayValue(customer.value.name),
  },
  {
    label: "Email Address",
    value: displayValue(customer.value.email),
  },
  {
    label: "Phone Number",
    value: displayValue(customer.value.phone),
  },
  {
    label: "Date of Birth",
    value: displayValue(customer.value.dateOfBirth),
  },
  {
    label: "Gender",
    value: displayValue(customer.value.gender),
  },
]);

const fitnessDetails = computed(() => [
  {
    label: "Member ID",
    value: displayValue(customer.value.memberId),
  },
  {
    label: "Primary Fitness Goal",
    value: displayValue(customer.value.fitnessGoal),
  },
]);

const loadProfile = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    const response = await api.get("/api/user", {
      timeout: 10000,
    });

    const user = response.data;
    const profile = user.customer_profile || {};

    customer.value = {
      name: user.name || "",
      memberId: profile.member_id || "",
      email: user.email || "",
      phone: user.phone || "",
      dateOfBirth: profile.date_of_birth || "",
      gender: profile.gender || "",
      fitnessGoal: profile.fitness_goal || "",
      emailVerified: Boolean(user.email_verified_at),
    };

    profileLoaded.value = true;
  } catch (error) {
    console.error("Failed to load profile:", error);

    profileLoaded.value = false;

    if (error.response?.status === 401) {
      await router.replace({ name: "login" });
      return;
    }

    errorMessage.value = "Unable to load your profile. Please try again.";
  } finally {
    loading.value = false;
  }
};

const goToDashboard = () => {
  router.push({ name: "customer-dashboard" });
};

const goToProfile = () => {
  // Already on the profile page.
};

const handleLogout = async () => {
  try {
    await api.post("/api/logout");

    localStorage.removeItem("forwardFitCustomerAuthenticated");

    sessionStorage.removeItem("forwardFitCustomerAuthenticated");

    localStorage.removeItem("forwardFitMemberIdentifier");
    sessionStorage.removeItem("forwardFitMemberIdentifier");

    await router.replace({ name: "login" });
  } catch (error) {
    console.error("Logout failed:", error);

    errorMessage.value = "Unable to logout. Please try again.";
  }
};

onMounted(loadProfile);
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/customer-profile.scss"
></style>
