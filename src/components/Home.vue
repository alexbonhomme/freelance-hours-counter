<template>
  <div>
    <p>Google Calendar API Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button v-if="!isAuthenticated" @click="handleAuthClick()">Authorize</button>
    <button v-if="isAuthenticated" @click="handleSignoutClick()">Sign Out</button>

    <div v-for="event in events" v-bind:key="event.id">
      {{ event }}
    </div>

    <pre id="content" style="white-space: pre-wrap;"></pre>
  </div>
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
    this.$gapi.getGapiClient().then((gapi) => {
      this.gapi = gapi;
      this.isAuthenticated = this.$gapi.isAuthenticated();

      // if already loggedin fetch event
      if (this.isAuthenticated) {
        this.listUpcomingEvents()
      }

      // update loggeding status and fetch event if needed
      this.$gapi.listenUserSignIn((isSignedIn) => {
        this.isAuthenticated = isSignedIn

        if (this.isAuthenticated) {
          this.listUpcomingEvents()
        }
      })
    })

  },
  methods: {
    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
      this.$gapi.login()
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      this.$gapi.logout()
    },

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    listUpcomingEvents() {
      this.gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 10,
        'orderBy': 'startTime'
      }).then((response) => {
        this.events = response.result.items
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
