// Import Vue Router functions
import { createRouter, createWebHistory } from "vue-router";

// Import route modules
import homeRoutes from "./modules/home";
import authRoutes from "./modules/auth";
import customerRoutes from "./modules/customer";

// Create the application router
const router = createRouter({
  // Use clean browser URLs without a # symbol
  history: createWebHistory(import.meta.env.BASE_URL),

  // Combine all application route modules
  routes: [...homeRoutes, ...authRoutes, ...customerRoutes],

  // Return the page to the top after navigation
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

// Run before every page navigation
router.beforeEach((to) => {
  // Check both storage locations because Remember Me is optional
  const localAuthentication =
    localStorage.getItem("forwardFitCustomerAuthenticated") === "true";

  const sessionAuthentication =
    sessionStorage.getItem("forwardFitCustomerAuthenticated") === "true";

  const isCustomerAuthenticated = localAuthentication || sessionAuthentication;

  // Prevent unauthenticated users from opening protected pages
  if (to.meta.requiresAuth && !isCustomerAuthenticated) {
    return {
      name: "login",

      // Remember the page the customer originally requested
      query: {
        redirect: to.fullPath,
      },
    };
  }

  // Prevent logged-in customers from returning to Login/Register pages
  if (to.meta.guestOnly && isCustomerAuthenticated) {
    return {
      name: "customer-dashboard",
    };
  }

  // Allow the requested navigation
  return true;
});

// Update the browser tab title after every navigation
router.afterEach((to) => {
  document.title = to.meta.title || "FORWARD FIT";
});

// Export the configured router
export default router;
