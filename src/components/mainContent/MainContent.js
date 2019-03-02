import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../config/routes';
// import asyncComponent from '../../HOC/AsyncComponent';
import CreateEventContainer from '../createEventContainer';
import BrowseEvents from '../BrowseEvents';

class MainContent extends Component {
      render = () => (
        <div>
            <Switch>
                <Route exact path={routes.allEvents} component={BrowseEvents}/>
                <Route exact path={routes.createEvent} component={CreateEventContainer}/>
                <Route exact path={routes.updateEvent} component={CreateEventContainer}/>
            </Switch>
        </div>
    )
}

export default MainContent;
