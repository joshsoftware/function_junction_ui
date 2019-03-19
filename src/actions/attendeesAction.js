import {
    FETCH_ATTENDEES_INITIATED,
    FETCH_ATTENDEES_SUCCESS,
    FETCH_ATTENDEES_FAILED,
    CREATE_TEAM_INITIATED,
    UPDATE_TEAM_INITIATED,
    ADD_TEAM_MEMBER_INITIATED,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
} from '../utils/constants';

export function fetchAttendeesInitiated(eventID){
    return {
        type: FETCH_ATTENDEES_INITIATED,
        payload: eventID
    }
}

export function fetchAttendeesSuccess(payload){
    return {
        type: FETCH_ATTENDEES_SUCCESS,
        payload
    }
}

export function fetchAttendeesFailed(payload){
    return {
        type: FETCH_ATTENDEES_FAILED,
        payload
    }
}

export function addTeamMemberInitiated(payload) {
    return {
        type: ADD_TEAM_MEMBER_INITIATED,
        payload
    }
}

export function createTeamInitiated(data) {
    return {
      type: CREATE_TEAM_INITIATED,
      payload: data,
    }
  }
  
  export function updateTeamInitiated(data) {
    return {
      type: UPDATE_TEAM_INITIATED,
      payload: data,
    }
  }

export function updateTeamSuccess(payload) {
    return {
        type: UPDATE_TEAM_SUCCESS,
        payload
    }
}

export function updateTeamFail(payload) {
    return {
        type: UPDATE_TEAM_FAIL,
        payload
    }
}