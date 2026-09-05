<template>
  <!-- Dialog used to enter the SMS verification code -->
  <v-dialog
    :model-value="modelValue"
    :persistent="loading"
    max-width="500"
    @update:model-value="updateDialog"
  >
    <v-card class="verification-code-card">
      <!-- Close dialog button -->
      <v-btn
        icon="mdi-close"
        variant="text"
        size="small"
        class="dialog-close-button"
        aria-label="Close verification dialog"
        :disabled="loading"
        @click="closeDialog"
      />

      <!-- Verification icon -->
      <div class="verification-icon-container">
        <v-icon icon="mdi-shield-key-outline" size="34" />
      </div>

      <!-- Dialog heading -->
      <div class="verification-content">
        <span class="dialog-step"> SMS verification </span>

        <h2>Enter verification code</h2>

        <p>
          Enter the 6-digit code sent to

          <strong>
            {{ maskedPhoneNumber }}
          </strong>
        </p>
      </div>

      <!--
        v-model provides two-way data binding.
        When the customer types, verificationCode is updated.
      -->
      <v-otp-input
        v-model="verificationCode"
        :length="6"
        type="number"
        variant="outlined"
        color="primary"
        base-color="secondary"
        class="verification-code-input"
        autofocus
        :disabled="loading"
        @keydown.enter="verifyCode"
      />

      <!-- Backend verification error -->
      <v-alert
        v-if="errorMessage"
        type="error"
        variant="tonal"
        density="compact"
        class="verification-error"
      >
        {{ errorMessage }}
      </v-alert>

      <!-- Code expiry information -->
      <div class="expiry-information">
        <v-icon icon="mdi-clock-outline" size="18" />

        <span v-if="secondsRemaining > 0">
          You can request another code in
          <strong>{{ formattedCountdown }}</strong>
        </span>

        <span v-else> Didn’t receive the verification code? </span>
      </div>

      <!-- Resend and change-number controls -->
      <div class="verification-links">
        <v-btn
          variant="text"
          color="secondary"
          size="small"
          :disabled="loading"
          @click="editPhoneNumber"
        >
          <v-icon icon="mdi-pencil-outline" start size="17" />

          Change number
        </v-btn>

        <v-btn
          variant="text"
          color="primary"
          size="small"
          :disabled="secondsRemaining > 0 || loading"
          @click="resendCode"
        >
          <v-icon icon="mdi-refresh" start size="17" />

          Resend code
        </v-btn>
      </div>

      <!-- Dialog actions -->
      <div class="dialog-actions">
        <v-btn
          variant="outlined"
          color="secondary"
          size="large"
          class="back-button"
          :disabled="loading"
          @click="goBack"
        >
          <v-icon icon="mdi-arrow-left" start size="19" />

          Back
        </v-btn>

        <v-btn
          color="primary"
          size="large"
          class="verify-button"
          :loading="loading"
          :disabled="!isCodeComplete || loading"
          @click="verifyCode"
        >
          Verify code

          <v-icon icon="mdi-check-circle-outline" end size="20" />
        </v-btn>
      </div>

      <!-- Security information -->
      <div class="security-information">
        <v-icon icon="mdi-lock-outline" size="17" />

        <span> Never share your verification code with anyone. </span>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Import Vue reactive utilities
import { computed, onBeforeUnmount, ref, watch } from "vue";

// Receive values from the Registration form
const props = defineProps({
  // Controls whether the dialog is visible
  modelValue: {
    type: Boolean,
    default: false,
  },

  // Customer mobile number
  phoneNumber: {
    type: String,
    default: "",
  },

  // Controls Verify button loading state
  loading: {
    type: Boolean,
    default: false,
  },

  // Displays errors received from the backend
  errorMessage: {
    type: String,
    default: "",
  },

  // Resend countdown starting value
  resendDelay: {
    type: Number,
    default: 60,
  },
});

// Send actions to the parent Registration form
const emit = defineEmits([
  "update:modelValue",
  "verify",
  "resend",
  "back",
  "edit",
]);

// OTP value connected to v-otp-input
const verificationCode = ref("");

// Remaining resend time
const secondsRemaining = ref(props.resendDelay);

// Store the countdown interval
let countdownTimer = null;

// Check whether all 6 digits have been entered
const isCodeComplete = computed(() => {
  return String(verificationCode.value).length === 6;
});

// Hide most phone-number digits for security
const maskedPhoneNumber = computed(() => {
  const digits = props.phoneNumber.replace(/\D/g, "");

  if (digits.length < 4) {
    return props.phoneNumber || "your mobile number";
  }

  return `••••••${digits.slice(-4)}`;
});

// Format seconds as 00:59
const formattedCountdown = computed(() => {
  const seconds = String(secondsRemaining.value).padStart(2, "0");

  return `00:${seconds}`;
});

// Stop the active countdown
const stopCountdown = () => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
};

// Start or restart the resend countdown
const startCountdown = () => {
  stopCountdown();

  secondsRemaining.value = props.resendDelay;

  countdownTimer = setInterval(() => {
    if (secondsRemaining.value > 0) {
      secondsRemaining.value -= 1;
    }

    if (secondsRemaining.value === 0) {
      stopCountdown();
    }
  }, 1000);
};

// Reset the dialog whenever it opens
watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      verificationCode.value = "";
      startCountdown();
    } else {
      stopCountdown();
    }
  },
  {
    immediate: true,
  },
);

// Update the parent v-model
const updateDialog = (value) => {
  if (!props.loading) {
    emit("update:modelValue", value);
  }
};

// Close the dialog
const closeDialog = () => {
  if (!props.loading) {
    emit("update:modelValue", false);
  }
};

// Send the entered code to the parent
const verifyCode = () => {
  if (isCodeComplete.value && !props.loading) {
    emit("verify", String(verificationCode.value));
  }
};

// Request a new verification code
const resendCode = () => {
  if (secondsRemaining.value === 0 && !props.loading) {
    verificationCode.value = "";
    emit("resend");
    startCountdown();
  }
};

// Return to the Send Code dialog
const goBack = () => {
  if (!props.loading) {
    verificationCode.value = "";
    emit("back");
  }
};

// Return to the mobile-number field
const editPhoneNumber = () => {
  if (!props.loading) {
    verificationCode.value = "";
    emit("edit");
  }
};

// Remove the timer when the component is destroyed
onBeforeUnmount(() => {
  stopCountdown();
});
</script>

<!-- External SCSS file -->
<style
  lang="scss"
  scoped
  src="../../../assets/styles/components/dialogs/verification-code-dialog.scss"
></style>
