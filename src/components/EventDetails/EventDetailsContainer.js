import React, { Component } from 'react';
import { Row, Col, Skeleton, Button, Icon, Divider, Affix } from 'antd';
import moment from 'moment';
import EventDetails from './EventDetails';
import './EventDetails.scss';


const initialState = {
    loading: false,
    eventDetails: {},
    eventDetailsLoading: false,
    sidePanelLoading: false,
    isRegistered: false,
}

const eventDetails = {
    id: "5c73ec98081b3f4c67f7ef8d",
    title: "Women's day",
    description: "Non consequat ad officia excepteur do ea occaecat anim eu.Esse in do amet veniam do in id id veniam nulla magna aliqua.Ut eu minim pariatur mollit pariatur est proident veniam in exercitation sit mollit consectetur.",
    startDateTime: "2019-03-08T05:30:20+05:30",
    endDateTime: "2019-03-08T05:30:20+05:30",
    isShowcasable: true,
    isIndividualParticipation: false,
    createdBy: {
        name: 'Suhas More',
        id: '121212123-123-123-123-1231-'
    },
    maxSize: 1,
    minSize: 1,
    isPublished: true,
    venue: "Josh Software",
    createdAt: "2019-02-25T18:54:40.345+05:30",
    updatedAt: "0001-01-01T05:53:28+05:53",
    registerBefore: "2019-02-02T05:53:28+05:53"
}

class EventDetailsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const { match } = this.props;
        if (match.params.userID) {
            console.log("FETCH USER regiserd or not")
        }
    }
    
    getEventDetails = () => <EventDetails {...eventDetails} />;

    getEventDetailsContainers = ({ eventDetailsLoading }) => (
        <div className="event-details-wrapper background">
            {!eventDetailsLoading && this.getEventDetails()}
            {eventDetailsLoading && <Skeleton active avatar paragraph={{rows: 5}} />}        
        </div>
    );

    handleAcceptInviteClick = () => {

    }

    handleDeclineEventClick = () => {

    }

    getRegisterButton = () => {
        const { match } = this.props;
        console.log(match);
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

    getEventLocation = ({
        startDateTime,
        endDateTime,
        venue
    }) => (
        <>
        <Row>
            <Col span={3}>
                <Icon type="clock-circle" />
            </Col>
            <Col span={21}>
                <span>
                    {moment(startDateTime).format("ddd, MMM YY hh:mm a")}
                </span>
                    <Divider type="vertical"/>
                <span>
                    {moment(endDateTime).format("ddd, MMM YY hh:mm a")}
                </span>
            </Col>
        </Row>
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

        return (
            <>
                <div className="location">
                    {this.getEventLocation(eventDetails)}
                </div>
                { !isRegistered && this.getRegisterButton()}
                {isRegistered && <div className="success-text"> You are going</div>}
            </>
        );
    };

    getRightSidePanel = ({ sidePanelLoading }) => (
        <div className="right-panel background">
            {!sidePanelLoading && this.getPanel()}
            {sidePanelLoading && <Skeleton active />}
        </div>
    )


    render = () => (
        <div className="event-details-container">
            <Row>
                <Col span={18}>
                    {this.getEventDetailsContainers(this.state)}
                </Col>
                <Col span={6}>
                    <Affix offsetTop={68}>
                        {this.getRightSidePanel(this.state)}
                    </Affix>
                </Col>
            </Row>
            <Row>
                Test
            </Row>
        </div>
    )
}

export default EventDetailsContainer;