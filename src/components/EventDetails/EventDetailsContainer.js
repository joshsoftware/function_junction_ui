import React, { Component } from 'react';
import { Row, Col, Skeleton, Button, Icon, Divider, Affix, Input, Select } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';
import AddToCalendar from 'react-add-to-calendar';
import { fetchEventInitiated } from 'ACTION/eventAction';
import EventDetails from './EventDetails';
import Attendees from '../Attendees/';

import './EventDetails.scss';


const initialState = {
    loading: false,
    eventDetails: {},
    eventDetailsLoading: false,
    sidePanelLoading: false,
    isRegistered: false,
}

class EventDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { match } = this.props;
        this.props.fetchEventListInitiated(match.params.eventID);
        if (match.params.userID) {
            console.log("FETCH USER regiserd or not")
        }
    }
    
    getEventDetails = (event) => <EventDetails {...event} />;

    getEventDetailsContainers = ({ loading, event }) => (
        <div className="event-details-wrapper background">
            {!loading && this.getEventDetails(event)}
            {loading && <Skeleton active avatar paragraph={{rows: 5}} />}        
        </div>
    );

    handleAcceptInviteClick = () => {
        console.log("Clicked Accept Button");
    }

    handleDeclineEventClick = () => {
        console.log("Clicked Decline Button");
    }

    getRegisterButton = () => {
        const { match } = this.props;
        if (match.params.userID) {
            return <>
                <Row style={{ display: 'flex', justifyContent: "center", textAlign: 'center'}}>
                    <Col span={12} >
                        <Button
                            type="primary"
                            name="Accept"
                            icon="check"
                            onClick={this.handleAcceptInviteClick}
                            >
                            Accept
                        </Button>
                    </Col>
                    <Col span={12} >
                        <Button
                            type="danger"
                            name="Accept"
                            icon="stop"
                            onClick={this.handleDeclineEventClick}
                            >
                            Decline
                        </Button>
                    </Col>
                </Row>
            </>
        }
    }

    getAddToCalender = (startTime, endTime, title, description, location) => {
        let eventDate = moment(startTime);
        let todaysDate = moment();
        let diff = todaysDate.diff(eventDate, "days");
        console.log(diff)
        if (diff <= 0) {
            let event = {
                title,
                description,
                location,
                startTime,
                endTime
            }
            let items = [
                { google: 'Google Calender' },
                { outlook: 'Outlook' },
                { outlookcom: 'Outlook.com' },
                { yahoo: 'Yahoo' },
                { apple: 'Apple Calendar' },

             ];
             
            return (
                <Row>
                    <Col span={3}>
                        <Icon type="calendar" />
                    </Col>
                    <Col span={21} >
                        <AddToCalendar
                            event={event}
                            buttonLabel="Add to calendar"
                            listItems={items}
                        />
                    </Col>
                </Row>
            );
        }
        return (
            <Row>
                <Col span={3}>
                    <Icon type="calendar" />
                </Col>
                <Col span={21}>
                    <span style={{ color: 'red' }}>
                       
                    </span>
                </Col>
            </Row>
        );
    }

    getEventLocation = ({
        start_date_time,
        end_date_time,
        venue,
        title,
        description
    }) => (
        <>
        <Row>
            <Col span={3}>
                <Icon type="clock-circle" />
            </Col>
            <Col span={21}>
                <span>
                    {moment(start_date_time).format("DD, MMM YY hh:mm a")}
                </span>
                    <Divider type="vertical"/>
                <span>
                    {moment(end_date_time).format("DD, MMM YY hh:mm a")}
                </span>
            </Col>
        </Row>
        {this.getAddToCalender(start_date_time, end_date_time, title, description, venue)}
        <Row>
            <Col span={3}>
                <Icon type="home" />
            </Col>
            <Col span={21}>
                {venue}
            </Col>
        </Row>
        </>
    )

    getPanel = () => {
        const { isRegistered } =  this.state;
        const { event } = this.props;
        return (
            <>
                <div className="location">
                    {this.getEventLocation(event)}
                </div>
                { !isRegistered && this.getRegisterButton()}
                {isRegistered && <div className="success-text"> You are going</div>}
            </>
        );
    };

    getRightSidePanel = ({ loading }) => (
        <div className="right-panel background">
            {!loading && this.getPanel()}
            {loading && <Skeleton active />}
        </div>
    )

    getEvent = (props) => (
        <div className="event-details-container">
        <Row>
            <Col span={18}>
                {this.getEventDetailsContainers(props)}
            </Col>
            <Col span={6}>
                <Affix offsetTop={68}>
                    {this.getRightSidePanel(props)}
                </Affix>
            </Col>
        </Row>
        <Row>
            <Col span={18}>
                {this.props.event.id && <Attendees/> }
            </Col>
        </Row>
        </div>
    )

    render = () => {
        const { loading } = this.props;
        return (
            <>
            {loading && <Skeleton active paragraph={{ row: 3 }}/>}
            {!loading && this.getEvent(this.props)}
            </>
        )
}
}

function mapStateToProp({ event }) {
    return {
        event: event.data,
        loading: event.loading,
        error: event.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchEventListInitiated: (id) => dispatch(fetchEventInitiated(id))
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(EventDetailsContainer);