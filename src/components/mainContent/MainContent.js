import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../config/routes';
import asyncComponent from '../../HOC/AsyncComponent';
import CreateEventContainer from '../createEventContainer';
import EventDetails from '../EventDetails';

const BrowseEvents = asyncComponent(() => import('../BrowseEvents'), 'BrowseEvents')

const upcomingEvents =() => <h1>Upcomming Events</h1>;
const myEvents =() => <h1>My Events</h1>;

class MainContent extends Component {
      render = () => (
        <div>
            <Switch>
                <Route exact path={routes.allEvents} component={BrowseEvents}/>
                <Route exact path={routes.upcomingEvents} component={upcomingEvents}/>
                <Route exact path={routes.myEvents} component={myEvents}/>
                <Route exact path={routes.createEvent} component={CreateEventContainer}/>
                <Route exact path={routes.eventDetails} component={EventDetails}/>
                <Route exact path={routes.eventDetailsInvite} component={EventDetails}/>
            </Switch>
        </div>
    )
}

export default MainContent;
