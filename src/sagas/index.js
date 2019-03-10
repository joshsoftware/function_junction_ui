import { all } from 'redux-saga/effects';

import eventsSaga from './eventsSaga';
import eventSaga from './eventSaga';

//Watcher saga
export default function* rootSaga() {
  yield all([
      eventsSaga(),
      eventSaga(),
  ])
}
