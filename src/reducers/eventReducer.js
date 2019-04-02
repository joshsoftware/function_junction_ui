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
  redirect: false,
  isLoading: false,
  isUpdating: false,
  data: {},
  error: null,
}

export default function eventReducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_EVENT_INITIATED: return {
      ...state,
      redirect: false,
      isLoading: true,
      data: {},
      error: null,
    }
    case FETCH_EVENT_SUCCESS: 
    return {
      ...state,
      isLoading: false,
      data: action.payload,
      error: null,
    }
    case FETCH_EVENT_FAIL: return {
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }
    case CREATE_EVENT_INITIATED: return {
      ...state,
      redirect: false,
      isUpdating: false,
      error: null,
      isLoading: true,
      data: {},
    }
    case CREATE_EVENT_SUCCESS: return {
      ...state,
      redirect: true,
      error: null,
    }
    case CREATE_EVENT_FAIL: return {
      ...state,
      redirect: false,
      error: action.payload,
    }
    case UPDATE_EVENT_INITIATED: return {
      ...state,
      redirect: false,
      isUpdating: true,
      error: null,
      isLoading: false,
      data: {},
    }
    case UPDATE_EVENT_SUCCESS: return {
      ...state,
      redirect: true,
      error: null,
      isLoading: false,
      data: {},
    }
    case UPDATE_EVENT_FAIL: return {
      ...state,
      redirect: false,
      error: action.payload,
      isLoading: false,
      data: {},
    }
    default: return state;
  }
}
