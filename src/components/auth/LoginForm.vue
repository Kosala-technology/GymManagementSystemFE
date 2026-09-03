<template>
  <!-- Main Login card -->
  <v-card class="login-card">
    <!-- Login heading -->
    <div class="login-heading">
      <span class="login-icon">
        <v-icon
          icon="mdi-account-lock-outline"
          size="25"
        />
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
        <label for="member-identifier">
          Member ID or email
        </label>

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
        <label for="password">
          Password
        </label>

        <v-text-field
          id="password"
          v-model="formData.password"
          :rules="passwordRules"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="
            showPassword
              ? 'mdi-eye-off-outline'
              : 'mdi-eye-outline'
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

        <v-icon
          icon="mdi-arrow-right"
          end
          size="20"
        />
      </v-btn>
    </v-form>

    <!-- Registration navigation -->
    <p class="registration-message">
      Don’t have a member account?

      <router-link :to="{ name: 'register' }">
        Create an account
      </router-link>
    </p>

    <!-- Security message -->
    <div class="security-message">
      <v-icon
        icon="mdi-shield-check-outline"
        size="18"
      />

      <span>Your account information is securely protected.</span>
    </div>
  </v-card>

  <!-- Temporary development feedback -->
  <v-snackbar
    v-model="feedback.visible"
    :color="feedback.color"
    location="top"
    :timeout="3500"
  >
    {{ feedback.message }}

    <template #actions>
      <v-btn
        variant="text"
        @click="feedback.visible = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
// Import Vue reactive utilities
import { reactive, ref } from 'vue'

// Store a reference to the Vuetify form
const loginForm = ref(null)

// Track whether the entire form is valid
const isFormValid = ref(false)

// Control password visibility
const showPassword = ref(false)

// Control the Login button loading state
const isSubmitting = ref(false)

// Store form field values
const formData = reactive({
  memberIdentifier: '',
  password: '',
  rememberMe: false,
})

// Store temporary user feedback
const feedback = reactive({
  visible: false,
  message: '',
  color: 'info',
})

// Member ID or Email validation
const memberIdentifierRules = [
  (value) =>
    Boolean(value?.trim()) ||
    'Member ID or email is required',

  (value) =>
    value?.trim().length >= 5 ||
    'Enter a valid Member ID or email',
]

// Password validation
const passwordRules = [
  (value) =>
    Boolean(value) ||
    'Password is required',

  (value) =>
    value?.length >= 8 ||
    'Password must contain at least 8 characters',
]

// Show or hide the password
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// Display temporary forgot-password feedback
const handleForgotPassword = () => {
  feedback.message =
    'Password recovery will be connected to the backend service.'

  feedback.color = 'info'
  feedback.visible = true
}

// Validate and prepare Login data
const handleLogin = async () => {
  // Validate all form fields
  const validationResult = await loginForm.value.validate()

  // Stop submission if validation fails
  if (!validationResult.valid) {
    feedback.message =
      'Please correct the highlighted fields before continuing.'

    feedback.color = 'error'
    feedback.visible = true
    return
  }

  isSubmitting.value = true

  // Temporary delay used to demonstrate the loading state
  await new Promise((resolve) => {
    setTimeout(resolve, 800)
  })

  // Backend API integration will replace this temporary feedback
  feedback.message =
    'Login form is valid and ready for backend integration.'

  feedback.color = 'success'
  feedback.visible = true
  isSubmitting.value = false
}
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/login-form.scss"
></style>