<template>
  <!--
    This dialog asks the customer to confirm their mobile number
    before sending an SMS verification code.
  -->
  <v-dialog
    :model-value="modelValue"
    :persistent="loading"
    max-width="480"
    @update:model-value="updateDialog"
  >
    <v-card class="verification-send-card">
      <!-- Close button -->
      <v-btn
        icon="mdi-close"
        variant="text"
        size="small"
        class="dialog-close-button"
        aria-label="Close verification dialog"
        :disabled="loading"
        @click="closeDialog"
      />

      <!-- Dialog icon -->
      <div class="dialog-icon-container">
        <v-icon
          icon="mdi-message-text-lock-outline"
          size="32"
        />
      </div>

      <!-- Dialog content -->
      <div class="dialog-content">
        <span class="dialog-step">
          Mobile verification
        </span>

        <h2>Send verification code?</h2>

        <p>
          We will send a 6-digit verification code by SMS to the
          following mobile number.
        </p>

        <!-- Customer's mobile number -->
        <div class="mobile-number-box">
          <span class="mobile-number-icon">
            <v-icon
              icon="mdi-cellphone"
              size="22"
            />
          </span>

          <div>
            <small>Mobile number</small>

            <strong>
              {{ displayedPhoneNumber }}
            </strong>
          </div>

          <!-- Allow customer to return and edit the number -->
          <v-btn
            variant="text"
            color="primary"
            size="small"
            class="edit-number-button"
            :disabled="loading"
            @click="editPhoneNumber"
          >
            Edit
          </v-btn>
        </div>

        <!-- SMS information -->
        <div class="sms-information">
          <v-icon
            icon="mdi-information-outline"
            size="18"
          />

          <span>
            Standard SMS charges may apply. The code will be valid
            for a limited time.
          </span>
        </div>
      </div>

      <!-- Dialog actions -->
      <div class="dialog-actions">
        <v-btn
          variant="outlined"
          color="secondary"
          size="large"
          class="cancel-button"
          :disabled="loading"
          @click="closeDialog"
        >
          Cancel
        </v-btn>

        <v-btn
          color="primary"
          size="large"
          class="send-code-button"
          :loading="loading"
          :disabled="loading || !phoneNumber"
          @click="sendVerificationCode"
        >
          Send code

          <v-icon
            icon="mdi-send-outline"
            end
            size="19"
          />
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup>
// Import computed to create a reactive displayed value
import { computed } from 'vue'

// Receive data from the parent Registration form
const props = defineProps({
  // Controls whether the dialog is open or closed
  modelValue: {
    type: Boolean,
    default: false,
  },

  // Customer mobile number entered in the form
  phoneNumber: {
    type: String,
    default: '',
  },

  // Controls the Send button loading state
  loading: {
    type: Boolean,
    default: false,
  },
})

// Send actions back to the parent component
const emit = defineEmits([
  'update:modelValue',
  'send',
  'edit',
])

// Display the phone number or fallback text
const displayedPhoneNumber = computed(() => {
  return (
    props.phoneNumber ||
    'No mobile number provided'
  )
})

// Update the dialog v-model value
const updateDialog = (value) => {
  emit('update:modelValue', value)
}

// Close the dialog
const closeDialog = () => {
  if (!props.loading) {
    emit('update:modelValue', false)
  }
}

// Ask the parent to send the verification code
const sendVerificationCode = () => {
  if (props.phoneNumber && !props.loading) {
    emit('send')
  }
}

// Close the dialog and return to the phone field
const editPhoneNumber = () => {
  if (!props.loading) {
    emit('edit')
    emit('update:modelValue', false)
  }
}
</script>

<!-- Load styles from the external SCSS file -->
<style
  lang="scss"
  scoped
  src="../../../assets/styles/components/dialogs/send-verification-dialog.scss"
></style>