import {
  FETCH_EVENT_LIST_INITIATED,
  FETCH_EVENT_LIST_SUCCESS,
  FETCH_EVENT_LIST_FAIL,
} from '../utils/constants';

const initialState = {
  isLoading: false,
  data: [],
  error: null,
}

export default function eventsReducer (state = initialState, action) {
  switch(action.type) {
    case FETCH_EVENT_LIST_INITIATED: return {
      isLoading: true,
      data: [],
      error: null,
    }
    case FETCH_EVENT_LIST_SUCCESS: return {
      isLoading: false,
      data: action.payload,
      error: null,
    }
    case FETCH_EVENT_LIST_FAIL: return {
      isLoading: false,
      data: [],
      error: action.payload,
    }
    default: return state;
  }
}
