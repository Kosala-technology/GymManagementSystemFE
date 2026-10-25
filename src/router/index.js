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
  // Step 1: Identify Admin Routes
  const isAdminRoute = to.matched.some((record) => record.path === "/admin");

  // Step 2: Determine authentication requirements
  const requiresAuth = Boolean(to.meta.requiresAuth) || isAdminRoute;

  const guestOnly = Boolean(to.meta.guestOnly);

  // Allow public pages without checking authentication
  if (!requiresAuth && !guestOnly) {
    return true;
  }

  let authenticatedUser = null;

  // Step 3: Verify Laravel authentication session
  try {
    const response = await api.get("/api/user", {
      timeout: guestOnly ? 2000 : 10000,
    });

    authenticatedUser = response.data;
  } catch (error) {
    const isTimeout =
      error.code === "ECONNABORTED" || error.code === "ETIMEDOUT";

    if (error.response?.status !== 401 && !isTimeout) {
      console.error("Authentication check failed:", error);
    }
  }

  // Step 4: Block unauthenticated users
  if (requiresAuth && !authenticatedUser) {
    return {
      name: "login",
      query: {
        redirect: to.fullPath,
      },
    };
  }

  // Step 5: Restrict Admin pages to Admin users
  if (isAdminRoute && authenticatedUser?.role !== "admin") {
    return {
      name: "home",
    };
  }

  // Step 6: Redirect authenticated users
  // away from Login and Registration pages
  if (guestOnly && authenticatedUser) {
    return {
      name:
        authenticatedUser.role === "admin"
          ? "admin-dashboard"
          : "customer-dashboard",
    };
  }

  // Step 7: Allow navigation
  return true;
});

// Update the browser tab title after every navigation
router.afterEach((to) => {
  document.title = to.meta.title || "FORWARD FIT";
});

// Export the configured router
export default router;
