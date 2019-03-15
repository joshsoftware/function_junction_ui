const routes = {
    root: '/functions/',
    allEvents: '/functions/',
    upcomingEvents: '/functions/upcoming-events',
    myEvents: '/functions/my-events',
    createEvent: '/functions/create-event',
    updateEvent: '/functions/update/:id',

    eventDetails: '/functions/event-details/:eventID',
    eventDetailsInvite: '/functions/event-details/:eventID/:userID'
}

export default routes;
