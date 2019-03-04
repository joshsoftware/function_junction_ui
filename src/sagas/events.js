import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEventListSuccess, fetchEventListFail } from '../actions/events';
import { FETCH_EVENT_LIST_INITIATED } from 'UTILS/constants';

// Worker saga
function* fetchEvents() {
  try {
    const response = yield call(fetch, `http://intranet.joshsoftware.com/events`);
    const data = yield call(() => response.json.bind(response)());
    yield put(fetchEventListSuccess(data.events));
  } catch (error) {
    yield put(fetchEventListFail(error))
  }
}

//Watcher saga
export default function* eventsSaga() {
  yield takeEvery(FETCH_EVENT_LIST_INITIATED, fetchEvents)
}
