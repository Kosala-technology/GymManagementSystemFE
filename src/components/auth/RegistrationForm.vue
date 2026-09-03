<template>
  <!-- Main Registration card -->
  <v-card class="registration-card">
    <!-- Registration heading -->
    <div class="registration-heading">
      <span class="registration-icon">
        <v-icon icon="mdi-account-plus-outline" size="25" />
      </span>

      <div>
        <h1>Create your account</h1>

        <p>
          Register as a FORWARD FIT member and begin your personalized fitness
          journey.
        </p>
      </div>
    </div>

    <!-- Registration form -->
    <v-form
      ref="registrationForm"
      v-model="isFormValid"
      validate-on="blur"
      @submit.prevent="handleRegistration"
    >
      <v-row>
        <!-- First name -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="first-name">First name</label>

            <v-text-field
              id="first-name"
              v-model.trim="formData.firstName"
              :rules="nameRules"
              placeholder="Enter first name"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="given-name"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Last name -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="last-name">Last name</label>

            <v-text-field
              id="last-name"
              v-model.trim="formData.lastName"
              :rules="nameRules"
              placeholder="Enter last name"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="family-name"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Email address -->
        <v-col cols="12">
          <div class="form-group">
            <label for="email">Email address</label>

            <v-text-field
              id="email"
              v-model.trim="formData.email"
              :rules="emailRules"
              type="email"
              placeholder="name@example.com"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="email"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Mobile number -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="mobile-number">Mobile number</label>

            <v-text-field
              id="mobile-number"
              v-model.trim="formData.mobileNumber"
              :rules="mobileRules"
              type="tel"
              placeholder="077 123 4567"
              prepend-inner-icon="mdi-phone-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="tel"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Date of birth -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="date-of-birth">Date of birth</label>

            <v-text-field
              id="date-of-birth"
              v-model="formData.dateOfBirth"
              :rules="dateOfBirthRules"
              :max="today"
              type="date"
              prepend-inner-icon="mdi-calendar-outline"
              variant="outlined"
              density="comfortable"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Gender -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="gender">Gender</label>

            <v-select
              id="gender"
              v-model="formData.gender"
              :items="genderOptions"
              :rules="requiredSelectionRule"
              placeholder="Select gender"
              prepend-inner-icon="mdi-gender-male-female"
              variant="outlined"
              density="comfortable"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Fitness goal -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="fitness-goal">Primary fitness goal</label>

            <v-select
              id="fitness-goal"
              v-model="formData.fitnessGoal"
              :items="fitnessGoalOptions"
              :rules="requiredSelectionRule"
              placeholder="Select your goal"
              prepend-inner-icon="mdi-target"
              variant="outlined"
              density="comfortable"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
            />
          </div>
        </v-col>

        <!-- Password -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="registration-password">Password</label>

            <v-text-field
              id="registration-password"
              v-model="formData.password"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="
                showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              placeholder="Create password"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="new-password"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
              @click:append-inner="showPassword = !showPassword"
            />
          </div>
        </v-col>

        <!-- Confirm password -->
        <v-col cols="12" sm="6">
          <div class="form-group">
            <label for="confirm-password">Confirm password</label>

            <v-text-field
              id="confirm-password"
              v-model="formData.confirmPassword"
              :rules="confirmPasswordRules"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-inner-icon="
                showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
              "
              placeholder="Repeat password"
              prepend-inner-icon="mdi-lock-check-outline"
              variant="outlined"
              density="comfortable"
              autocomplete="new-password"
              color="primary"
              bg-color="white"
              class="auth-field"
              hide-details="auto"
              required
              @click:append-inner="showConfirmPassword = !showConfirmPassword"
            />
          </div>
        </v-col>
      </v-row>

      <!-- Password requirement information -->
      <div class="password-information">
        <v-icon icon="mdi-information-outline" size="18" />

        <span>
          Use at least 8 characters with uppercase, lowercase and a number.
        </span>
      </div>

      <!-- Terms agreement -->
      <v-checkbox
        v-model="formData.acceptTerms"
        :rules="termsRules"
        color="primary"
        density="compact"
        hide-details="auto"
        class="terms-checkbox"
      >
        <template #label>
          <span>
            I agree to the

            <a
              href="#"
              @click.stop.prevent="showPolicyMessage('Terms and Conditions')"
            >
              Terms and Conditions
            </a>

            and

            <a
              href="#"
              @click.stop.prevent="showPolicyMessage('Privacy Policy')"
            >
              Privacy Policy </a
            >.
          </span>
        </template>
      </v-checkbox>

      <!-- Registration button -->
      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="registration-submit-button"
      >
        Create member account

        <v-icon icon="mdi-arrow-right" end size="20" />
      </v-btn>
    </v-form>

    <!-- Login navigation -->
    <p class="login-message">
      Already have a member account?

      <router-link :to="{ name: 'login' }"> Login </router-link>
    </p>

    <!-- Member ID information -->
    <div class="member-id-message">
      <v-icon icon="mdi-card-account-details-outline" size="19" />

      <span>
        Your unique Member ID will be provided after successful registration.
      </span>
    </div>
  </v-card>

  <!-- Development feedback -->
  <v-snackbar
    v-model="feedback.visible"
    :color="feedback.color"
    location="top"
    :timeout="4000"
  >
    {{ feedback.message }}

    <template #actions>
      <v-btn variant="text" @click="feedback.visible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
