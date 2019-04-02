import {
  FETCH_EVENT_INITIATED,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  CREATE_EVENT_INITIATED,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
  UPDATE_EVENT_INITIATED,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  CHANGE_GOING_STATUS
} from 'UTILS/constants';

export function fetchEventInitiated(id) {
  return {
    type: FETCH_EVENT_INITIATED,
    payload: id,
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

export function createEventInitiated(data) {
  return {
    type: CREATE_EVENT_INITIATED,
    payload: data,
  }
}

export function createEventSuccess(data) {
  return {
    type: CREATE_EVENT_SUCCESS,
    payload: data,
  }
}

export function createEventFail(error) {
  return {
    type: CREATE_EVENT_FAIL,
    payload: error,
  }
}

export function updateEventInitiated(data) {
  return {
    type: UPDATE_EVENT_INITIATED,
    payload: data,
  }
}

export function updateEventSuccess(data) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    payload: data
  }
}

export function updateEventFail(error) {
  return {
    type: UPDATE_EVENT_FAIL,
    payload: error,
  }
}

// TODO
export function updateGoingStatus(data) {
  return {
    type: CHANGE_GOING_STATUS,
    payload: data,
  }
}