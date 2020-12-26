import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

// VueGAPI config
const apiConfig = {
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
  scope: 'https://www.googleapis.com/auth/calendar.readonly',

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
}

const app = createApp(App)
  .use(IonicVue)
  .use(router)


router.isReady().then(() => {
  app.mount('#app');
});