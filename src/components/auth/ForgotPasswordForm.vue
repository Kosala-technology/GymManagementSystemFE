<template>
  <v-container class="py-10" style="max-width: 500px">
    <v-card class="pa-6" rounded="xl" elevation="2">
      <!-- Heading -->
      <div class="text-center mb-6">
        <v-icon icon="mdi-lock-reset" size="60" color="primary" class="mb-3" />

        <h2 class="text-h5 font-weight-bold">Forgot Password?</h2>

        <p class="text-body-2 text-grey-darken-1 mt-3">
          Enter your registered email address. We will send you a link to reset
          your password.
        </p>
      </div>

      <!-- Forgot Password Form -->
      <v-form ref="formRef" @submit.prevent="handleForgotPassword">
        <v-text-field
          v-model="email"
          label="Email Address"
          type="email"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          :rules="emailRules"
          :disabled="isLoading"
          class="mb-3"
        />

        <!-- Success Message -->
        <v-alert
          v-if="successMessage"
          type="success"
          variant="tonal"
          class="mb-4"
        >
          {{ successMessage }}
        </v-alert>

        <!-- Error Message -->
        <v-alert v-if="errorMessage" type="error" variant="tonal" class="mb-4">
          {{ errorMessage }}
        </v-alert>

        <!-- Submit Button with Cooldown -->
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :loading="isLoading"
          :disabled="isLoading || retryAfterSeconds > 0"
        >
          {{
            retryAfterSeconds > 0
              ? `Try again in ${Math.ceil(retryAfterSeconds / 60)} min`
              : "Send Reset Link"
          }}
        </v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onUnmounted } from "vue";
import api from "../../services/api";

// Form States
const formRef = ref(null);
const email = ref("");
const isLoading = ref(false);

const successMessage = ref("");
const errorMessage = ref("");

// Cooldown States
const retryAfterSeconds = ref(0);
let cooldownTimer = null;

// Start cooldown after reaching the request limit
const startCooldown = (seconds) => {
  // Clear any existing timer
  if (cooldownTimer !== null) {
    clearInterval(cooldownTimer);
  }

  // Set remaining cooldown time
  retryAfterSeconds.value = Math.max(1, Math.ceil(Number(seconds) || 900));

  // Start countdown timer
  cooldownTimer = setInterval(() => {
    retryAfterSeconds.value = Math.max(0, retryAfterSeconds.value - 1);

    // Enable button when cooldown ends
    if (retryAfterSeconds.value === 0) {
      clearInterval(cooldownTimer);
      cooldownTimer = null;

      errorMessage.value = "";
    }
  }, 1000);
};

// Clean up timer when leaving the page
onUnmounted(() => {
  if (cooldownTimer !== null) {
    clearInterval(cooldownTimer);
  }
});

// Email Validation
const emailRules = [
  (v) => !!v?.trim() || "Email is required",
  (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v?.trim() || "") ||
    "Enter a valid email address",
];

// Forgot Password Function
const handleForgotPassword = async () => {
  // Prevent submitting while loading or cooling down
  if (isLoading.value || retryAfterSeconds.value > 0) {
    return;
  }

  // Validate email
  const result = await formRef.value.validate();

  if (!result.valid) {
    return;
  }

  isLoading.value = true;
  successMessage.value = "";
  errorMessage.value = "";

  try {
    // Get Laravel CSRF Cookie
    await api.get("/sanctum/csrf-cookie");

    // Send Forgot Password Request
    await api.post("/api/forgot-password", {
      email: email.value.trim(),
    });

    // Success Message
    successMessage.value =
      "If an account exists with this email, " +
      "a password reset link will be sent. " +
      "Please check your inbox.";
  } catch (error) {
    // Too Many Requests
    if (error.response?.status === 429) {
      errorMessage.value =
        "Maximum 2 password reset requests allowed. " +
        "Please try again later.";

      // Get remaining cooldown time from Laravel
      startCooldown(error.response?.data?.retry_after);
    } else if (error.response?.status === 419) {
      errorMessage.value = "Session expired. Please try again.";
    } else {
      errorMessage.value = "Unable to process your request. Please try again.";
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
