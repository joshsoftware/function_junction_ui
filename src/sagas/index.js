import { all } from 'redux-saga/effects';

import eventsSaga from './events';
import eventSaga from './event';

//Watcher saga
export default function* rootSaga() {
  yield all([
      eventsSaga(),
      eventSaga(),
  ])
}
