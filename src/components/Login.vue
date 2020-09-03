<template>
  <div class="login">
    <div class="login-icon">
      <md-icon class="md-size-5x">update</md-icon>
    </div>

    <md-button
      class="md-raised md-primary"
      @click="login()"
    >login</md-button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    /**
     *  Sign in the user upon button click.
     */
    login() {
      this.$gapi.login(() => {
        this.$router.push('/')
      })
    },
  }
}
</script>

<style scoped>
.login {
  text-align: center;
}

.login-icon {
  margin: 3em 0 1em 0;
}
</style>