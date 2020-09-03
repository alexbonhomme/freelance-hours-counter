import Vue from 'vue'
import App from './App.vue'
import VueGAPI from 'vue-gapi'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import routerInstance from './router'
import creds from './credentials.json'

Vue.config.productionTip = false

Vue.use(VueMaterial)

// VueGAPI config
const apiConfig = {
  apiKey: creds.google.apiKey,
  clientId: creds.google.clientId,
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
  scope: 'https://www.googleapis.com/auth/calendar.readonly',

  // works only with `ux_mode: "prompt"`
  refreshToken: true,
}

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)

new Vue({
  render: h => h(App),
  router: routerInstance
}).$mount('#app')
