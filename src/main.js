import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// DM Sans (variable) — font dosyaları @fontsource ile yerel olarak paketlenir
import '@fontsource-variable/dm-sans'

import './styles/main.css'

createApp(App).use(router).mount('#app')
