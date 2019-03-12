import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchAttendeesSuccess, fetchAttendeesFailed } from 'ACTION/attendeesAction';
import { FETCH_ATTENDEES_INITIATED, FETCH_ATTENDEES_SUCCESS, FETCH_ATTENDEES_FAILED } from 'UTILS/constants';
import RequestHandler from '../HTTP'

function* fetchAttendees(action) {
    console.log(action, "AAA")
    try {
      const response = yield call(() => RequestHandler.get(
        `events/${action.payload}/teams`,
      ));
      yield put(fetchAttendeesSuccess(response));
    } catch (error) {
      yield put(fetchAttendeesFailed(error))
    }
  }
  

export default function* attendeesSaga() {
    yield takeEvery(FETCH_ATTENDEES_INITIATED, fetchAttendees)
}  
  