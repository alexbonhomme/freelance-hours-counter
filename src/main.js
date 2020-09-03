import Vue from 'vue'
import App from './App.vue'
import VueGAPI from 'vue-gapi'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'
import routerInstance from './router'

Vue.config.productionTip = false

Vue.use(VueMaterial)

// VueGAPI config
const apiConfig = {
  apiKey: 'AIzaSyCS93f7DH1wgsZ6xtl28t9EiEVRCp3LHh8',
  clientId: '716599607292-rvhmhiq4jth1orikggk0ihjhnvh4cmcf.apps.googleusercontent.com',
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
