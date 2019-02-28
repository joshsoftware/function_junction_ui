import {
  FETCH_EVENT_LIST_INITIATED,
  FETCH_EVENT_LIST_SUCCESS,
  FETCH_EVENT_LIST_FAIL,
} from '../constants';

export function fetchEventListInitiated() {
  return {
    type: FETCH_EVENT_LIST_INITIATED,
  }
}

export function fetchEventListSuccess(list) {
  return {
    type: FETCH_EVENT_LIST_SUCCESS,
    payload: list,
  }
}

export function fetchEventListFail(error) {
  return {
    type: FETCH_EVENT_LIST_FAIL,
    payload: error,
  }
}
