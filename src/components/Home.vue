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
      <div class="md-layout md-gutter md-alignment-center-left">
        <!-- token query -->
        <div class="md-layout-item md-size-25 md-xsmall-size-100">
          <md-field>
            <label>Token</label>
            <md-input
              v-model="token"
              @keypress.enter="fetchEvents()"
            ></md-input>
          </md-field>
        </div>

        <!-- from date selector -->
        <div class="md-layout-item md-size-25 md-xsmall-size-100">
          <md-datepicker
            v-model="fromDate"
            @md-closed="fetchEvents()"
          >
            <label>From date</label>
          </md-datepicker>
        </div>

        <!-- hours counter -->
        <div v-if="dayCount" class="md-layout-item md-size-50 md-xsmall-size-100 text-right">
          <span class="md-display-1">{{ dayCount.toFixed(2) }} day{{ dayCount > 1 ? 's' : '' }}</span>
        </div>
      </div>

      <!-- event list -->
      <md-table v-if="dayCount">
        <md-table-row>
          <md-table-head>ID</md-table-head>
          <md-table-head>Summary</md-table-head>
          <md-table-head>Duration (minutes)</md-table-head>
          <md-table-head>Created</md-table-head>
        </md-table-row>

        <md-table-row v-for="event in events" v-bind:key="event.id">
          <md-table-cell>{{ event.id }}</md-table-cell>
          <md-table-cell>{{ event.summary }}</md-table-cell>
          <md-table-cell>{{ event.durationInMinutes }}</md-table-cell>
          <md-table-cell>{{ event.created }}</md-table-cell>
        </md-table-row>
      </md-table>
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
      dayCount: 0,
      fromDate: new Date('2020-01-01')
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
          'timeMin': this.fromDate.toISOString(),
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

          const minutesCount = this.events.reduce((counter, event) => {
            return counter + event.durationInMinutes
          }, 0)

          this.dayCount = minutesCount / (60 * HOURS_PER_DAY)
        });
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text-right {
    text-align: right;
  }
</style>
