<template>
  <main class="contact-page">
    <!-- SECTION 01 - CONTACT HERO -->
    <section class="contact-hero">
      <div class="page-container contact-hero-grid">
        <div class="contact-hero-content">
          <span class="contact-badge">
            <v-icon icon="mdi-message-text-outline" size="18" />
            CONTACT FORWARD FIT
          </span>

          <h1>
            Have Questions?
            <span>Let's Connect.</span>
          </h1>

          <p>
            Your fitness journey matters to us. Whether you have questions about
            membership, training programs, or the Forward Fit platform, we're
            here to help you find the information you need.
          </p>

          <a href="#contact-form" class="contact-hero-action">
            Send an Inquiry
            <v-icon icon="mdi-arrow-down" size="20" />
          </a>
        </div>

        <!-- Contact Illustration Panel -->
        <div class="contact-hero-panel">
          <div class="contact-panel-icon">
            <v-icon icon="mdi-headset" size="65" />
          </div>

          <h2>We're Here to Help.</h2>

          <p>
            Explore our programs, learn about membership, and connect with the
            Forward Fit team.
          </p>

          <div class="contact-panel-features">
            <span>
              <v-icon icon="mdi-check-circle-outline" />
              Membership Questions
            </span>

            <span>
              <v-icon icon="mdi-check-circle-outline" />
              Training Information
            </span>

            <span>
              <v-icon icon="mdi-check-circle-outline" />
              General Inquiries
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 02 - INQUIRY CATEGORIES -->
    <section class="contact-topics-section">
      <div class="page-container">
        <div class="contact-section-heading">
          <span>HOW CAN WE HELP?</span>
          <h2>Get the Support <em>You Need.</em></h2>
          <p>
            Find the right information for your fitness and membership journey.
          </p>
        </div>

        <div class="contact-topics-grid">
          <article
            v-for="topic in topics"
            :key="topic.title"
            class="contact-topic-card"
          >
            <div class="contact-topic-icon">
              <v-icon :icon="topic.icon" size="32" />
            </div>

            <h3>{{ topic.title }}</h3>
            <p>{{ topic.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- SECTION 03 - CONTACT FORM -->
    <section id="contact-form" class="contact-form-section">
      <div class="page-container contact-form-grid">
        <div class="contact-form-intro">
          <span class="contact-section-label"> GET IN TOUCH </span>

          <h2>
            Send Us
            <span>Your Questions.</span>
          </h2>

          <p>Complete the inquiry form with your information and message.</p>

          <div class="contact-info-note">
            <v-icon icon="mdi-shield-check-outline" size="26" />

            <div>
              <strong>Simple & Convenient</strong>
              <p>Share your inquiry using our easy-to-use contact form.</p>
            </div>
          </div>

          <!-- Social Media Connection Section -->
          <div class="contact-social-section">
            <span class="contact-social-label"> STAY CONNECTED </span>

            <h3>Connect With Forward Fit</h3>

            <p>Stay connected with us through your favorite platforms.</p>

            <div class="contact-social-grid">
              <div
                v-for="social in socialPlatforms"
                :key="social.name"
                class="contact-social-card"
                :class="`social-${social.key}`"
              >
                <div class="contact-social-icon">
                  <v-icon :icon="social.icon" size="25" />
                </div>

                Forwardfit
                <strong>{{ social.name }}</strong>

                <span>{{ social.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <v-card class="contact-form-card" elevation="0" rounded="xl">
          <h3>Contact Form</h3>

          <v-form ref="contactForm" @submit.prevent="handleContactSubmit">
            <v-text-field
              v-model.trim="form.name"
              label="Full Name"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              :rules="requiredRules"
              class="mb-2"
            />

            <v-text-field
              v-model.trim="form.email"
              label="Email Address"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              :rules="emailRules"
              class="mb-2"
            />

            <v-select
              v-model="form.subject"
              label="Inquiry Subject"
              prepend-inner-icon="mdi-format-list-bulleted"
              :items="subjects"
              variant="outlined"
              :rules="requiredRules"
              class="mb-2"
            />

            <v-textarea
              v-model.trim="form.message"
              label="Your Message"
              prepend-inner-icon="mdi-message-outline"
              variant="outlined"
              rows="5"
              auto-grow
              :rules="messageRules"
              class="mb-3"
            />

            <v-alert
              v-if="formFeedback"
              type="info"
              variant="tonal"
              class="mb-4"
            >
              {{ formFeedback }}
            </v-alert>

            <!-- Frontend validation only -->
            <v-btn
              type="submit"
              color="primary"
              size="large"
              block
              class="contact-submit-button"
            >
              Validate Inquiry
              <v-icon icon="mdi-check" end />
            </v-btn>

            <p class="contact-form-note">
              Frontend preview only. Message sending will require backend
              integration.
            </p>
          </v-form>
        </v-card>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";

const contactForm = ref(null);
const formFeedback = ref("");

const form = reactive({
  name: "",
  email: "",
  subject: null,
  message: "",
});

const subjects = [
  "Membership Inquiry",
  "Training Programs",
  "Account Support",
  "General Inquiry",
];

const requiredRules = [(v) => !!v?.trim() || "This field is required"];

const emailRules = [
  (v) => !!v?.trim() || "Email is required",
  (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "") || "Enter a valid email address",
];

const messageRules = [
  (v) => !!v?.trim() || "Message is required",
  (v) =>
    (v?.trim().length || 0) >= 10 ||
    "Message must contain at least 10 characters",
];

const topics = [
  {
    title: "Membership Information",
    icon: "mdi-account-group-outline",
    description:
      "Learn about member registration and accessing your Forward Fit account.",
  },
  {
    title: "Training Programs",
    icon: "mdi-dumbbell",
    description:
      "Explore fitness programs and find information about different training options.",
  },
  {
    title: "General Support",
    icon: "mdi-lifebuoy",
    description:
      "Find guidance about using the platform and managing your member information.",
  },
];

const socialPlatforms = [
  {
    key: "whatsapp",
    name: "WhatsApp",
    icon: "mdi-whatsapp",
    description: "Chat with our team",
  },
  {
    key: "facebook",
    name: "Facebook",
    icon: "mdi-facebook",
    description: "Follow our updates",
  },
  {
    key: "instagram",
    name: "Instagram",
    icon: "mdi-instagram",
    description: "Explore fitness content",
  },
  {
    key: "email",
    name: "Email",
    icon: "mdi-email-outline",
    description: "Contact our team",
  },
];

const handleContactSubmit = async () => {
  formFeedback.value = "";

  const result = await contactForm.value.validate();

  if (!result.valid) {
    return;
  }

  // Contact backend has not been connected yet.
  formFeedback.value =
    "Your form details are valid. This is a frontend preview; " +
    "your message has not been sent.";
};
</script>

<style lang="scss" scoped src="../assets/styles/pages/contact.scss"></style>
