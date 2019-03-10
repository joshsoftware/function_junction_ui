import { all } from 'redux-saga/effects';

import eventsSaga from './events';
import eventSaga from './event';
import teamSaga from './team';

//Watcher saga
export default function* rootSaga() {
  yield all([
      eventsSaga(),
      eventSaga(),
      teamSaga(),
  ])
}
