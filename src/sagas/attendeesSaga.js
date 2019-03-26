import { call, put, takeEvery } from 'redux-saga/effects';
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
} from 'ACTION/attendeesAction';
import {
  FETCH_ATTENDEES_INITIATED,
  ADD_TEAM_MEMBER_INITIATED,
  CREATE_TEAM_INITIATED,
  UPDATE_TEAM_INITIATED,
  DELETE_TEAM_INITIATED,
  REGISTER_PARTICIPANT_INITIATED,
} from 'UTILS/constants';
import RequestHandler from '../HTTP';

function* fetchAttendees(action) {
    try {
      const response = yield call(() => RequestHandler.get(
        `events/${action.payload}/teams`,
      ));
      yield put(fetchAttendeesSuccess(response));
    } catch (error) {
      yield put(fetchAttendeesFailed(error));
    }
  }
  
function* addTeamMember(action) {
  try {
    const response = yield call(() => RequestHandler.post(
      `events/${action.payload.eventId}/teams/${action.payload.teamId}/team_members`,
      {emails: action.payload.emailIds} 
    ));
    // const data = yield call(() => response.json.bind(response)());
    yield put(addTeamMemberSuccess({ failedEmails: response.failed_emails, eventDetails: action.payload }));
  } catch(error) {
    yield put(addTeamMemberFail(error.message));
  }
}

function* createTeam(action) {
  try {
    const eventId = action.payload.eventId;
    delete action.payload.eventId;
    const response = yield call(() => RequestHandler.post(
      `events/${eventId}/teams`,
      action.payload,
    ))
    // const data = yield call(() => response.json.bind(response));
    yield put(createTeamSuccess(response.team))
  } catch (error) {
    yield put(createTeamFail(error))
  }
}

function* updateTeam(action) {
  try {
    const response = yield call(() => RequestHandler.put(
      `events/${action.payload.eventId}/teams/${action.payload.teamId}`,
      action.payload.team,
    ))
    // const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(response.team))
  } catch (error) {
    yield put(updateTeamFail(error.message))
  }
}

function* deleteTeam(action) {
  try {
    const response = yield call(() => RequestHandler.delete(
      `events/${action.payload.eventId}/teams/${action.payload.teamId}`
    ));
    const data = yield call(() => response.json.bind(response)());
    yield put(deleteTeamSuccess(data))
  } catch(error) {
    yield put(deleteTeamFail(error))
  }
}

// RSVP
function* registerParticipant(action) {
  try {
    const response = yield call(() => RequestHandler.post(
      `events/${action.payload.eventId}/rsvp`
    ));
    const data = yield call(() => response.json.bind(response)());
    yield put(registerParticipantSuccess(data))
  } catch (error) {
    yield put(registerParticipantFail(error))
  }
}

export default function* attendeesSaga() {
    yield takeEvery(FETCH_ATTENDEES_INITIATED, fetchAttendees)
    yield takeEvery(ADD_TEAM_MEMBER_INITIATED, addTeamMember)
    yield takeEvery(CREATE_TEAM_INITIATED, createTeam)
    yield takeEvery(UPDATE_TEAM_INITIATED, updateTeam)
    yield takeEvery(DELETE_TEAM_INITIATED, deleteTeam)
    yield takeEvery(REGISTER_PARTICIPANT_INITIATED, registerParticipant)
}  
  