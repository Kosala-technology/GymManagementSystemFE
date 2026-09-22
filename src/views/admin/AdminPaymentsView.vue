<template>
  <div class="admin-payments">
    <div class="admin-payments__heading">
      <div>
        <h2>Monthly Payments</h2>
        <p>Review each member’s payment status for the selected month.</p>
      </div>

      <v-chip color="primary" variant="tonal"> Sample data </v-chip>
    </div>

    <!-- Filters update the table through computed properties -->
    <v-card class="admin-payments__filters">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="search"
            label="Search by Member ID"
            placeholder="FF-2026-00124"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            clearable
            hide-details
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedMonth"
            :items="monthOptions"
            label="Payment month"
            variant="outlined"
            hide-details
          />
        </v-col>

        <v-col cols="12" sm="6" md="4">
          <v-select
            v-model="selectedStatus"
            :items="statusOptions"
            label="Payment status"
            variant="outlined"
            hide-details
          />
        </v-col>
      </v-row>
    </v-card>

    <!-- Summary follows the selected month, before search/status filters -->
    <v-row class="admin-payments__summary">
      <v-col v-for="item in summary" :key="item.label" cols="12" sm="6" lg="3">
        <v-card class="admin-payments__summary-card">
          <span>{{ item.label }}</span>
          <strong>{{ item.value }}</strong>
        </v-card>
      </v-col>
    </v-row>

    <p class="admin-payments__result-count" role="status">
      {{ filteredRows.length }} records found
    </p>

    <v-card class="admin-payments__table-card">
      <v-table>
        <thead>
          <tr>
            <th scope="col">Member ID</th>
            <th scope="col">Customer</th>
            <th scope="col">Amount Due</th>
            <th scope="col">Amount Paid</th>
            <th scope="col">Balance</th>
            <th scope="col">Paid Date</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in filteredRows" :key="row.memberId">
            <td>{{ row.memberId }}</td>
            <td>{{ row.name }}</td>
            <td>{{ formatMoney(row.payment?.amountDue) }}</td>
            <td>{{ formatMoney(row.payment?.amountPaid) }}</td>
            <td>{{ formatMoney(row.balance) }}</td>
            <td>{{ formatDate(row.payment?.paidDate) }}</td>

            <td>
              <v-chip
                :color="getStatusColor(row.status)"
                variant="tonal"
                size="small"
              >
                {{ row.status }}
              </v-chip>
            </td>

            <td>
              <v-btn
                variant="text"
                color="primary"
                size="small"
                :aria-label="`View payment for ${row.name}`"
                @click="openDetails(row)"
              >
                Details
              </v-btn>
            </td>
          </tr>

          <tr v-if="filteredRows.length === 0">
            <td colspan="8" class="admin-payments__empty">
              No payment records match these filters.
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <v-dialog
      v-model="detailsOpen"
      max-width="560"
      scrollable
      aria-labelledby="payment-details-title"
    >
      <v-card v-if="selectedRow">
        <div class="admin-payments__dialog-heading">
          <h2 id="payment-details-title">Payment Details</h2>

          <v-btn
            icon="mdi-close"
            variant="text"
            aria-label="Close payment details"
            @click="detailsOpen = false"
          />
        </div>

        <v-divider />

        <v-card-text>
          <dl class="admin-payments__details">
            <div v-for="item in detailItems" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
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

import {
  sampleCustomers,
  sampleMonthlyPayments,
  getPaymentStatus,
  getPaymentBalance,
} from "../../data/admin/sampleCustomers.js";

const search = ref("");
const selectedStatus = ref("All");
const detailsOpen = ref(false);
const selectedRow = ref(null);

// List the months present in the sample payment records.
const months = [
  ...new Set(sampleMonthlyPayments.map((payment) => payment.month)),
]
  .sort()
  .reverse();

// Start with the latest recorded sample month.
const selectedMonth = ref(months[0] ?? null);

const statusOptions = ["All", "Paid", "Unpaid", "Partial", "Not Recorded"];

const formatMonth = (value) => {
  if (!value) return "—";

  const [year, month] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, 1));
};

const monthOptions = months.map((month) => ({
  title: formatMonth(month),
  value: month,
}));

const currencyFormatter = new Intl.NumberFormat("en-LK", {
  style: "currency",
  currency: "LKR",
});

// Missing records display a dash rather than a misleading zero.
const formatMoney = (value) => {
  return value == null ? "—" : currencyFormatter.format(value);
};

const formatDate = (value) => {
  if (!value) return "—";

  const [year, month, day] = value.split("-").map(Number);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
};

// Join customer details with the selected month's payment record.
const monthlyRows = computed(() => {
  return sampleCustomers.map((customer) => {
    const payment = sampleMonthlyPayments.find(
      (record) =>
        record.memberId === customer.memberId &&
        record.month === selectedMonth.value,
    );

    return {
      memberId: customer.memberId,
      name: customer.name,
      month: selectedMonth.value,
      payment,
      status: getPaymentStatus(payment),
      balance: getPaymentBalance(payment),
    };
  });
});

// Search by Member ID and filter by payment status.
const filteredRows = computed(() => {
  const query = (search.value ?? "").trim().toLowerCase();

  return monthlyRows.value.filter((row) => {
    const matchesId = row.memberId.toLowerCase().includes(query);
    const matchesStatus =
      selectedStatus.value === "All" || row.status === selectedStatus.value;

    return matchesId && matchesStatus;
  });
});

const summary = computed(() => {
  const rows = monthlyRows.value;

  return [
    {
      label: "Paid members",
      value: rows.filter((row) => row.status === "Paid").length,
    },
    {
      label: "Unpaid members",
      value: rows.filter((row) => row.status === "Unpaid").length,
    },
    {
      label: "Partial payments",
      value: rows.filter((row) => row.status === "Partial").length,
    },
    {
      label: "Outstanding — recorded payments",
      value: formatMoney(
        rows.reduce((total, row) => total + (row.balance ?? 0), 0),
      ),
    },
  ];
});

const getStatusColor = (status) => {
  const colors = {
    Paid: "success",
    Unpaid: "error",
    Partial: "warning",
    "Not Recorded": "secondary",
  };

  return colors[status] ?? "secondary";
};

const openDetails = (row) => {
  selectedRow.value = row;
  detailsOpen.value = true;
};

const detailItems = computed(() => {
  const row = selectedRow.value;
  if (!row) return [];

  return [
    { label: "Customer", value: row.name },
    { label: "Member ID", value: row.memberId },
    { label: "Month", value: formatMonth(row.month) },
    { label: "Status", value: row.status },
    { label: "Amount due", value: formatMoney(row.payment?.amountDue) },
    { label: "Amount paid", value: formatMoney(row.payment?.amountPaid) },
    { label: "Balance", value: formatMoney(row.balance) },
    { label: "Paid date", value: formatDate(row.payment?.paidDate) },
    { label: "Payment method", value: row.payment?.paymentMethod ?? "—" },
    { label: "Reference", value: row.payment?.reference ?? "—" },
  ];
});
</script>

<style
  lang="scss"
  scoped
  src="../../assets/styles/pages/admin/admin-payments.scss"
></style>
