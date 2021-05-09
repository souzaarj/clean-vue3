import { createApp } from 'vue'

import App from './app.vue'
import router from '@/presentation/router/router'

createApp(App).use(router).mount('#app')
