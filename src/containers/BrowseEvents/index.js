import React, { PureComponent } from 'react';
import EventCard from '../../components/EventCard/EventCard';

export class BrowseEvents extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() { 
        return (
            <div>
                <EventCard/>
            </div>
        );
    }
}
 
export default BrowseEvents;

