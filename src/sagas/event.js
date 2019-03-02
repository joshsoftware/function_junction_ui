import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEventSuccess, fetchEventFail, updateEventSuccess, updateEventFail } from '../actions/event';
import { FETCH_EVENT_INITIATED, CREATE_EVENT_INITIATED, UPDATE_EVENT_INITIATED, } from '../constants';

// Worker saga
function* fetchEvent(action) {
  try {
    const response = yield call(() => fetch(`http://intranet.joshsoftware.com/events/${action.payload}`));
    const data = yield call(() => response.json.bind(response)());
    yield put(fetchEventSuccess(data.event))
  } catch (error) {
    yield put(fetchEventFail(error))
  }
}

function* createEvent(action) {
  try {
    const response = yield call(() => fetch(`http://intranet.joshsoftware.com/events`, {
      method: 'POST',
      body: JSON.stringify(action.payload),
    }));
    const data = yield call(() => response.json.bind(response)());
    yield put(updateEventSuccess(data))
  } catch (error) {
    yield put(updateEventFail(error))
  }
}

function* updateEvent(action) {
  try {
    const response = yield call(() => fetch(`http://intranet.joshsoftware.com/events/${action.payload.id}`, {
      method: 'PUT',
      body: JSON.stringify(action.payload),
    }));
    const data = yield call(() => response.json.bind(response)());
    yield put(updateEventSuccess(data))
  } catch (error) {
    yield put(updateEventFail(error))
  }
}

//Watcher saga
export default function* eventSaga() {
  yield takeEvery(FETCH_EVENT_INITIATED, fetchEvent)
  yield takeEvery(CREATE_EVENT_INITIATED, createEvent)
  yield takeEvery(UPDATE_EVENT_INITIATED, updateEvent)
}
