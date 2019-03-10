import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEventListSuccess, fetchEventListFail } from 'ACTION/eventsAction';
import { FETCH_EVENT_LIST_INITIATED } from 'UTILS/constants';
import RequestHandler from '../HTTP'
// Worker saga
function* fetchEvents() {
  try {
    const response = yield call(() => RequestHandler.get(
      'events'
    ));
    yield put(fetchEventListSuccess(response.events));
  } catch (error) {
    yield put(fetchEventListFail(error))
  }
}

//Watcher saga
export default function* eventsSaga() {
  yield takeEvery(FETCH_EVENT_LIST_INITIATED, fetchEvents)
}
