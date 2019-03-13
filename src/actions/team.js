import {
    FETCH_TEAM_INITIATED,
    FETCH_TEAM_SUCCESS,
    FETCH_TEAM_FAIL,
    CREATE_TEAM_INITIATED,
    UPDATE_TEAM_INITIATED,
    UPDATE_TEAM_SUCCESS,
    UPDATE_TEAM_FAIL,
  } from 'UTILS/constants';
  
  export function fetchTeamInitiated(id) {
    return {
      type: FETCH_TEAM_INITIATED,
      payload: id,
    }
  }
  
  export function fetchTeamSuccess(team) {
    return {
      type: FETCH_TEAM_SUCCESS,
      payload: team,
    }
  }
  
  export function fetchTeamFail(error) {
    return {
      type: FETCH_TEAM_FAIL,
      payload: error,
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
  
  export function updateTeamSuccess() {
    return {
      type: UPDATE_TEAM_SUCCESS,
    }
  }
  
  export function updateTeamFail(error) {
    return {
      type: UPDATE_TEAM_FAIL,
      payload: error,
    }
  }
  