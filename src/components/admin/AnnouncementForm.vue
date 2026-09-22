<template>
  <v-card class="announcement-form">
    <div class="announcement-form__heading">
      <span class="announcement-form__icon">
        <v-icon icon="mdi-bullhorn-outline" size="25" />
      </span>

      <div>
        <h2>Create Announcement</h2>
        <p>Write a message and choose who should receive it.</p>
      </div>
    </div>

    <v-form ref="formRef" @submit.prevent="submitAnnouncement">
      <v-text-field
        v-model="title"
        label="Announcement title"
        placeholder="Example: Gym opening hours update"
        variant="outlined"
        maxlength="120"
        counter
        :rules="[required]"
        :disabled="saving"
      />

      <v-textarea
        v-model="message"
        label="Message"
        placeholder="Write your announcement..."
        variant="outlined"
        rows="5"
        auto-grow
        maxlength="2000"
        counter
        :rules="[required]"
        :disabled="saving"
      />

      <!-- Radio choices make the audience explicit -->
      <v-radio-group v-model="audience" label="Recipients" :disabled="saving">
        <v-radio label="All current customers" value="all" color="primary" />

        <v-radio label="Selected customers" value="selected" color="primary" />
      </v-radio-group>

      <v-autocomplete
        v-if="audience === 'selected'"
        v-model="selectedIds"
        :items="customerOptions"
        item-title="title"
        item-value="value"
        label="Choose customers"
        placeholder="Search by Member ID or name"
        variant="outlined"
        multiple
        chips
        closable-chips
        :rules="[validSelection]"
        :disabled="saving"
      />

      <div class="announcement-form__summary" role="status">
        <v-icon icon="mdi-account-group-outline" size="21" />

        <span>
          {{ recipientIds.length }}
          {{ recipientIds.length === 1 ? "customer" : "customers" }}
          selected
        </span>
      </div>

      <p class="announcement-form__note">
        Frontend demo: announcements will be stored in this browser. No SMS or
        email will be sent.
      </p>

      <div class="announcement-form__actions">
        <v-btn
          type="submit"
          color="primary"
          prepend-icon="mdi-content-save-outline"
          :loading="saving"
          :disabled="saving || recipientIds.length === 0"
        >
          Save Announcement
        </v-btn>
      </div>
    </v-form>
  </v-card>
</template>

<script setup>
import { computed, nextTick, ref, watch } from "vue";

const props = defineProps({
  customers: {
    type: Array,
    required: true,
  },

  saving: {
    type: Boolean,
    default: false,
  },

  // Parent increments this only after a successful save.
  resetKey: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["submit"]);

const formRef = ref(null);
const title = ref("");
const message = ref("");

// Require an explicit choice before targeting everyone.
const audience = ref("selected");
const selectedIds = ref([]);

const customerOptions = computed(() =>
  props.customers.map((customer) => ({
    title: `${customer.memberId} — ${customer.name}`,
    value: customer.memberId,
  })),
);

const availableIds = computed(
  () => new Set(props.customers.map((customer) => customer.memberId)),
);

// Resolve and deduplicate recipients.
// "All" means the customers present when the announcement is saved.
const recipientIds = computed(() => {
  if (audience.value === "all") {
    return [...availableIds.value];
  }

  return [...new Set(selectedIds.value)].filter((id) =>
    availableIds.value.has(id),
  );
});

const required = (value) =>
  (typeof value === "string" && value.trim().length > 0) ||
  "This field is required.";

const validSelection = (value) =>
  (Array.isArray(value) &&
    value.length > 0 &&
    value.every((id) => availableIds.value.has(id))) ||
  "Select at least one available customer.";

const submitAnnouncement = async () => {
  if (props.saving || !formRef.value) return;

  const { valid } = await formRef.value.validate();

  if (!valid || recipientIds.value.length === 0) return;

  // Parent creates the ID, timestamp and saves the announcement.
  emit("submit", {
    title: title.value.trim(),
    message: message.value.trim(),
    audience: audience.value,
    recipientIds: [...recipientIds.value],
  });
};

// Keep the draft if saving fails.
// Clear it only when the parent confirms successful saving.
watch(
  () => props.resetKey,
  async () => {
    title.value = "";
    message.value = "";
    audience.value = "selected";
    selectedIds.value = [];

    await nextTick();
    formRef.value?.resetValidation();
  },
);
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/components/admin/announcement-form.scss"
></style>
