import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import EventCard from '../../components/EventCard/EventCard';
import Slider from '../../components/Carousel';
import './BrowseEvents.scss';
const items=[
    <img src="/assets/img/1.jpg" alt="1" width="100%"/>,
    <img src="/assets/img/2.jpg" alt="2" width="100%"/>,
    <img src="/assets/img/3.jpg" alt="3" width="100%"/>,
    <img src="/assets/img/4.jpg" alt="4" width="100%"/>,
 ]

 const EVENTS = [
     {
        title: "Web Security",
        desc: "This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
     },
     {
        title: "Web Security",
        desc: "This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
     },
     {
        title: "Web Security",
        desc: "This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
     },
     {
        title: "Web Security",
        desc: "This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
     },
     {
        title: "Web Security",
        desc: "This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh This event is organized internally by Josh"
     },
 ]
export class BrowseEvents extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getEventsCards = () => {
        return EVENTS.map(({title, desc}) => (
            <Col md={6}>
                <EventCard
                    title={title}
                    desc={desc}
                    className="card-container"
                />
            </Col>
        ));
    };

    render() { 
        return (
            
            <div className="container">
                <div className="slider">
                    <Slider items={items}/>
                </div>
                <div className="events">
                    <Row gutter={20}>
                        {this.getEventsCards()}
                    </Row>
                </div>
            </div>
        );
    }
}
 
export default BrowseEvents;

