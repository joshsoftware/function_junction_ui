import React, { Component } from 'react';
import { Row, Col, Skeleton, Button, Icon, Divider, Affix, Modal } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import moment from 'moment';
import AddToCalendar from 'react-add-to-calendar';
import { fetchEventInitiated } from 'ACTION/eventAction';
import {
  fetchAttendeesInitiated,
  addTeamMemberInitiated,
  createTeamInitiated,
  deleteTeamInitiated,
  updateTeamInitiated,
  registerParticipantInitiated,
  invitationAcceptRejectInitiated
} from 'ACTION/attendeesAction';
import { getUser } from 'ACTION/userDetailsAction';
import IndividualRegistration from './IndividualParticipation';
import Invitations from './Team/Invitations';
import EventDetails from './EventDetails';
import './EventDetails.scss';
import { ShowTeam } from './Team/Show';
import CreateTeam from './Team/Create';
import ShowMembers from './Members/Show';
import Attendees from '../Attendees/';
import { isObjectEmpty, isOldEvent } from '../../utils/util';
import { MEMBER_INVITE_STATUS } from '../../utils/constants';
import ErrorBoundary from '../shared/ErrorBoundary';

const initialState = {
  loading: false,
  eventDetails: {},
  eventDetailsLoading: false,
  sidePanelLoading: false,
  isRegistered: false,
  isInvitationModalOpen: false
};

class EventDetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { match } = this.props;
    getUser()
      .then(data => {
        localStorage.setItem('user', data.id);
      })
      .catch(error => {
        console.log(error);
      });
    this.props.fetchEventInitiated(match.params.eventID);
  }

  componentDidUpdate(prevProps) {
    if (isObjectEmpty(prevProps.event) && !isObjectEmpty(this.props.event)) {
      this.props.getAttendees(this.props.event.id);
    }
  }

  getEventDetails = (event, history) => (
    <EventDetails {...event} {...history} />
  );

  getAddToCalender = (startTime, endTime, title, description, location) => {
    let eventDate = moment(startTime);
    let todaysDate = moment();
    let diff = todaysDate.diff(eventDate, 'days');
    if (diff <= 0) {
      let event = {
        title,
        description,
        location,
        startTime,
        endTime
      };
      let items = [
        { google: 'Google Calender' },
        { outlook: 'Outlook' },
        { outlookcom: 'Outlook.com' },
        { yahoo: 'Yahoo' },
        { apple: 'Apple Calendar' }
      ];

      return (
        <Row>
          <Col span={3}>
            <Icon type='calendar' />
          </Col>
          <Col span={21}>
            <AddToCalendar
              event={event}
              buttonLabel='Add to calendar'
              listItems={items}
            />
          </Col>
        </Row>
      );
    }
    let endDiff = moment(endTime).diff(todaysDate, 'minute');
    const isHappening = endDiff>=0;
    return (
      <Row>
        <Col span={3}>
          <Icon type='calendar' />
        </Col>
        <Col span={21}>
          <span style={{ color: isHappening? 'green' : 'red' }}>{isHappening? 'Happening...':'Past Event'}</span>
        </Col>
      </Row>
    );
  };

  getEventDetailsContainers = ({ loading, event, history }) => (
    <div className='event-details-wrapper background'>
      {!loading && this.getEventDetails(event, history)}
      {loading && <Skeleton active avatar paragraph={{ rows: 5 }} />}
    </div>
  );

  handleAcceptInviteClick = () => {
    console.log('Clicked Accept Button');
  };

  handleDeclineEventClick = () => {
    console.log('Clicked Decline Button');
  };

  toggleInvitationModal = () => {
    this.setState(oldState => {
      return {
        isInvitationModalOpen: !oldState.isInvitationModalOpen
      };
    });
  };

  getRegisterButton = () => {
    const { match } = this.props;
    if (match.params.userID) {
      return (
        <ErrorBoundary name="Accept Button">
          <Row
            style={{
              display: 'flex',
              justifyContent: 'center',
              textAlign: 'center'
            }}
          >
            <Col span={12}>
              <Button
                type='primary'
                name='Accept'
                icon='check'
                onClick={this.handleAcceptInviteClick}
              >
                Accept
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type='danger'
                name='Accept'
                icon='stop'
                onClick={this.handleDeclineEventClick}
              >
                Decline
              </Button>
            </Col>
          </Row>
        </ErrorBoundary>
      );
    }
  };

  getEventLocation = ({
    start_date_time,
    end_date_time,
    title,
    description,
    venue
  }) => (
    <ErrorBoundary name="Event location">
      <Row>
        <Col span={3}>
          <Icon type='clock-circle' />
        </Col>
        <Col span={21}>
          <span>{moment(start_date_time).format('DD, MMM YY hh:mm a')}</span>
          <Divider type='vertical' />
          <span>{moment(end_date_time).format('DD, MMM YY hh:mm a')}</span>
        </Col>
      </Row>
      {this.getAddToCalender(
        start_date_time,
        end_date_time,
        title,
        description,
        venue
      )}
      <Row>
        <Col span={3}>
          <Icon type='home' />
        </Col>
        <Col span={21}>{venue}</Col>
      </Row>
    </ErrorBoundary>
  );

  getPanel = () => {
    const { isRegistered } = this.state;
    const { event } = this.props;
    return (
      <>
        <div className='location'>{this.getEventLocation(event)}</div>
        {!isRegistered && this.getRegisterButton()}
        {isRegistered && <div className='success-text'> You are going</div>}
      </>
    );
  };

  getRightSidePanel = ({ loading }) => (
    <div className='right-panel background'>
      {!loading && this.getPanel()}
      {loading && <Skeleton active />}
    </div>
  );

  handleCreateTeam = createFormValues => {
    this.props.createTeamInitiated({
      ...createFormValues,
      eventId: this.props.event.id
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  sendInvites = emailIds => {
    const team = this.props.myTeam;
    this.props.addTeamMemberInitiated({
      emailIds,
      eventId: this.props.event.id,
      teamId: team.id
    });
  };

  handleTeamChange = (value, field) => {
    const team = this.props.myTeam;
    team[field] = value;
    this.props.updateTeamInitiated({
      eventId: this.props.event.id,
      teamId: this.props.myTeam.id,
      team
    });
  };

  handleDeleteTeam = teamId => {
    this.props.deleteTeamInitiated({
      eventId: this.props.event.id,
      teamId: this.props.myTeam.id
    });
  };

  handleRSVPClick = () => {
    const payLoad = {
      eventId: this.props.event.id
    };
    this.props.registerIndividualParticipation(payLoad);
  };

  handleAcceptReject = (value, teamId, memberId) => {
    const payload = {
      eventId: this.props.event.id,
      teamId,
      userId: /* localStorage.getItem('user') */memberId,
      value: value
        ? MEMBER_INVITE_STATUS.ACCEPTED
        : MEMBER_INVITE_STATUS.REJECTED
    };
    this.props.invitationAcceptRejectInitiated(payload);
  };

  renderTeam = () => {
    const {
      event,
      attendees,
      attendeesLoading,
      loading,
      rsvpLoading,
      rsvpError,
      rsvp,
      myTeam,
      invitations,
      isInviteLoading
    } = this.props;
    const {
      is_individual_participation,
      is_showcasable,
      end_date_time,
      register_before,
      is_attending
    } = event;
    const isPastEvent = isOldEvent(end_date_time);
    // If loading
    if (loading || attendeesLoading) {
      return <Skeleton paragraph active />;
    }

    // If individual event
    if (is_individual_participation) {
      return (
        <ErrorBoundary name="RSVP button">
          <IndividualRegistration
            attending={is_attending}
            handleRSVPClick={this.handleRSVPClick}
            isPastEvent={isPastEvent}
            loading={rsvpLoading}
            error={rsvpError}
            rsvp={rsvp}
          />
        </ErrorBoundary>
      );
    }

    if (!is_individual_participation) {
      if (attendees && attendees.teams && myTeam) {
        return (
          <>
            <ErrorBoundary name="Show Team Name">
            <ShowTeam
              team={myTeam}
              isShowcasable={is_showcasable}
              handleTeamChange={this.handleTeamChange}
              handleDeleteTeam={this.handleDeleteTeam}
              isPastEvent={isPastEvent}
            />
            </ErrorBoundary>
            <ErrorBoundary name="Team Members">
              <ShowMembers
                members={myTeam.members}
                sendInvites={this.sendInvites}
                isPastEvent={isPastEvent}
              />
            </ErrorBoundary>
          </>
        );
      }

      if (invitations && invitations.length && !isPastEvent) {
        return (
          <ErrorBoundary name="Invitations">
            <div className='view-invitations'>
              <div className='animating-text'>You have new invites!</div>
              <Button
                type='primary'
                name='viewInvites'
                className='view-invite-button'
                onClick={this.toggleInvitationModal}
              >
                View Invites
              </Button>
              <Invitations
                visible={this.state.isInvitationModalOpen}
                invites={invitations}
                isLoading={isInviteLoading}
                toggleModal={this.toggleInvitationModal}
                handleAcceptReject={this.handleAcceptReject}
              />
            </div>
            </ErrorBoundary>
        );
      }
      return (
        <ErrorBoundary name="Create Team">
          <CreateTeam
            action='Create'
            handleSubmit={this.handleCreateTeam}
            isPastEvent={isPastEvent}
            isShowcasable={is_showcasable}
          />
        </ErrorBoundary>
      );
    }
  };
  getBackgroundClass = () => {
    const { event } = this.props;
    if (!event) {
      return 'background';
    }
    if (isOldEvent(event.end_date_time)) {
      return 'background disabled-b';
    }
    return 'background';
  };

  getEvent = props => (
    <div className='event-details-container'>
      <Row>
        <Col lg={{span: 18}}  >
          {this.getEventDetailsContainers(props)}
          <Row>
            <Col span={24}>
              <ErrorBoundary name="Attendees Container">
                <Attendees
                  type={props.event.is_individual_participation}
                  attendees={props.attendees.teams}
                />
              </ErrorBoundary>
            </Col>
          </Row>
        </Col>
        <Col lg={{span: 6}} >
          <Affix offsetTop={68}>
            {this.getRightSidePanel(props)}
            <div className={this.getBackgroundClass()}>{this.renderTeam()}</div>
          </Affix>
        </Col>
      </Row>
    </div>
  );

  render = () => {
    const { loading } = this.props;
    const LoaderContainer = styled.div`
      margin: 9% 0%;
      padding: 1% 1%;
      background: white;
    `;
    return (
      <>
        {loading && (
          <LoaderContainer>
            <Skeleton active avatar />
          </LoaderContainer>
        )}
        {!loading && this.getEvent(this.props)}
      </>
    );
  };
}

function mapStateToProp(state, ownProps) {
  return {
    event: state.event.data,
    attendees: state.attendees,
    invitations: state.attendees.invitations,
    isInviteLoading: state.attendees.isInviteLoading,
    myTeam: state.attendees.myTeam,
    attendeesLoading: state.attendees.isLoading,
    loading: state.event.isLoading,
    error: state.event.error,

    rsvpLoading: state.attendees.rsvpLoading,
    rsvpError: state.attendees.rsvpError,
    rsvp: state.attendees.rsvp
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEventInitiated: id => dispatch(fetchEventInitiated(id)),
    createTeamInitiated: data => dispatch(createTeamInitiated(data)),
    getAttendees: eventID => dispatch(fetchAttendeesInitiated(eventID)),
    addTeamMemberInitiated: payload =>
      dispatch(addTeamMemberInitiated(payload)),
    deleteTeamInitiated: teamId => dispatch(deleteTeamInitiated(teamId)),
    updateTeamInitiated: payload => dispatch(updateTeamInitiated(payload)),
    registerIndividualParticipation: payload =>
      dispatch(registerParticipantInitiated(payload)),
    invitationAcceptRejectInitiated: payload =>
      dispatch(invitationAcceptRejectInitiated(payload))
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(EventDetailsContainer);
