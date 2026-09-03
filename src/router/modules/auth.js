// Import the layout used by authentication pages
import AuthLayout from "../../layouts/AuthLayout.vue";

// Import authentication pages
import LoginView from "../../views/auth/LoginView.vue";
import RegistrationView from "../../views/auth/RegistrationView.vue";

// Login and registration route definitions
const authRoutes = [
  {
    path: "/auth",
    component: AuthLayout,

    // Opening /auth automatically redirects to login
    redirect: {
      name: "login",
    },

    children: [
      {
        path: "login",
        name: "login",
        component: LoginView,

        // Browser tab information
        meta: {
          title: "Login | FORWARD FIT",
          guestOnly: true,
        },
      },
      {
        path: "register",
        name: "register",
        component: RegistrationView,

        meta: {
          title: "Registration | FORWARD FIT",
          guestOnly: true,
        },
      },
    ],
  },
];

// Export authentication routes
export default authRoutes;
