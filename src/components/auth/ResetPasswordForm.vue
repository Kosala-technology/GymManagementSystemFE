<template>
  <v-container class="py-10" style="max-width: 500px">
    <v-card class="pa-6" rounded="xl" elevation="2">
      <!-- Heading -->
      <div class="text-center mb-6">
        <v-icon icon="mdi-lock-reset" size="60" color="primary" class="mb-3" />

        <h2 class="text-h5 font-weight-bold">Reset Password</h2>

        <p class="text-body-2 text-grey-darken-1 mt-3">
          Create a new password for your Forward Fit account.
        </p>
      </div>

      <!-- Missing or Invalid Link -->
      <v-alert
        v-if="!token || !email"
        type="error"
        variant="tonal"
        class="mb-4"
      >
        Invalid password reset link. Please request a new link.
      </v-alert>

      <!-- Reset Password Form -->
      <v-form
        v-else-if="!resetSuccessful"
        ref="formRef"
        @submit.prevent="handleResetPassword"
      >
        <!-- Email Address -->
        <v-text-field
          :model-value="email"
          label="Email Address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          readonly
          class="mb-3"
        />

        <!-- New Password -->
        <v-text-field
          v-model="newPassword"
          label="New Password"
          prepend-inner-icon="mdi-lock-outline"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="
            showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append-inner="showPassword = !showPassword"
          variant="outlined"
          :rules="passwordRules"
          :disabled="isLoading"
          autocomplete="new-password"
          class="mb-3"
        />

        <!-- Confirm Password -->
        <v-text-field
          v-model="confirmPassword"
          label="Confirm New Password"
          prepend-inner-icon="mdi-lock-check-outline"
          :type="showConfirmPassword ? 'text' : 'password'"
          :append-inner-icon="
            showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
          "
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
          variant="outlined"
          :rules="confirmPasswordRules"
          :disabled="isLoading"
          autocomplete="new-password"
          class="mb-3"
        />

        <!-- Error Message -->
        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert>

        <!-- Reset Password Button -->
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :loading="isLoading"
          :disabled="isLoading"
        >
          Reset Password
        </v-btn>
      </v-form>

      <!-- Success Message -->
      <div v-if="resetSuccessful" class="text-center">
        <v-icon
          icon="mdi-check-circle-outline"
          color="success"
          size="65"
          class="mb-3"
        />

        <v-alert type="success" variant="tonal" class="mb-4">
          Password reset successfully! You can now log in with your new
          password.
        </v-alert>

        <v-btn color="primary" size="large" block @click="goToLogin">
          Go to Login
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../../services/api";

// Vue Router
const route = useRoute();
const router = useRouter();

// Get reset token and email from URL
const token = typeof route.query.token === "string" ? route.query.token : "";

const email = typeof route.query.email === "string" ? route.query.email : "";

// Form States
const formRef = ref(null);
const newPassword = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const isLoading = ref(false);
const resetSuccessful = ref(false);
const errorMessage = ref("");

// Password Validation
const passwordRules = [
  (v) => !!v || "Password is required",
  (v) => v?.length >= 8 || "Password must contain at least 8 characters",
];

// Confirm Password Validation
const confirmPasswordRules = [
  (v) => !!v || "Please confirm your password",
  (v) => v === newPassword.value || "Passwords do not match",
];

// Reset Password API Function
const handleResetPassword = async () => {
  const result = await formRef.value.validate();

  if (!result.valid || !token || !email) {
    return;
  }

  isLoading.value = true;
  errorMessage.value = "";

  try {
    // Get Laravel CSRF Cookie
    await api.get("/sanctum/csrf-cookie");

    // Submit reset password request
    await api.post("/api/reset-password", {
      token: token,
      email: email,
      password: newPassword.value,
      password_confirmation: confirmPassword.value,
    });

    // Password reset successful
    resetSuccessful.value = true;

    // Clear password fields
    newPassword.value = "";
    confirmPassword.value = "";
  } catch (error) {
    if (error.response?.status === 422) {
      errorMessage.value =
        "Unable to reset password. " +
        "The link may be invalid or expired, " +
        "or the password details may be incorrect.";
    } else if (error.response?.status === 429) {
      errorMessage.value = "Too many requests. Please try again later.";
    } else {
      errorMessage.value = "Something went wrong. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Navigate to Login Page
const goToLogin = () => {
  router.push({ name: "login" });
};
</script>
