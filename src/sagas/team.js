import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchTeamSuccess, fetchTeamFail, updateTeamSuccess, updateTeamFail } from '../actions/team';
import { FETCH_TEAM_INITIATED, CREATE_TEAM_INITIATED, UPDATE_TEAM_INITIATED, } from 'UTILS/constants';
import RequestHandler from '../HTTP'

// Worker saga
function* fetchTeam(action) {
  try {
    const response = yield call(() => RequestHandler.get(
      `events/${action.payload}`,
    ));
    yield put(fetchTeamSuccess(response.event))
  } catch (error) {
    yield put(fetchTeamFail(error))
  }
}

function* createTeam(action) {
  try {
    console.log('In Create Team Saga:', action);
    const eventId = action.payload.eventId;
    delete action.payload.eventId;
    const response = yield call(() => RequestHandler.post(
      `events/${eventId}/teams`,
      action.payload,
    ))
    const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(data))
  } catch (error) {
    yield put(updateTeamFail(error))
  }
}

function* updateTeam(action) {
  try {
    const response = yield call(() => fetch(`http://intranet.joshsoftware.com/events/${action.payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    }));
    const data = yield call(() => response.json.bind(response)());
    yield put(updateTeamSuccess(data))
  } catch (error) {
    yield put(updateTeamFail(error))
  }
}

//Watcher saga
export default function* eventSaga() {
  yield takeEvery(FETCH_TEAM_INITIATED, fetchTeam)
  yield takeEvery(CREATE_TEAM_INITIATED, createTeam)
  yield takeEvery(UPDATE_TEAM_INITIATED, updateTeam)
}
