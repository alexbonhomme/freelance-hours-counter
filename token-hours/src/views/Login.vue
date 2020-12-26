<template>
  <div class="login">

    <GoogleLogin :params="params" :onSuccess="onSuccess" :onFailure="onFailure"></GoogleLogin>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GoogleLogin from 'vue-google-login';

export default defineComponent({
  name: 'Login',
  components: {
    GoogleLogin,
  },
  setup() {
    return {
      params: {
        apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
        clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
        scope: 'https://www.googleapis.com/auth/calendar.readonly',

        // works only with `ux_mode: "prompt"`
        refreshToken: true,
      }
    }
  },
  methods: {
    /**
     *  Sign in the user upon button click.
     */
    // login() {
    //   this.$gapi.login(() => {
    //     this.$router.push('/')
    //   })
    // },
    onSuccess() {
      this.$router.push('/')
    },
    OnFailure() {
      console.error('tes mauvais jack!')
    }
  }
})
</script>

<style scoped>
.login {
  text-align: center;
}

.login-icon {
  margin: 3em 0 1em 0;
}
</style>