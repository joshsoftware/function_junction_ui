import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchAttendeesSuccess,
  fetchAttendeesFailed,
  createTeamSuccess,
  createTeamFail,
  updateTeamSuccess,
  updateTeamFail,
  deleteTeamSuccess,
  deleteTeamFail,
  addTeamMemberSuccess,
  addTeamMemberFail,
  registerParticipantSuccess,
  registerParticipantFail,
  invitationAcceptRejectSuccess,
  invitationAcceptRejectFail,
  rsvpRejectSuccess,
  rsvpRejectFail
} from "ACTION/attendeesAction";
import {
  FETCH_ATTENDEES_INITIATED,
  ADD_TEAM_MEMBER_INITIATED,
  CREATE_TEAM_INITIATED,
  UPDATE_TEAM_INITIATED,
  DELETE_TEAM_INITIATED,
  REGISTER_PARTICIPANT_INITIATED,
  INVITATION_ACCEPT_REJECT_INITIATED,
  RSVP_REJECT
} from "UTILS/constants";
import RequestHandler from "../HTTP";
import {
  showFailureNotification,
  showSuccessNotification
} from "../components/shared/Notification";

function* fetchAttendees(action) {
  try {
    const response = yield call(() =>
      RequestHandler.get(`events/${action.payload}/teams`)
    );
    yield put(fetchAttendeesSuccess(response));
  } catch (error) {
    yield put(fetchAttendeesFailed(error));
  }
}

function* addTeamMember(action) {
  try {
    const response = yield call(() =>
      RequestHandler.post(
        `events/${action.payload.eventId}/teams/${
          action.payload.teamId
        }/team_members`,
        { emails: action.payload.emailIds }
      )
    );
    // const data = yield call(() => response.json.bind(response)());
    if (response.failed_emails && response.failed_emails.length) {
      showFailureNotification(
        `Failed to send invitation to following user :\n${response.failed_emails.join(
          ", "
        )}`
      );
    } else {
      showSuccessNotification("Invitation Sent Successfully.");
    }
    yield put(
      addTeamMemberSuccess({
        failedEmails: response.failed_emails,
        eventDetails: action.payload
      })
    );
  } catch (error) {
    yield put(addTeamMemberFail(error.message));
  }
}

function* createTeam(action) {
  try {
    const eventId = action.payload.eventId;
    delete action.payload.eventId;
    const response = yield call(() =>
      RequestHandler.post(`events/${eventId}/teams`, action.payload)
    );
    showSuccessNotification("Team Created Successfully.");
    yield put(createTeamSuccess(response.team));
  } catch (error) {
    yield put(createTeamFail(error));
  }
}

function* updateTeam(action) {
  try {
    const response = yield call(() =>
      RequestHandler.put(
        `events/${action.payload.eventId}/teams/${action.payload.teamId}`,
        action.payload.team
      )
    );
    showSuccessNotification("Update Team Successful.");
    yield put(updateTeamSuccess(response.team));
  } catch (error) {
    yield put(updateTeamFail(error.message));
  }
}

function* deleteTeam(action) {
  try {
    const response = yield call(() =>
      RequestHandler.delete(
        `events/${action.payload.eventId}/teams/${action.payload.teamId}`
      )
    );
    showSuccessNotification("Delete Teams Successful.");
    yield put(deleteTeamSuccess(response));
  } catch (error) {
    yield put(deleteTeamFail(error));
  }
}

// RSVP
function* registerParticipant(action) {
  try {
    const response = yield call(() =>
      RequestHandler.post(`events/${action.payload.eventId}/rsvp`)
    );
    yield put(registerParticipantSuccess(response));
  } catch (error) {
    yield put(registerParticipantFail(error));
  }
}

// invitation accept or reject
function* inviteAcceptReject(action) {
  const eventId = action.payload.eventId;
  const teamId = action.payload.teamId;
  const teamMemberId = action.payload.userId;
  try {
    const response = yield call(() => {
      RequestHandler.put(
        `events/${eventId}/teams/${teamId}/team_members/${teamMemberId}`,
        { status: action.payload.value }
      );
    });
    yield put(
      invitationAcceptRejectSuccess({
        teamId: teamId,
        status: action.payload.value
      })
    );
  } catch (error) {
    console.log("PRinting error:", error);
    yield put(invitationAcceptRejectFail(error));
  }
}

function* rsvpReject(action) {
  try {
    const response = yield call(() =>
      RequestHandler.get(`events/${action.payload.eventId}/no`)
    );
    yield put(rsvpRejectSuccess({ rsvpCancelled: true }));
  } catch (error) {
    yield put(rsvpRejectFail(error));
  }
}

export default function* attendeesSaga() {
  yield takeEvery(FETCH_ATTENDEES_INITIATED, fetchAttendees);
  yield takeEvery(ADD_TEAM_MEMBER_INITIATED, addTeamMember);
  yield takeEvery(CREATE_TEAM_INITIATED, createTeam);
  yield takeEvery(UPDATE_TEAM_INITIATED, updateTeam);
  yield takeEvery(DELETE_TEAM_INITIATED, deleteTeam);
  yield takeEvery(REGISTER_PARTICIPANT_INITIATED, registerParticipant);
  yield takeEvery(INVITATION_ACCEPT_REJECT_INITIATED, inviteAcceptReject);
  yield takeEvery(RSVP_REJECT, rsvpReject);
}
