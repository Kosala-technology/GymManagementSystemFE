// Import the function used to create the Vue application
import { createApp } from 'vue'

// Import the root component
import App from './App.vue'

// Import configured application plugins
import vuetify from './plugins/vuetify'
import router from './router'

// Import locally installed Manrope font weights
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/manrope/800.css'

// Import global project styles
import './assets/styles/main.scss'

// Create the Vue application
const app = createApp(App)

// Register application plugins
app.use(vuetify)
app.use(router)

// Mount the application
app.mount('#app')