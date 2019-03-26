import {
  FETCH_EVENT_INITIATED,
  FETCH_EVENT_SUCCESS,
  FETCH_EVENT_FAIL,
  UPDATE_EVENT_INITIATED,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  CREATE_EVENT_INITIATED,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAIL,
} from 'UTILS/constants';

const initialState = {
  isLoading: false,
  isUpdating: false,
  data: {},
  error: null,
}

export default function eventReducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_EVENT_INITIATED: return {
      isLoading: true,
      data: {},
      error: null,
    }
    case FETCH_EVENT_SUCCESS: return {
      isLoading: false,
      data: action.payload,
      error: null,
    }
    case FETCH_EVENT_FAIL: return {
      isLoading: false,
      data: {},
      error: action.payload,
    }
    case CREATE_EVENT_INITIATED: return {
      isUpdating: true,
      error: null,
      isLoading: true,
      data: {},
    }
    case CREATE_EVENT_SUCCESS: return {
      isUpdating: false,
      error: null,
    }
    case CREATE_EVENT_FAIL: return {
      isUpdating: false,
      error: action.payload,
    }
    case UPDATE_EVENT_INITIATED: return {
      isUpdating: true,
      error: null,
      isLoading: false,
      data: {},
    }
    case UPDATE_EVENT_SUCCESS: return {
      isUpdating: false,
      error: null,
      isLoading: false,
      data: {},
    }
    case UPDATE_EVENT_FAIL: return {
      isUpdating: false,
      error: action.payload,
      isLoading: false,
      data: {},
    }
    default: return state;
  }
}
