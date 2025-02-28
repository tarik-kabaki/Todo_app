import './assets/main.css'
import { PrimeVue } from '@primevue/core'
import { createApp } from 'vue'
import App from './App.vue'
import Aura from '@primeuix/themes/aura'
const app = createApp(App)

app.use(PrimeVue,{
    theme: {
        preset: Aura
    }
});

app.mount('#app')