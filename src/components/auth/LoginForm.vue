<template>
  <!-- Main Login card -->
  <v-card class="login-card">
    <!-- Login heading -->
    <div class="login-heading">
      <span class="login-icon">
        <v-icon icon="mdi-account-lock-outline" size="25" />
      </span>

      <h1>Welcome back</h1>

      <p>
        Enter your member details to access your personalized workout schedule.
      </p>
    </div>

    <!-- Login form -->
    <v-form
      ref="loginForm"
      v-model="isFormValid"
      validate-on="blur"
      @submit.prevent="handleLogin"
    >
      <!-- Member ID or Email field -->
      <div class="form-group">
        <label for="member-identifier"> Member ID or email </label>

        <v-text-field
          id="member-identifier"
          v-model.trim="formData.memberIdentifier"
          :rules="memberIdentifierRules"
          placeholder="e.g. FF-10245 or name@email.com"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          density="comfortable"
          autocomplete="username"
          color="primary"
          bg-color="white"
          class="auth-field"
          hide-details="auto"
          required
        />
      </div>

      <!-- Password field -->
      <div class="form-group">
        <label for="password"> Password </label>

        <v-text-field
          id="password"
          v-model="formData.password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          density="comfortable"
          autocomplete="current-password"
          color="primary"
          bg-color="white"
          class="auth-field"
          hide-details="auto"
          required
          @click:append-inner="togglePasswordVisibility"
        />
      </div>

      <!-- Remember-me and forgot-password actions -->
      <div class="form-options">
        <v-checkbox
          v-model="formData.rememberMe"
          label="Remember me"
          color="primary"
          density="compact"
          hide-details
          class="remember-checkbox"
        />

        <v-btn
          variant="text"
          color="primary"
          class="forgot-password-button"
          @click="handleForgotPassword"
        >
          Forgot password?
        </v-btn>
      </div>

      <!-- Login submit button -->
      <v-btn
        type="submit"
        color="primary"
        size="large"
        block
        :loading="isSubmitting"
        :disabled="isSubmitting"
        class="login-submit-button"
      >
        Login to your account

        <v-icon icon="mdi-arrow-right" end size="20" />
      </v-btn>
    </v-form>

    <!-- Registration navigation -->
    <p class="registration-message">
      Don’t have a member account?

      <router-link :to="{ name: 'register' }"> Create an account </router-link>
    </p>

    <!-- Security message -->
    <div class="security-message">
      <v-icon icon="mdi-shield-check-outline" size="18" />

      <span>Your account information is securely protected.</span>
    </div>
  </v-card>

  <!-- Ask the customer to send a verification code -->
  <SendVerificationDialog
    v-model="showSendVerificationDialog"
    :phone-number="registeredPhoneNumber"
    :loading="isSendingCode"
    @send="handleSendVerificationCode"
    @edit="handlePhoneNumberInformation"
  />

  <!-- Enter and verify the received code -->
  <VerificationCodeDialog
    v-model="showVerificationCodeDialog"
    :phone-number="registeredPhoneNumber"
    :loading="isVerifyingCode"
    :error-message="verificationError"
    :resend-delay="60"
    @verify="handleVerifyCode"
    @resend="handleResendCode"
    @back="returnToSendDialog"
    @edit="handlePhoneNumberInformation"
  />

  <!-- Temporary development feedback -->
  <v-snackbar
    v-model="feedback.visible"
    :color="feedback.color"
    location="top"
    :timeout="3500"
  >
    {{ feedback.message }}

    <template #actions>
      <v-btn variant="text" @click="feedback.visible = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
// Import Vue utilities
import { reactive, ref } from "vue";

// Import Vue Router for dashboard navigation
import { useRouter } from "vue-router";

// Import the verification dialogs created earlier
import SendVerificationDialog from "./dialogs/SendVerificationDialog.vue";
import VerificationCodeDialog from "./dialogs/VerificationCodeDialog.vue";

// Access Vue Router
const router = useRouter();

// Store a reference to the Vuetify form
const loginForm = ref(null);

// Track whether the entire form is valid
const isFormValid = ref(false);

// Control password visibility
const showPassword = ref(false);

// Control loading states
const isSubmitting = ref(false);
const isSendingCode = ref(false);
const isVerifyingCode = ref(false);

