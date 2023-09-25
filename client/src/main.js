import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'



import App from './App.vue';
import { router } from './router';

// setup fake backend
// import { fakeBackend } from './helpers';
import { fakeBackend } from './helpers/fakeBackend';
fakeBackend();
console.log(localStorage);
// const app = createApp(App);

const vuetify = createVuetify({
    components,
    directives,
  })
  
createApp(App)
    .use(createPinia())
    .use(vuetify)
    .use(router)
    .mount('#app')

