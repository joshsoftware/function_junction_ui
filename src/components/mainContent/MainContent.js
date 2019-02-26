import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../../config/routes';
import asyncComponent from '../../HOC/AsyncComponent';
import Slider from '../app/Carousel';
import CreateEventContainer from '../../containers/createEventContainer';

const BrowseEvents = asyncComponent(() => import('../../containers/BrowseEvents'), 'BrowseEvents')

const items=[
    <img src="/assets/img/1.jpg" alt="1"/>,
    <img src="/assets/img/2.jpg" alt="2"/>,
    <img src="/assets/img/3.jpg" alt="3"/>,
    <img src="/assets/img/4.jpg" alt="4"/>,
 ]

const AllEvents = () => <Slider items={items}/>;
const upcomingEvents =() => <h1>Upcomming Events</h1>;
const myEvents =() => <h1>My Events</h1>;

class MainContent extends Component {
      render = () => (
        <div>
            <Switch>
                <Route exact path={routes.allEvents} component={BrowseEvents}/>
                <Route exact path={routes.upcomingEvents} component={AllEvents}/>
                <Route exact path={routes.myEvents} component={myEvents}/>
                <Route exact path={routes.createEvent} component={CreateEventContainer}/>
            </Switch>
        </div>
    )
}

export default MainContent;
