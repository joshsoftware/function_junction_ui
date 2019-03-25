import { call, put, takeEvery } from 'redux-saga/effects';
import {
  fetchEventSuccess,
  fetchEventFail,
  updateEventSuccess,
  updateEventFail,
  createEventSuccess,
  createEventFail,
} from 'ACTION/eventAction';

import {
  FETCH_EVENT_INITIATED,
  CREATE_EVENT_INITIATED,
  UPDATE_EVENT_INITIATED,
} from 'UTILS/constants';
import RequestHandler from '../HTTP'

// Worker saga
function* fetchEvent(action) {
  try {
    const response = yield call(() => RequestHandler.get(
      `events/${action.payload}`,
    ));
    yield put(fetchEventSuccess(response.event))
  } catch (error) {
    yield put(fetchEventFail(error))
  }
}

function* createEvent(action) {
  try {
    const response = yield call(() => RequestHandler.post(
      'events',
      action.payload,
    ))
    const data = yield call(() => response.json.bind(response)());
    console.log('Create Event Success, \nData:', data);
    yield put(createEventSuccess(data))
  } catch (error) {
    console.log('In Create Team Fail', error);
    yield put(createEventFail(error))
  }
}

function* updateEvent(action) {
  try {
    const response = yield call(() => RequestHandler.put(
      `events/${action.payload.id}`,
      action.payload,
    ))
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
