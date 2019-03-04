const routes = {
    root: '/',
    allEvents: '/',
    upcomingEvents: '/upcoming-events',
    myEvents: '/my-events',
    createEvent: '/create-event',
    updateEvent: '/update/:id',

    eventDetails: '/event-details/:eventID',
    eventDetailsInvite: '/event-details/:eventID/:userID'
}

export default routes;
