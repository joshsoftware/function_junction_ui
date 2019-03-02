import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchEventListSuccess, fetchEventListFail } from '../actions/events';
import { FETCH_EVENT_LIST_INITIATED } from '../constants';

// Worker saga
function* fetchEvents() {
  try {
    const response = yield call(fetch, `https://jsonplaceholder.typicode.com/users`);
    const data = yield call(() => response.json.bind(response)());
    yield put(fetchEventListSuccess([
      {
          "id": "1",
          "title": "Women's day",
          "description": "This Event is organized by Josh on 8th March.",
          "startDateTime": "2019-03-08T05:30:20+05:30",
          "endDateTime": "2019-03-08T05:30:20+05:30",
          "isShowcasable": true,
          "isIndividualParticipation": false,
          "createdBy": "000000000000000000000000",
          "maxSize": 0,
          "minSize": 0,
          "isPublished": true,
          "venue": "Josh Software",
          "CreatedAt": "2019-02-25T18:54:40.345+05:30",
          "UpdatedAt": "0001-01-01T05:53:28+05:53",
          "RegisterBefore": "0001-01-01T05:53:28+05:53"
      },
      {
          "id": "2",
          "title": "Women's day",
          "description": "This Event is organized by Josh on 8th March.",
          "startDateTime": "2019-03-08T05:30:20+05:30",
          "endDateTime": "2019-03-08T05:30:20+05:30",
          "isShowcasable": true,
          "isIndividualParticipation": false,
          "createdBy": "000000000000000000000000",
          "maxSize": 0,
          "minSize": 0,
          "isPublished": true,
          "venue": "Josh Software",
          "CreatedAt": "2019-02-25T18:54:40.345+05:30",
          "UpdatedAt": "0001-01-01T05:53:28+05:53",
          "RegisterBefore": "0001-01-01T05:53:28+05:53"
      },
      {
          "id": "3",
          "title": "Women's day",
          "description": "This Event is organized by Josh on 8th March.",
          "startDateTime": "2019-03-08T05:30:20+05:30",
          "endDateTime": "2019-03-08T05:30:20+05:30",
          "isShowcasable": true,
          "isIndividualParticipation": false,
          "createdBy": "000000000000000000000000",
          "maxSize": 0,
          "minSize": 0,
          "isPublished": true,
          "venue": "Josh Software",
          "CreatedAt": "2019-02-25T18:54:40.345+05:30",
          "UpdatedAt": "0001-01-01T05:53:28+05:53",
          "RegisterBefore": "0001-01-01T05:53:28+05:53"
      },
    ]
    ));
  } catch (error) {
    yield put(fetchEventListFail(error))
  }
}

//Watcher saga
export default function* eventsSaga() {
  yield takeEvery(FETCH_EVENT_LIST_INITIATED, fetchEvents)
}
