import { all } from 'redux-saga/effects';

import eventsSaga from './eventsSaga';
import eventSaga from './eventSaga';
import attendeesSaga from './attendeesSaga';
import teamSaga from './team';


//Watcher saga
export default function* rootSaga() {
  yield all([
      eventsSaga(),
      eventSaga(),
      attendeesSaga(),
      teamSaga(),
  ])
}
