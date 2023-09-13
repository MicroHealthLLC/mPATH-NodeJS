
import { createApp } from 'vue'
import App from './App.vue'

import './assets/main.css'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'


const vuetify = createVuetify({
    components,
    directives,  
  })
  

createApp(App)
  .use(vuetify)
  .use(ElementPlus)
  .use(router)
  .mount('#app')