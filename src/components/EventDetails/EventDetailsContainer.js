import React, { Component } from "react";
import {
  Row,
  Col,
  Skeleton,
  Button,
  Icon,
  Divider,
  Affix,
  Input,
  Select
} from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { fetchEventInitiated } from "../../actions/event";
import EventDetails from "./EventDetails";
import "./EventDetails.scss";
import CreateTeam from "./CreateTeam/CreateTeam";
import { validateEmail } from "../../utils/util";

const initialState = {
  loading: false,
  eventDetails: {},
  eventDetailsLoading: false,
  sidePanelLoading: false,
  isRegistered: false,
  isCreateTeamModalOpen: false
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

  getEventDetails = event => <EventDetails {...event} />;

  getEventDetailsContainers = ({ loading, event }) => (
    <div className="event-details-wrapper background">
      {!loading && this.getEventDetails(event)}
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
    console.log(this.props);
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

  getEventLocation = ({ startDateTime, endDateTime, venue }) => (
    <>
      <Row>
        <Col span={3}>
          <Icon type="clock-circle" />
        </Col>
        <Col span={21}>
          <span>{moment(startDateTime).format("DD, MMM YY hh:mm a")}</span>
          <Divider type="vertical" />
          <span>{moment(endDateTime).format("DD, MMM YY hh:mm a")}</span>
        </Col>
      </Row>
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
    console.log(event, "%%%%%%%%%");
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

  handleOkClick = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("Received values of form: ", values);
      form.resetFields();
      this.setState({ isCreateTeamModalOpen: false });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleEmailChange = (rule, values, callback) => {
    if (values) {
      const isValidEmail = values.reduce((isEmail, email) => {
        isEmail = validateEmail(email);
        return isEmail;
      }, true);
      if (!isValidEmail) {
        callback(true);
        return;
      }
    }
    callback();
  };

  getEvent = props => (
    <div className="event-details-container">
      <Row>
        <Col span={18}>{this.getEventDetailsContainers(props)}</Col>
        <Col span={6}>
          <Affix offsetTop={68}>
            {this.getRightSidePanel(props)}
            <div className="background create-team">
              <Button
                className="create-team-button"
                onClick={this.toggleCreateTeamModal}
              >
                <Icon type="usergroup-add" />
                Create Team
              </Button>
            </div>
          </Affix>
        </Col>
      </Row>
      <Row>Test</Row>
      {this.state.isCreateTeamModalOpen && (
        <CreateTeam
          handleClickOk={this.handleOkClick}
          handleClickCancel={this.toggleCreateTeamModal}
          wrappedComponentRef={this.saveFormRef}
          handleEmailChange={this.handleEmailChange}
        />
      )}
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

function mapStateToProp({ event }) {
  return {
    event: event.data,
    loading: event.loading,
    error: event.error
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEventListInitiated: id => dispatch(fetchEventInitiated(id))
  };
}

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(EventDetailsContainer);
