import { createApp } from 'vue'

import App from './app.vue'
import router from '@/presentation/components/router'

createApp(App).use(router).mount('#app')
