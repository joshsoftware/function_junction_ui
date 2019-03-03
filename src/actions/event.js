import {
  FETCH_EVENT_INITIATED,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  CREATE_EVENT_INITIATED,
  UPDATE_EVENT_INITIATED,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
} from '../utils/constants';

export function fetchEventInitiated() {
  return {
    type: FETCH_EVENT_INITIATED,
  }
}

export function fetchEventSuccess(event) {
  return {
    type: FETCH_EVENT_SUCCESS,
    payload: event,
  }
}

export function fetchEventFail(error) {
  return {
    type: FETCH_EVENT_FAIL,
    payload: error,
  }
}

export function createEventInitiated() {
  return {
    type: CREATE_EVENT_INITIATED,
  }
}

export function updateEventInitiated() {
  return {
    type: UPDATE_EVENT_INITIATED,
  }
}

export function updateEventSuccess() {
  return {
    type: UPDATE_EVENT_SUCCESS,
  }
}

export function updateEventFail(error) {
  return {
    type: UPDATE_EVENT_FAIL,
    payload: error,
  }
}
