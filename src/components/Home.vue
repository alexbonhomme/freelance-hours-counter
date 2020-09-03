<template>
  <md-app>
    <md-app-toolbar class="md-primary">
      <span class="md-title" style="flex: 1">Freelance Hours Counter</span>

      <md-button
        v-if="$gapi.isAuthenticated()"
        @click="logout()"
      >logout</md-button>
    </md-app-toolbar>

    <md-app-content>
      <div v-for="event in events" v-bind:key="event.id">
        {{ event }}
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      events: undefined,
      gapi: undefined,
      isAuthenticated: false,
    }
  },
  created() {
    this.listUpcomingEvents()
  },
  methods: {
    /**
     *  Sign in the user upon button click.
     */
    logout() {
      this.$gapi.logout(() => {
        this.$router.replace('/login')
      })
    },

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    listUpcomingEvents() {
      this.$gapi.getGapiClient().then(gapi => {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then((response) => {
          this.events = response.result.items
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
