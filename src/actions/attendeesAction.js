import {
  FETCH_ATTENDEES_INITIATED,
  FETCH_ATTENDEES_SUCCESS,
  FETCH_ATTENDEES_FAILED,
  CREATE_TEAM_INITIATED,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  UPDATE_TEAM_INITIATED,
  ADD_TEAM_MEMBER_INITIATED,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAIL,
  DELETE_TEAM_INITIATED,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAIL,
  REGISTER_PARTICIPANT_INITIATED,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_FAIL,
  CANCEL_PARTICIPATION_INITIATED,
  CANCEL_PARTICIPATION_SUCCESS,
  CANCEL_PARTICIPATION_FAIL,
  ADD_TEAM_MEMBER_SUCCESS,
  ADD_TEAM_MEMBER_FAIL,
  INVITATION_ACCEPT_REJECT_INITIATED,
  INVITATION_ACCEPT_REJECT_SUCCESS,
  INVITATION_ACCEPT_REJECT_FAIL
} from "../utils/constants";

export function fetchAttendeesInitiated(eventID) {
  return {
    type: FETCH_ATTENDEES_INITIATED,
    payload: eventID
  };
}

export function fetchAttendeesSuccess(payload) {
  return {
    type: FETCH_ATTENDEES_SUCCESS,
    payload
  };
}

export function fetchAttendeesFailed(payload) {
  return {
    type: FETCH_ATTENDEES_FAILED,
    payload
  };
}

export function addTeamMemberInitiated(payload) {
  return {
    type: ADD_TEAM_MEMBER_INITIATED,
    payload
  };
}

export function addTeamMemberSuccess(payload) {
  return {
    type: ADD_TEAM_MEMBER_SUCCESS,
    payload
  };
}

export function addTeamMemberFail(payload) {
  return {
    type: ADD_TEAM_MEMBER_FAIL,
    payload
  };
}

export function createTeamInitiated(payload) {
  return {
    type: CREATE_TEAM_INITIATED,
    payload
  };
}

export function createTeamSuccess(payload) {
  return {
    type: CREATE_TEAM_SUCCESS,
    payload
  };
}

export function createTeamFail(payload) {
  return {
    type: CREATE_TEAM_FAIL,
    payload
  };
}

export function updateTeamInitiated(payload) {
  return {
    type: UPDATE_TEAM_INITIATED,
    payload
  };
}

export function updateTeamSuccess(payload) {
  return {
    type: UPDATE_TEAM_SUCCESS,
    payload
  };
}

export function updateTeamFail(payload) {
  return {
    type: UPDATE_TEAM_FAIL,
    payload
  };
}

export function deleteTeamInitiated(payload) {
  return {
    type: DELETE_TEAM_INITIATED,
    payload
  };
}

export function deleteTeamSuccess(payload) {
  return {
    type: DELETE_TEAM_SUCCESS,
    payload
  };
}

export function deleteTeamFail(payload) {
  return {
    type: DELETE_TEAM_FAIL,
    payload
  };
}

export function registerParticipantInitiated(payload) {
  return {
    type: REGISTER_PARTICIPANT_INITIATED,
    payload
  };
}

export function registerParticipantSuccess(payload) {
  return {
    type: REGISTER_PARTICIPANT_SUCCESS,
    payload
  };
}

export function registerParticipantFail(payload) {
  return {
    type: REGISTER_PARTICIPANT_FAIL,
    payload
  };
}

export function invitationAcceptRejectInitiated(payload) {
  return {
    type: INVITATION_ACCEPT_REJECT_INITIATED,
    payload
  };
}

export function invitationAcceptRejectSuccess(payload) {
  return {
    type: INVITATION_ACCEPT_REJECT_SUCCESS,
    payload
  };
}

export function invitationAcceptRejectFail(payload) {
  return {
    type: INVITATION_ACCEPT_REJECT_FAIL,
    payload
  };
}

export function cancelParticipationInitiated(payload) {
  return {
    type: CANCEL_PARTICIPATION_INITIATED,
    payload
  };
}

export function cancelParticipationSuccess(payload) {
  return {
    type: CANCEL_PARTICIPATION_SUCCESS,
    payload
  };
}

export function cancelParticipationFail(payload) {
  return {
    type: CANCEL_PARTICIPATION_FAIL,
    payload
  };
}
