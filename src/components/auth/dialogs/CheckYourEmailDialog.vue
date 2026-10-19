<template>
  <v-dialog
    :model-value="modelValue"
    max-width="480"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <v-card class="pa-6 text-center" rounded="xl">
      <!-- Email Verification Icon -->
      <div class="mb-4">
        <v-icon icon="mdi-email-check-outline" size="64" color="primary" />
      </div>

      <!-- Title -->
      <h2 class="text-h5 font-weight-bold mb-2">Check Your Email</h2>

      <h3 class="text-subtitle-1 font-weight-medium mb-4">
        Verify Your Email Address
      </h3>

      <!-- Description -->
      <p class="text-body-2 mb-3">We've sent a verification link to:</p>

      <!-- Customer Email -->
      <div class="pa-3 rounded bg-grey-lighten-4 mb-4">
        <strong>{{ email }}</strong>
      </div>

      <p class="text-body-2 mb-4">
        Please check your inbox and click the verification link to activate your
        Forward Fit account.
      </p>

      <p class="text-caption text-grey-darken-1 mb-4">
        Didn't receive the email? Check your spam folder or request a new link.
      </p>

      <!-- Resend Result Message -->
      <v-alert
        v-if="resendMessage"
        :type="resendError ? 'error' : 'info'"
        variant="tonal"
        density="compact"
        class="mb-4 text-left"
      >
        {{ resendMessage }}
      </v-alert>

      <!-- Resend Verification Email Button -->
      <v-btn
        color="primary"
        variant="outlined"
        size="large"
        block
        class="mb-3"
        :loading="isResending"
        :disabled="isResending"
        @click="resendVerificationEmail"
      >
        <v-icon icon="mdi-email-sync-outline" start />
        Resend Verification Email
      </v-btn>

      <!-- Close Button -->
      <v-btn color="primary" size="large" block @click="goToLogin">
        Got It
      </v-btn>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "../../../services/api";

// Component Properties
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  email: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const router = useRouter();

// Close dialog and redirect to Login Page
const goToLogin = () => {
  emit("update:modelValue", false);
  router.push({ name: "login" });
};

// Resend Email States
const isResending = ref(false);
const resendMessage = ref("");
const resendError = ref(false);

// Resend Verification Email API
const resendVerificationEmail = async () => {
  if (isResending.value || !props.email) {
    return;
  }

  isResending.value = true;
  resendMessage.value = "";
  resendError.value = false;

  try {
    // Get Laravel CSRF Cookie
    await api.get("/sanctum/csrf-cookie");

    // Call Laravel Resend Verification API
    await api.post("/api/email/resend-verification", {
      email: props.email,
    });

    // Generic success message
    resendMessage.value =
      "If your account is awaiting verification, " +
      "a new verification email will be sent. " +
      "Please check your inbox.";
  } catch (error) {
    resendError.value = true;

    if (error.response?.status === 429) {
      resendMessage.value = "Too many requests. Please try again later.";
    } else if (error.response?.status === 419) {
      resendMessage.value = "Session expired. Please try again.";
    } else {
      resendMessage.value = "Unable to process your request. Please try again.";
    }

    console.error(
      "Resend verification request failed:",
      error.response?.status || error.message,
    );
  } finally {
    isResending.value = false;
  }
};
</script>
