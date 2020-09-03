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
      <!-- token query -->
      <md-field>
        <label>Token</label>
        <md-input
          v-model="token"
          @keypress.enter="fetchEvents()"
        ></md-input>
      </md-field>

      <!-- event list -->
      <md-table>
        <md-table-row>
          <md-table-head md-numeric>ID</md-table-head>
          <md-table-head>Summary</md-table-head>
          <md-table-head>Duration (minutes)</md-table-head>
          <md-table-head>Created</md-table-head>
        </md-table-row>

        <md-table-row v-for="event in events" v-bind:key="event.id">
          <md-table-cell md-numeric>{{ event.id }}</md-table-cell>
          <md-table-cell>{{ event.summary }}</md-table-cell>
          <md-table-cell>{{ event.durationInMinutes }}</md-table-cell>
          <md-table-cell>{{ event.created }}</md-table-cell>
        </md-table-row>
      </md-table>

      <!-- hours counter -->
      <div>
        <span class="md-body-2">{{ dayCount.toFixed(2) }} day(s)</span>
      </div>
    </md-app-content>
  </md-app>
</template>

<script>
const HOURS_PER_DAY = 7;

export default {
  name: 'Home',
  data() {
    return {
      token: '',
      events: [],
      dayCount: 0
    }
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
    fetchEvents() {
      this.$gapi.getGapiClient().then(gapi => {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date('2020-08-01')).toISOString(),
          'timeMax': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          // 'maxResults': 10,
          'orderBy': 'startTime',
          'q': this.token
        }).then((response) => {
          this.events = response.result.items.filter(item => item.summary.indexOf(this.token) === 0)

          this.events = this.events.map(event => {
            const start = new Date(event.start.dateTime)
            const end = new Date(event.end.dateTime)

            event.durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);

            return event
          })

          const hourCout = this.events.reduce((counter, event) => {
            return counter + event.durationInMinutes
          }, 0)

          this.dayCount = hourCout / (60 * HOURS_PER_DAY)
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
