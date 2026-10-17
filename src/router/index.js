// Import Vue Router functions
import { createRouter, createWebHistory } from "vue-router";

// Import route modules
import homeRoutes from "./modules/home";
import authRoutes from "./modules/auth";
import customerRoutes from "./modules/customer";
import adminRoutes from "./modules/admin";
import api from "../services/api";

// Create the application router
const router = createRouter({
  // Use clean browser URLs without a # symbol
  history: createWebHistory(import.meta.env.BASE_URL),

  // Combine all application route modules
  routes: [...homeRoutes, ...authRoutes, ...customerRoutes, ...adminRoutes],

  // Return the page to the top after navigation
  scrollBehavior() {
    return {
      top: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach(async (to) => {
  // Step 1: Allow public pages without an authentication check
  if (!to.meta.requiresAuth && !to.meta.guestOnly) {
    return true;
  }

  let authenticatedUser = null;

  // Step 2: Check Laravel authentication session
  try {
    const response = await api.get("/api/user");

    authenticatedUser = response.data;
  } catch (error) {
    // 401 means the user is not authenticated
    if (error.response?.status !== 401) {
      console.error("Authentication check failed:", error);
    }
  }

  // Step 3: Protect customer pages
  if (to.meta.requiresAuth && !authenticatedUser) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  // Step 4: Redirect authenticated users away
  // from Login and Registration pages
  if (to.meta.guestOnly && authenticatedUser) {
    return {
      name: "customer-dashboard",
    };
  }

  // Step 5: Allow navigation
  return true;
});

// Update the browser tab title after every navigation
router.afterEach((to) => {
  document.title = to.meta.title || "FORWARD FIT";
});

// Export the configured router
export default router;
