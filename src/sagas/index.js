import { call, put, takeEvery } from 'redux-saga/effects';
// import { FETCH_USERS_INITIATED } from 'UTILS/actionConstants';
import { fetchUsersSuccess, fetchUsersFail } from '../actions/';

// Worker saga
function* fetchUsers() {
  try {
    const response = yield call(() => fetch(`https://jsonplaceholder.typicode.com/users`));
    const data = yield call(() => response.json.bind(response)());
    yield put(fetchUsersSuccess(data))
  } catch (error) {
    yield put(fetchUsersFail(error))
  }
}

//Watcher saga
export default function* sagas() {
  // yield takeLatest(FETCH_USERS_INITIATED, fetchUsers)
  yield takeEvery('FETCH_USERS_INITIATED', fetchUsers)
}