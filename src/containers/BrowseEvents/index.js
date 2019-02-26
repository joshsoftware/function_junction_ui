import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import EventCard from '../../components/EventCard/EventCard';

export class BrowseEvents extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    render() { 
        return (
            <Row gutter={20}>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
                <Col md={6} style={{ marginBottom: '15px' }}>
                    <EventCard/>
                </Col>
            </Row>
        );
    }
}
 
export default BrowseEvents;

