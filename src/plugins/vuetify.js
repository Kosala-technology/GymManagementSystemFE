// Import Vuetify's default component styles
import 'vuetify/styles'

// Import Material Design Icons
import '@mdi/font/css/materialdesignicons.css'

// Import the Vuetify creation function
import { createVuetify } from 'vuetify'

// Import the Material Design icon configuration
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Create the main Vuetify instance
const vuetify = createVuetify({
  // Configure Material Design Icons
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },

  // Configure the PULSEFIT light theme
  theme: {
    defaultTheme: 'pulseFitLight',

    themes: {
      pulseFitLight: {
        // Use a light colour scheme
        dark: false,

        colors: {
          // Page colours
          background: '#FFFFFF',
          surface: '#FFFFFF',
          'surface-variant': '#F5F6F8',

          // Brand colours
          primary: '#F04438',
          'primary-darken-1': '#D92D20',
          secondary: '#15181D',
          accent: '#FF8A00',

          // Text colours
          'on-background': '#15181D',
          'on-surface': '#15181D',
          'on-primary': '#FFFFFF',
          'on-secondary': '#FFFFFF',

          // Feedback colours
          success: '#12B76A',
          warning: '#F79009',
          error: '#D92D20',
          info: '#2E90FA',
        },
      },
    },
  },

  // Configure common Vuetify component defaults
  defaults: {
    VBtn: {
      elevation: 0,
      rounded: 'lg',
      style: 'text-transform: none; letter-spacing: 0;',
    },

    VCard: {
      elevation: 0,
      rounded: 'xl',
    },
  },
})

// Export Vuetify so main.js can register it
export default vuetify