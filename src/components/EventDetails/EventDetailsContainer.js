import React, { Component } from "react";
import {
  Row,
  Col,
  Skeleton,
  Button,
  Icon,
  Divider,
  Affix,
} from "antd";
import { connect } from "react-redux";
import moment from "moment";
import AddToCalendar from 'react-add-to-calendar';
import { fetchEventInitiated } from "ACTION/eventAction";
import { fetchAttendeesInitiated, addTeamMemberInitiated, createTeamInitiated } from 'ACTION/attendeesAction';
import EventDetails from "./EventDetails";
import "./EventDetails.scss";
import { ShowTeam } from './Team/Show';
import CreateTeam from './Team/Create';
import ShowMembers from './Members/Show';
import Attendees from '../Attendees/';

const initialState = {
  loading: false,
  eventDetails: {},
  eventDetailsLoading: false,
  sidePanelLoading: false,
  isRegistered: false,
  isCreateTeamModalOpen: false,
};

class EventDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchEventListInitiated(match.params.eventID);
    if (match.params.userID) {
      console.log("FETCH USER regiserd or not");
    }
  }

  getEventDetails = (event, history) => <EventDetails {...event} {...history} />;

  getAddToCalender = (startTime, endTime, title, description, location) => {
        let eventDate = moment(startTime);
        let todaysDate = moment();
        let diff = todaysDate.diff(eventDate, "days");
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
                       Past Event
                    </span>
                </Col>
            </Row>
        );
    }

  getEventDetailsContainers = ({ loading, event, history }) => (
    <div className="event-details-wrapper background">
      {!loading && this.getEventDetails(event, history)}
      {loading && <Skeleton active avatar paragraph={{ rows: 5 }} />}
    </div>
  );

  handleAcceptInviteClick = () => {
    console.log("Clicked Accept Button");
  };

  handleDeclineEventClick = () => {
    console.log("Clicked Decline Button");
  };

  toggleCreateTeamModal = () => {
    this.setState(oldState => {
      return {
        isCreateTeamModalOpen: !oldState.isCreateTeamModalOpen
      };
    });
  };

  getRegisterButton = () => {
    const { match } = this.props;
    if (match.params.userID) {
      return (
        <>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center"
            }}
          >
            <Col span={12}>
              <Button
                type="primary"
                name="Accept"
                icon="check"
                onClick={this.handleAcceptInviteClick}
              >
                Accept
              </Button>
            </Col>
            <Col span={12}>
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
      );
    }
  };

  getEventLocation = ({ start_date_time, end_date_time, title, description, venue }) => (
    <>
      <Row>
        <Col span={3}>
          <Icon type="clock-circle" />
        </Col>
        <Col span={21}>
          <span>{moment(start_date_time).format("DD, MMM YY hh:mm a")}</span>
          <Divider type="vertical" />
          <span>{moment(end_date_time).format("DD, MMM YY hh:mm a")}</span>
        </Col>
      </Row>
      {this.getAddToCalender(start_date_time, end_date_time, title, description, venue)}
      <Row>
        <Col span={3}>
          <Icon type="home" />
        </Col>
        <Col span={21}>{venue}</Col>
      </Row>
    </>
  );

  getPanel = () => {
    const { isRegistered } = this.state;
    const { event } = this.props;
    return (
      <>
        <div className="location">{this.getEventLocation(event)}</div>
        {!isRegistered && this.getRegisterButton()}
        {isRegistered && <div className="success-text"> You are going</div>}
      </>
    );
  };

  getRightSidePanel = ({ loading }) => (
    <div className="right-panel background">
      {!loading && this.getPanel()}
      {loading && <Skeleton active />}
    </div>
  );

  handleCreateTeam = (createFormValues) => {
    this.props.createTeamInitiated({
      ...createFormValues,
      eventId: this.props.event.id,
    }); 
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  sendInvites = (emailIds) => {
    const team = {...this.props.attendees.teams[0]}
    this.props.addTeamMemberInitiated({emailIds, eventId: this.props.event.id, teamId: team.id});
  }

  handleTeamChange = (value, field) => {
    const team = {...this.props.attendees.teams[0]};
    team[field] = value;
    this.setState({ team });
  }

  getEvent = props => (
    <div className="event-details-container">
      <Row>
        <Col span={18}>
          {this.getEventDetailsContainers(props)}
          <Row>
        <Col span={24} >
          <Attendees
            event={props.event}
            getAttendees={props.getAttendees}
          />
        </Col>
      </Row>
        </Col>
        <Col span={6}>
          <Affix offsetTop={68}>
            {this.getRightSidePanel(props)}
            <div className="background">
              {
                this.props.attendees && this.props.attendees.teams ?
                <>
                  <ShowTeam
                    team={this.props.attendees.teams[0]}
                    isShowcasable={this.props.event.is_showcasable}
                    handleTeamChange={this.handleTeamChange}
                  />
                  <ShowMembers
                    members={this.props.attendees.teams[0].members || []}
                    sendInvites={this.sendInvites}
                  />
                </>
                :
                !props.event.isIndividualParticipation &&
                  <CreateTeam
                    action='Create'
                    handleSubmit={this.handleCreateTeam}
                    isShowcasable={this.props.event.is_showcasable}
                  />
              }
            </div>
          </Affix>
        </Col>
      </Row>
    </div>
  );

  render = () => {
    const { loading, event } = this.props;
    return (
      <>
        {/* {loading && <Skeleton active />} */}
        {!loading && this.getEvent(this.props)}
      </>
    );
  };
}

function mapStateToProp({ event, attendees }, ownProps) {
  return {
    event: event.data,
    attendees: attendees.data,
    loading: event.loading,
    error: event.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEventListInitiated: id => dispatch(fetchEventInitiated(id)),
    createTeamInitiated: data => dispatch(createTeamInitiated(data)),
    getAttendees: eventID => dispatch(fetchAttendeesInitiated(eventID)),
    addTeamMemberInitiated: payload => dispatch(addTeamMemberInitiated(payload))
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(EventDetailsContainer);