// Control verification dialogs
const showSendVerificationDialog = ref(false);
const showVerificationCodeDialog = ref(false);

// Store verification error message
const verificationError = ref("");

// Temporary registered mobile number
// The backend will later return the customer's registered number
const registeredPhoneNumber = ref("+94 77 *** **45");

// Development verification code
// This must be replaced by backend verification in production
const developmentVerificationCode = "123456";

// Store form field values
const formData = reactive({
  memberIdentifier: "",
  password: "",
  rememberMe: false,
});

// Store temporary user feedback
const feedback = reactive({
  visible: false,
  message: "",
  color: "info",
});

// Member ID or Email validation
const memberIdentifierRules = [
  (value) => Boolean(value?.trim()) || "Member ID or email is required",

  (value) => value?.trim().length >= 5 || "Enter a valid Member ID or email",
];

// Password validation
const passwordRules = [
  (value) => Boolean(value) || "Password is required",

  (value) =>
    value?.length >= 8 || "Password must contain at least 8 characters",
];

// Show or hide the password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Display temporary forgot-password feedback
const handleForgotPassword = () => {
  feedback.message =
    "Password recovery will be connected to the backend service.";

  feedback.color = "info";
  feedback.visible = true;
};

// Validate the login information
const handleLogin = async () => {
  const validationResult = await loginForm.value.validate();

  // Stop when form validation fails
  if (!validationResult.valid) {
    feedback.message =
      "Please correct the highlighted fields before continuing.";

    feedback.color = "error";
    feedback.visible = true;
    return;
  }

  isSubmitting.value = true;

  // Temporary delay that represents the Login API request
  await new Promise((resolve) => {
    setTimeout(resolve, 800);
  });

  isSubmitting.value = false;
  verificationError.value = "";

  // After successful login, request verification
  showSendVerificationDialog.value = true;
};

// Simulate sending a verification code
const handleSendVerificationCode = async () => {
  isSendingCode.value = true;

  // This delay will later be replaced with an OTP API request
  await new Promise((resolve) => {
    setTimeout(resolve, 900);
  });

  isSendingCode.value = false;
  showSendVerificationDialog.value = false;
  showVerificationCodeDialog.value = true;

  feedback.message =
    "Verification code sent. Use 123456 for development testing.";

  feedback.color = "success";
  feedback.visible = true;
};

// Verify the entered code
const handleVerifyCode = async (enteredCode) => {
  verificationError.value = "";
  isVerifyingCode.value = true;

  // Temporary delay that represents backend verification
  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  // Compare with the temporary development code
  if (String(enteredCode).trim() !== developmentVerificationCode) {
    verificationError.value =
      "The verification code is incorrect. Please try again.";

    isVerifyingCode.value = false;
    return;
  }

  // Store temporary authentication information
  // A real project should use a secure backend-generated token
  const loginStorage = formData.rememberMe ? localStorage : sessionStorage;

  loginStorage.setItem("forwardFitCustomerAuthenticated", "true");

  loginStorage.setItem("forwardFitMemberIdentifier", formData.memberIdentifier);

  isVerifyingCode.value = false;
  showVerificationCodeDialog.value = false;

  // Navigate to the Customer Dashboard
  await router.push({
    name: "customer-dashboard",
  });
};

// Resend the development verification code
const handleResendCode = async () => {
  verificationError.value = "";
  isVerifyingCode.value = true;

  await new Promise((resolve) => {
    setTimeout(resolve, 700);
  });

  isVerifyingCode.value = false;

  feedback.message =
    "A new verification code was sent. Development code: 123456";

  feedback.color = "success";
  feedback.visible = true;
};

// Return from code entry to the send-code dialog
const returnToSendDialog = () => {
  verificationError.value = "";
  showVerificationCodeDialog.value = false;
  showSendVerificationDialog.value = true;
};

// Explain why the mobile number cannot be changed here
const handlePhoneNumberInformation = () => {
  feedback.message =
    "This number is connected to your member account. Contact the gym administrator to change it.";

  feedback.color = "info";
  feedback.visible = true;
};
</script>

<!-- Existing external SCSS file -->
<style
  lang="scss"
  scoped
  src="../../assets/styles/components/login-form.scss"
></style>
