<template>
  <div class="admin-customers">
    <div class="admin-customers__heading">
      <div>
        <h2>Customer Management</h2>
        <p>Find a member and view their membership information.</p>
      </div>

      <v-chip color="primary" variant="tonal"> Sample data </v-chip>
    </div>

    <!-- Search only by Member ID -->
    <v-card class="admin-customers__search">
      <v-text-field
        v-model="search"
        label="Search by Member ID"
        placeholder="Example: FF-2026-00124"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        color="primary"
        clearable
        hide-details
      />

      <p role="status">{{ filteredCustomers.length }} customers found</p>
    </v-card>

    <v-card class="admin-customers__table-card">
      <v-table>
        <caption class="admin-customers__caption">
          Customer membership directory
        </caption>

        <thead>
          <tr>
            <th scope="col">Member ID</th>
            <th scope="col">Customer</th>
            <th scope="col">Membership</th>
            <th scope="col">Status</th>
            <th scope="col">Monthly Fee</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="customer in filteredCustomers" :key="customer.memberId">
            <td>{{ customer.memberId }}</td>

            <td>
              <div class="admin-customers__identity">
                <v-avatar
                  color="primary"
                  variant="tonal"
                  size="36"
                  aria-hidden="true"
                >
                  {{ getInitials(customer.name) }}
                </v-avatar>

                <strong>{{ customer.name }}</strong>
              </div>
            </td>

            <td>{{ customer.membershipType }}</td>

            <td>
              <v-chip
                :color="getMembershipColor(customer.membershipStatus)"
                variant="tonal"
                size="small"
              >
                {{ customer.membershipStatus }}
              </v-chip>
            </td>

            <td>{{ formatMoney(customer.monthlyFee) }}</td>

            <td>
              <v-btn
                variant="text"
                color="primary"
                size="small"
                :aria-label="`View details for ${customer.name}`"
                @click="openCustomer(customer)"
              >
                View Details
              </v-btn>
            </td>
          </tr>

          <tr v-if="filteredCustomers.length === 0">
            <td colspan="6" class="admin-customers__empty">
              No customers match this Member ID.
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Read-only customer details -->
    <v-dialog
      v-model="detailsOpen"
      max-width="600"
      scrollable
      aria-labelledby="customer-details-title"
    >
      <v-card v-if="selectedCustomer">
        <div class="admin-customers__dialog-heading">
          <h2 id="customer-details-title">Customer Details</h2>

          <v-btn
            icon="mdi-close"
            variant="text"
            aria-label="Close customer details"
            @click="detailsOpen = false"
          />
        </div>

        <v-divider />

        <v-card-text>
          <div class="admin-customers__profile">
            <v-avatar color="primary" size="64">
              <v-img
                v-if="selectedCustomer.profileImage"
                :src="selectedCustomer.profileImage"
                :alt="selectedCustomer.name"
                cover
              />

              <span v-else>
                {{ getInitials(selectedCustomer.name) }}
              </span>
            </v-avatar>

            <div>
              <h3>{{ selectedCustomer.name }}</h3>
              <p>{{ selectedCustomer.memberId }}</p>
            </div>
          </div>

          <!-- Description list provides accessible label/value pairs -->
          <dl class="admin-customers__details">
            <div v-for="detail in customerDetails" :key="detail.label">
              <dt>{{ detail.label }}</dt>
              <dd>{{ detail.value }}</dd>
            </div>
          </dl>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="primary" variant="tonal" @click="detailsOpen = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

import { sampleCustomers } from "../../data/admin/sampleCustomers.js";

// Local sample data only; no API request is made.
const customers = sampleCustomers;

const search = ref("");
const selectedCustomer = ref(null);
const detailsOpen = ref(false);

// Support partial Member IDs and ignore letter case.
// Clearing the field displays every customer.
const filteredCustomers = computed(() => {
  const query = (search.value ?? "").trim().toLowerCase();

  return customers.filter((customer) =>
    customer.memberId.toLowerCase().includes(query),
  );
});

const currencyFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
});

const formatMoney = (value) => {
  return currencyFormatter.format(value);
};

const formatDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

const getInitials = (name) => {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const getMembershipColor = (status) => {
  if (status === "Active") return "success";
  if (status === "Expired") return "error";

  return "warning";
};

const openCustomer = (customer) => {
  selectedCustomer.value = customer;
  detailsOpen.value = true;
};

// Update the dialog details whenever a different customer is selected.
const customerDetails = computed(() => {
  const customer = selectedCustomer.value;

  if (!customer) {
    return [];
  }

  return [
    { label: "Email", value: customer.email },
    { label: "Phone", value: customer.phone },
    { label: "Membership", value: customer.membershipType },
    { label: "Membership status", value: customer.membershipStatus },
    { label: "Monthly fee", value: formatMoney(customer.monthlyFee) },
    { label: "Fitness goal", value: customer.fitnessGoal },
    { label: "Assigned trainer", value: customer.assignedTrainer },
    { label: "Joined date", value: formatDate(customer.joinedDate) },
  ];
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/admin/admin-customers.scss"
></style>
