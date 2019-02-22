// import { FETCH_USERS_INITIATED, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } from 'UTILS/actionConstants';

export function fetchUsersInitiate() {
  return {
    type: 'FETCH_USERS_INITIATED',
  }
}

export function fetchUsersSuccess(data) {
  return {
    type: 'FETCH_USERS_SUCCESS',
    payload: data,
  }
}

export function fetchUsersFail(error) {
  return {
    type: 'FETCH_USERS_FAIL',
    payload: error,
  }
}