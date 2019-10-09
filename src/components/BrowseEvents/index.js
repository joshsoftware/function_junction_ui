import React, { PureComponent } from 'react';
import { Row, Col, Empty, Skeleton, Tabs } from 'antd';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { fetchEventListInitiated } from 'ACTION/eventsAction';
import EventCard from '../../components/EventCard/EventCard';
import Slider from '../../components/Carousel';
import { getUser } from '../../actions/userDetailsAction';
import './BrowseEvents.scss';
import img1 from '../../5.png'
import img2 from '../../6.png'
import { getAscendingEvents, getDescendingEvents, getUpcomingEvents, getPastEvents } from '../../utils/util';

const items=[
    <img src={img1} alt="Josh Software" width="100%"/>,
    <img src={img2} alt="Josh Software" width="100%"/>,
 ]

class BrowseEvents extends PureComponent {
    componentDidMount () {
        getUser()
        .then(data => {
            localStorage.setItem('name', data.name);
            localStorage.setItem('email', data.email);
            localStorage.setItem('id', data.id);
        })
        .catch(error => {
            console.log(error)
        })
      this.props.fetchEventListInitiated();
    }

    getEventsCards = (eventList) => {
        const { isLoading } = this.props;
        if (isLoading) {
            return (
                <Row>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                    <Col lg={{ span: 7}} md={{span: 12}} className="loader">
                        <Skeleton active paragraph avatar />
                    </Col>
                </Row>
            )
        }
        if (!eventList || eventList.length === 0) {
            return <Empty description="No event found."/>;
        }
        return eventList.map(({id, title, description, ...rest}, index) => (
            <Col xl={8} md={12} xs={24} key={id}>
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
                <Tabs defaultActiveKey="1">
                    <Tabs.TabPane tab="Upcoming" key="1">
                        <div className="events">
                            <Row>
                                {this.getEventsCards(this.props.upcomingEvents)}
                            </Row>
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Past" key="2">
                        <div className="events">
                            <Row>
                                {this.getEventsCards(this.props.pastEvents)}
                            </Row>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        );
    }
}


const mapStateToProps = ({events: { data: events, isLoading }}) => {
    return {
        upcomingEvents: getAscendingEvents(getUpcomingEvents(events)),
        pastEvents: getDescendingEvents(getPastEvents(events)),
        isLoading
    }
}

const mapDispatchToProps = (dispatch) => ({
  fetchEventListInitiated: () => dispatch(fetchEventListInitiated()),
})

export default connect(mapStateToProps, mapDispatchToProps) (withCookies(BrowseEvents));
