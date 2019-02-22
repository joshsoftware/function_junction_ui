import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../config/routes';

const AllEvents = () => <h1>All Events</h1>;
const upcomingEvents =() => <h1>Upcomming Events</h1>;
const myEvents =() => <h1>My Events</h1>;

class MainContent extends Component {
      render = () => (
        <div>
            <Switch>
                <Route exact path={routes.allEvents} component={AllEvents}/>
                <Route exact path={routes.upcomingEvents} component={upcomingEvents}/>
                <Route exact path={routes.myEvents} component={myEvents}/>
            </Switch>
        </div>
    )
}

export default MainContent;