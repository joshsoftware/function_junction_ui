import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from 'UTILS/routes';
import NoRoute from '../shared/NoRoute';
import CreateEventContainer from '../createEventContainer';
import EventDetails from '../EventDetails';
import BrowseEvents from '../BrowseEvents';

class MainContent extends Component {
      render = () => (
        <div>
            <Switch>
                <Route exact path={routes.allEvents} component={BrowseEvents}/>
                <Route exact path={routes.createEvent} component={CreateEventContainer}/>
                <Route exact path={routes.eventDetails} component={EventDetails}/>
                <Route exact path={routes.eventDetailsInvite} component={EventDetails}/>
                <Route exact path={routes.updateEvent} component={CreateEventContainer}/>
                <Route component={NoRoute}/>
            </Switch>
        </div>
    )
}

export default MainContent;
