import AdminLayout from "../../layouts/AdminLayout.vue";
import AdminDashboardView from "../../views/admin/AdminDashboardView.vue";
import AdminCustomersView from "../../views/admin/AdminCustomersView.vue";
import AdminPaymentsView from "../../views/admin/AdminPaymentsView.vue";
import AdminExercisesView from "../../views/admin/AdminExercisesView.vue";
import AdminSchedulesView from "../../views/admin/AdminSchedulesView.vue";
import AdminAssignmentsView from "../../views/admin/AdminAssignmentsView.vue";
import AdminAnnouncementsView from "../../views/admin/AdminAnnouncementsView.vue";

const adminRoutes = [
  {
    path: "/admin",
    component: AdminLayout,

    redirect: {
      name: "admin-dashboard",
    },

    children: [
      {
        path: "dashboard",
        name: "admin-dashboard",
        component: AdminDashboardView,

        meta: {
          title: "Admin Dashboard | FORWARD FIT",
          pageTitle: "Dashboard",
        },
      },

      // Add the Customers route here.
      {
        path: "customers",
        name: "admin-customers",
        component: AdminCustomersView,

        meta: {
          title: "Customers | FORWARD FIT",
          pageTitle: "Customers",
        },
      },

      //payments route
      {
        path: "payments",
        name: "admin-payments",
        component: AdminPaymentsView,

        meta: {
          title: "Monthly Payments | FORWARD FIT",
          pageTitle: "Monthly Payments",
        },
      },

      //exercises route

      {
        path: "exercises",
        name: "admin-exercises",
        component: AdminExercisesView,

        meta: {
          title: "Exercise Library | FORWARD FIT",
          pageTitle: "Exercise Library",
        },
      },

      //schedules route
      {
        path: "schedules",
        name: "admin-schedules",
        component: AdminSchedulesView,

        meta: {
          title: "Schedule Builder | FORWARD FIT",
          pageTitle: "Schedule Builder",
        },
      },

      //assignments route
      {
        path: "assignments",
        name: "admin-assignments",
        component: AdminAssignmentsView,

        meta: {
          title: "Assignments | FORWARD FIT",
          pageTitle: "Assignments",
        },
      },

      //announcements route
      {
        path: "announcements",
        name: "admin-announcements",
        component: AdminAnnouncementsView,

        meta: {
          title: "Announcements | FORWARD FIT",
          pageTitle: "Announcements",
        },
      },
    ],
  },
];

export default adminRoutes;
