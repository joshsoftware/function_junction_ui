import {
    FETCH_ATTENDEES_INITIATED,
    FETCH_ATTENDEES_SUCCESS,
    FETCH_ATTENDEES_FAILED,
    CREATE_TEAM_INITIATED,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAIL,
    ADD_TEAM_MEMBER_INITIATED,
    UPDATE_TEAM_INITIATED,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
    DELETE_TEAM_INITIATED,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
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
          data: {
            myTeam: action.payload.teams.find(team => team.created_by.user_id === '000000000000000000000000') || [],
            ...action.payload,
            ...state
          },
          error: null
      }
      case FETCH_ATTENDEES_FAILED: return {
        isLoading: false,
        data: {},
        error: action.payload
      }
      case CREATE_TEAM_INITIATED: return {
          isLoading: true,
          data: action.payload,
          error: null,
      }
      case CREATE_TEAM_SUCCESS: return {
        isLoading: false,
        data: {
          myTeam: {...action.payload},
          ...state
        },
        error: null
      }
      case CREATE_TEAM_FAIL: return {
        isLoading: false,
        data: {},
        error: action.payload
      }
      case ADD_TEAM_MEMBER_INITIATED: return {
        isLoading: true,
        data: action.payload,
        error: null,
      }
      case UPDATE_TEAM_INITIATED : return {
        isLoading: true,
        data: action.payload,
        error: null
      }
      case UPDATE_TEAM_SUCCESS: return {
          isLoading: false,
          data: action.payload,
          error: null
      }
      case UPDATE_TEAM_FAIL: return {
        isLoading: false,
        data: {},
        error: action.payload
      }
      case DELETE_TEAM_INITIATED: return {
        isLoading: true,
        data: action.payload,
        error: null
      }
      case DELETE_TEAM_SUCCESS: return {
        isLoading: false,
        data: action.payload,
        error: null
      }
      case DELETE_TEAM_FAIL: return {
        isLoading: false,
        data: {},
        error: action.payload
      }
      default: return state;
    }
  }
  