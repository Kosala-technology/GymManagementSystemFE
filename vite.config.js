// Import Vite's configuration helper
import { defineConfig } from 'vite'

// Import Vue support for Vite
import vue from '@vitejs/plugin-vue'

// Import the Vuetify Vite plugin
import vuetify from 'vite-plugin-vuetify'

// Export the Vite configuration
export default defineConfig({
  plugins: [
    // Enable Vue Single File Components
    vue(),

    // Automatically import the Vuetify components we use
    vuetify({
      autoImport: true,
    }),
  ],
})