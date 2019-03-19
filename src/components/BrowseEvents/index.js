import React, { PureComponent } from 'react';
import { Row, Col, Empty } from 'antd';
import { connect } from 'react-redux';

import { fetchEventListInitiated } from 'ACTION/eventsAction';
import EventCard from '../../components/EventCard/EventCard';
import Slider from '../../components/Carousel';

import './BrowseEvents.scss';

const items=[
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//8d8a56/django/images/homepage/bg-desktop-snowglobe.jpg" alt="1" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//8b6c63/django/images/homepage/bg-desktop-generationdiy.jpg" alt="2" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//054546/django/images/homepage/bg-desktop-wanderlust.jpg" alt="3" width="100%"/>,
    <img src="https://cdn.evbstatic.com/s3-build/perm_001//b41172/django/images/homepage/bg-desktop-rapoport.jpg" alt="4" width="100%"/>,
 ]

class BrowseEvents extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount () {
      this.props.fetchEventListInitiated();
    }

    getEventsCards = () => {
        const { events: { data } } = this.props;
        if (!data || data.length === 0) {
            return <Empty description="No events found."/>;
        }
        return data.map(({id, title, description, ...rest}, index) => (
            <Col md={8} key={id}>
                <EventCard
                    title={title}
                    desc={description}
                    className="card-container"
                    id={id}
                    {...rest}
                    {...this.props}
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
                    <Row>
                      {this.getEventsCards()}
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  events: state.events,
})

const mapDispatchToProps = (dispatch) => ({
  fetchEventListInitiated: () => dispatch(fetchEventListInitiated()),
})

export default connect(mapStateToProps, mapDispatchToProps) (BrowseEvents);
