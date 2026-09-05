// Import customer pages
import CustomerDashboardView from "../../views/customer/CustomerDashboardView.vue";
import WorkoutScheduleView from "../../views/customer/WorkoutScheduleView.vue";

// Customer-related route definitions
const customerRoutes = [
  {
    path: "/customer/dashboard",
    name: "customer-dashboard",
    component: CustomerDashboardView,

    meta: {
      title: "Customer Dashboard | FORWARD FIT",
      requiresAuth: true,
    },
  },

  {
    path: "/customer/workout-schedule",
    name: "workout-schedule",
    component: WorkoutScheduleView,

    meta: {
      title: "Workout Schedule | FORWARD FIT",
      requiresAuth: true,
    },
  },
];

// Export routes so the main router can use them
export default customerRoutes;
