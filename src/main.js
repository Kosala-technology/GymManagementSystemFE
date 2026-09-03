// Import the function used to create the Vue application
import { createApp } from 'vue'

// Import the root application component
import App from './App.vue'

// Import the configured Vuetify instance
import vuetify from './plugins/vuetify'

// Import the locally installed Manrope font weights
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'

// Import the global project styles
import './assets/styles/main.scss'

// Create the Vue application
const app = createApp(App)

// Register Vuetify
app.use(vuetify)

// Mount the application inside the #app element
app.mount('#app')