// Import Vue reactive utilities
import { reactive, ref } from "vue";

// Store the Vuetify form reference
const registrationForm = ref(null);

// Track the complete form validity
const isFormValid = ref(false);

// Password visibility controls
const showPassword = ref(false);
const showConfirmPassword = ref(false);

// Submit button loading state
const isSubmitting = ref(false);

// Today's date prevents future birth dates
const today = new Date().toISOString().split("T")[0];

// Registration form data
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
  dateOfBirth: "",
  gender: null,
  fitnessGoal: null,
  password: "",
  confirmPassword: "",
  acceptTerms: false,
});

// User feedback details
const feedback = reactive({
  visible: false,
  message: "",
  color: "info",
});

// Gender selection options
const genderOptions = ["Male", "Female", "Prefer not to say"];

// Fitness goal selection options
const fitnessGoalOptions = [
  "Build muscle",
  "Lose weight",
  "Improve strength",
  "Improve endurance",
  "General fitness",
];

// Name validation
const nameRules = [
  (value) => Boolean(value?.trim()) || "This name is required",

  (value) => value?.trim().length >= 2 || "Enter at least 2 characters",

  (value) => /^[\p{L}\s.'-]+$/u.test(value || "") || "Enter a valid name",
];

// Email validation
const emailRules = [
  (value) => Boolean(value?.trim()) || "Email address is required",

  (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "") ||
    "Enter a valid email address",
];

// Mobile number validation
const mobileRules = [
  (value) => Boolean(value?.trim()) || "Mobile number is required",

  (value) =>
    /^\+?[0-9\s-]{9,15}$/.test(value || "") || "Enter a valid mobile number",
];

// Date-of-birth validation
const dateOfBirthRules = [
  (value) => Boolean(value) || "Date of birth is required",

  (value) =>
    !value ||
    new Date(value) <= new Date() ||
    "Date of birth cannot be in the future",
];

// Required dropdown validation
const requiredSelectionRule = [
  (value) => Boolean(value) || "Please select an option",
];

// Password validation
const passwordRules = [
  (value) => Boolean(value) || "Password is required",

  (value) =>
    value?.length >= 8 || "Password must contain at least 8 characters",

  (value) =>
    /[A-Z]/.test(value || "") || "Include at least one uppercase letter",

  (value) =>
    /[a-z]/.test(value || "") || "Include at least one lowercase letter",

  (value) => /\d/.test(value || "") || "Include at least one number",
];

// Confirm-password validation
const confirmPasswordRules = [
  (value) => Boolean(value) || "Please confirm your password",

  (value) => value === formData.password || "Passwords do not match",
];

// Terms checkbox validation
const termsRules = [
  (value) => value === true || "You must accept the terms to continue",
];

// Display temporary policy feedback
const showPolicyMessage = (policyName) => {
  feedback.message = `${policyName} page will be connected later.`;

  feedback.color = "info";
  feedback.visible = true;
};

// Validate and prepare registration data
const handleRegistration = async () => {
  const validationResult = await registrationForm.value.validate();

  if (!validationResult.valid) {
    feedback.message =
      "Please correct the highlighted fields before continuing.";

    feedback.color = "error";
    feedback.visible = true;
    return;
  }

  isSubmitting.value = true;

  // Temporary loading delay
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

  // Backend integration will replace this message
  feedback.message =
    "Registration form is valid and ready for backend integration.";

  feedback.color = "success";
  feedback.visible = true;
  isSubmitting.value = false;
};
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/registration-form.scss"
></style>
