(function () {
    // Your Client ID can be retrieved from your project in the Google
    // Developer Console, https://console.developers.google.com
    var CLIENT_ID = '459689694442-76vdko9sc1euhmc41adhsn1frpgrcuhg.apps.googleusercontent.com',
        SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

    //
    $('#authorize-div').hide();

    /**
     * Check if current user has authorized this application.
     */
    window.checkAuth = function () {
        gapi.auth.authorize(
            {
                'client_id': CLIENT_ID,
                'scope': SCOPES.join(' '),
                'immediate': true
            },
            handleAuthResult
        );
    };

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {
        var authorizeDiv = $('#authorize-div');

        if (authResult && !authResult.error) {
            // Hide auth UI, then load client library.
            authorizeDiv.hide();
            loadCalendarApi();
        } else {
            // Show auth UI, allowing the user to initiate authorization by
            // clicking authorize button.
            authorizeDiv.show();
        }
    }

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    function handleAuthClick(event) {
        gapi.auth.authorize(
            {
                client_id: CLIENT_ID,
                scope: SCOPES,
                immediate: false
            },
            handleAuthResult
        );

        return false;
    }

    /**
     * Load Google Calendar client library. List upcoming events
     * once client library is loaded.
     */
    function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', listUpcomingEvents);
    }

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    function listUpcomingEvents() {
        gapi.client.calendar.events.list({
            'calendarId': 'lce4t8mjgvv5r3ms6g5ldhimb4@group.calendar.google.com',
            // 'timeMin': (new Date('2016-01-01')).toISOString(),
            'timeMax': (new Date()).toISOString(),
            'showDeleted': false,
            'singleEvents': true,
            'orderBy': 'startTime'
        })
        .execute(function (data) {
            var events = data.items.filter(function (event) {
                return /^cr[eé]azap/i.test(event.summary);
            });

            appendPre('Upcoming events:');

            if (events.length > 0) {
                var totalDuration = moment.duration(0);

                for (var i = 0; i < events.length; i++) {
                    var event = events[i],
                        when = event.start.dateTime,
                        duration;

                    if (when) {
                        duration = computeDuration(event);

                        totalDuration.add(duration);
                    }

                    appendPre(event.summary + ' (' + duration.humanize() + ')');
                }

                appendPre('Total duration: ' + totalDuration.asHours() + ' hours');
                appendPre('Working days: ' + totalDuration.asHours() / 8 + ' days');
            } else {
                appendPre('No upcoming events found.');
            }
        });
    }

    function computeDuration(event) {
        if (!event.start.dateTime) {
            console.error('Missing start date time');
            return;
        }

        var start = moment(event.start.dateTime),
            end = moment(event.end.dateTime);

        return moment.duration(end.diff(start));
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }

    // handlers
    $('#authorize-button').on('click', function (event) {
        handleAuthClick(event);
    });
}());