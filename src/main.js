//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//importerar css för css-ramverket bulma
import './assets/css/bulma.css';

const app = createApp(App)

app.use(router)

app.mount('#app')
