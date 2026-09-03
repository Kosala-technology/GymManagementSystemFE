// Import Vue Router functions
import {
  createRouter,
  createWebHistory,
} from 'vue-router'

// Import route modules
import homeRoutes from './modules/home'
import authRoutes from './modules/auth'

// Create the application router
const router = createRouter({
  // Use clean browser URLs without a # symbol
  history: createWebHistory(import.meta.env.BASE_URL),

  // Combine all route modules
  routes: [
    ...homeRoutes,
    ...authRoutes,
  ],

  // Return the page to the top after navigation
  scrollBehavior() {
    return {
      top: 0,
      behavior: 'smooth',
    }
  },
})

// Update the browser tab title after every navigation
router.afterEach((to) => {
  document.title = to.meta.title || 'FORWARD FIT'
})

// Export the configured router
export default router