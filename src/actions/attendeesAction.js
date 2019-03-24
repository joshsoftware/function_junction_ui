import {
    FETCH_ATTENDEES_INITIATED,
    FETCH_ATTENDEES_SUCCESS,
    FETCH_ATTENDEES_FAILED,
    CREATE_TEAM_INITIATED,
    UPDATE_TEAM_INITIATED,
    ADD_TEAM_MEMBER_INITIATED,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
    DELETE_TEAM_INITIATED,
    DELETE_TEAM_SUCCESS,
    DELETE_TEAM_FAIL,
    REGISTER_PARTICIPANT_INITIATED,
    REGISTER_PARTICIPANT_SUCCESS,
    REGISTER_PARTICIPANT_FAIL
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

export function deleteTeamInitiated(payload) {
    return {
        type: DELETE_TEAM_INITIATED,
        payload
    }
}

export function deleteTeamSuccess(payload) {
    return {
        type: DELETE_TEAM_SUCCESS,
        payload
    }
}

export function deleteTeamFail(payload) {
    return {
        type: DELETE_TEAM_FAIL,
        payload
    }
}

export function registerParticipantInitiated(payload) {
    return {
        type: REGISTER_PARTICIPANT_INITIATED,
        payload
    }
}

export function registerParticipantSuccess(payload) {
    return {
        type: REGISTER_PARTICIPANT_SUCCESS,
        payload
    }
}

export function registerParticipantFail(payload) {
    return {
        type: REGISTER_PARTICIPANT_FAIL,
        payload
    }
}