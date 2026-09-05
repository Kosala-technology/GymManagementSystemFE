// Import the Customer Dashboard page
import CustomerDashboardView from "../../views/customer/CustomerDashboardView.vue";

// Customer-related route definitions
const customerRoutes = [
  {
    path: "/customer/dashboard",
    name: "customer-dashboard",
    component: CustomerDashboardView,

    // Route information
    meta: {
      title: "Customer Dashboard | FORWARD FIT",

      // This will be used when real authentication is added
      requiresAuth: true,
    },
  },
];

// Export customer routes so the main router can use them
export default customerRoutes;
