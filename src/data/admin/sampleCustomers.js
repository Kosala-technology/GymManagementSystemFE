// Forward Fit frontend sample data only.
// No backend API or actual payment service is connected.

// Customer details are stored separately from monthly payments.
export const sampleCustomers = [
  {
    memberId: "FF-2026-00124",
    name: "Kosala Lakshan",
    email: "kosala@example.com",
    phone: "0770000101",
    profileImage: "",
    membershipType: "Premium",
    membershipStatus: "Active",
    monthlyFee: 6500,
    fitnessGoal: "Build Muscle",
    assignedTrainer: "Daniel Perera",
    joinedDate: "2026-07-01",
  },
  {
    memberId: "FF-2026-00125",
    name: "Nimesha Bandara",
    email: "nimesha@example.com",
    phone: "0770000102",
    profileImage: "",
    membershipType: "Standard",
    membershipStatus: "Active",
    monthlyFee: 4500,
    fitnessGoal: "Improve General Fitness",
    assignedTrainer: "Daniel Perera",
    joinedDate: "2026-08-01",
  },
  {
    memberId: "FF-2026-00126",
    name: "Kasun Perera",
    email: "kasun@example.com",
    phone: "0770000103",
    profileImage: "",
    membershipType: "Standard",
    membershipStatus: "Expired",
    monthlyFee: 4500,
    fitnessGoal: "Improve Strength",
    assignedTrainer: "Daniel Perera",
    joinedDate: "2026-06-01",
  },
  {
    memberId: "FF-2026-00127",
    name: "Amaya Silva",
    email: "amaya@example.com",
    phone: "0770000104",
    profileImage: "",
    membershipType: "Premium",
    membershipStatus: "Active",
    monthlyFee: 6500,
    fitnessGoal: "Improve Endurance",
    assignedTrainer: "Daniel Perera",
    joinedDate: "2026-08-15",
  },
];

// Monthly payment records.
// Store an explicit record for an unpaid month.
// A missing record means "not recorded", not automatically "unpaid".
export const sampleMonthlyPayments = [
  {
    id: "payment-2026-09-00124",
    memberId: "FF-2026-00124",
    month: "2026-09",
    amountDue: 6500,
    amountPaid: 6500,
    paidDate: "2026-09-02",
    paymentMethod: "Cash",
    reference: "DEMO-REC-001",
  },
  {
    id: "payment-2026-09-00125",
    memberId: "FF-2026-00125",
    month: "2026-09",
    amountDue: 4500,
    amountPaid: 0,
    paidDate: null,
    paymentMethod: null,
    reference: null,
  },
  {
    id: "payment-2026-09-00126",
    memberId: "FF-2026-00126",
    month: "2026-09",
    amountDue: 4500,
    amountPaid: 0,
    paidDate: null,
    paymentMethod: null,
    reference: null,
  },
  {
    id: "payment-2026-09-00127",
    memberId: "FF-2026-00127",
    month: "2026-09",
    amountDue: 6500,
    amountPaid: 3000,
    paidDate: "2026-09-05",
    paymentMethod: "Bank Transfer",
    reference: "DEMO-TRF-002",
  },
];

// Calculate payment status instead of storing a duplicate status value.
export const getPaymentStatus = (payment) => {
  if (!payment) {
    return "Not Recorded";
  }

  if (payment.amountPaid >= payment.amountDue) {
    return "Paid";
  }

  if (payment.amountPaid > 0) {
    return "Partial";
  }

  return "Unpaid";
};

// Calculate the remaining balance for an existing payment record.
export const getPaymentBalance = (payment) => {
  if (!payment) {
    return null;
  }

  return Math.max(payment.amountDue - payment.amountPaid, 0);
};
