<template>
  <div>
    <p>Google Calendar API Quickstart</p>

    <!--Add buttons to initiate auth sequence and sign out-->
    <button v-if="!authorized" @click="handleAuthClick()">Authorize</button>
    <button v-if="authorized" @click="handleSignoutClick()">Sign Out</button>

    <div v-for="event in events" v-bind:key="event.id">
      {{ event }}
    </div>

    <pre id="content" style="white-space: pre-wrap;"></pre>
  </div>
</template>

<script>
// Client ID and API key from the Developer Console
const CLIENT_ID = '716599607292-rvhmhiq4jth1orikggk0ihjhnvh4cmcf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCS93f7DH1wgsZ6xtl28t9EiEVRCp3LHh8';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

export default {
  name: 'Home',
  data() {
    return {
      events: undefined,
      gapi: undefined,
      authorized: false
    }
  },
  created() {
    this.gapi = gapi; // eslint-disable-line
    this.handleClientLoad();
  },
  methods: {
    /**
     *  On load, called to load the auth2 library and API client library.
     */
    handleClientLoad() {
      this.gapi.load('client:auth2', this.initClient);
    },

    /**
     *  Initializes the API client library and sets up sign-in state
     *  listeners.
     */
    initClient() {
      this.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      }).then(() => {
        // Listen for sign-in state changes.
        this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

        // Handle the initial sign-in state.
        this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
      }, (error) => {
        this.appendPre(JSON.stringify(error, null, 2));
      });
    },

    /**
     *  Called when the signed in status changes, to update the UI
     *  appropriately. After a sign-in, the API is called.
     */
    updateSigninStatus(isSignedIn) {
      this.authorized = isSignedIn

      this.listUpcomingEvents();
    },

    /**
     *  Sign in the user upon button click.
     */
    handleAuthClick() {
      this.gapi.auth2.getAuthInstance().signIn();
    },

    /**
     *  Sign out the user upon button click.
     */
    handleSignoutClick() {
      this.gapi.auth2.getAuthInstance().signOut();
    },

    /**
     * Append a pre element to the body containing the given message
     * as its text node. Used to display the results of the API call.
     *
     * @param {string} message Text to be placed in pre element.
     */
    appendPre(message) {
      var pre = document.getElementById('content');
      var textContent = document.createTextNode(message + '\n');
      pre.appendChild(textContent);
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
        // this.appendPre('Upcoming events:');

        // if (events.length > 0) {
        //   for (let i = 0; i < events.length; i++) {
        //     var event = events[i];
        //     var when = event.start.dateTime;

        //     if (!when) {
        //       when = event.start.date;
        //     }

        //     this.appendPre(event.summary + ' (' + when + ')')
        //   }
        // } else {
        //   this.appendPre('No upcoming events found.');
        // }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
