import {
    FETCH_ATTENDEES_INITIATED,
    FETCH_ATTENDEES_SUCCESS,
    FETCH_ATTENDEES_FAILED
  } from 'UTILS/constants';
  
  const initialState = {
    isLoading: false,
    data: {},
    error: null,
  }
  
  export default function eventReducer (state = initialState, action) {
    switch(action.type) {
      case FETCH_ATTENDEES_INITIATED:
      return {
        isLoading: true,
        data: action.payload,
        error: null,
      }
      case FETCH_ATTENDEES_SUCCESS: return {
          isLoading: false,
          data: action.payload,
          error: null
      }
      case FETCH_ATTENDEES_FAILED: return {
        isLoading: false,
        data: {},
        error: action.payload
      }
      default: return state;
    }
  }
  