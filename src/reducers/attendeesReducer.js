import {
  FETCH_ATTENDEES_INITIATED,
  FETCH_ATTENDEES_SUCCESS,
  FETCH_ATTENDEES_FAILED,
  CREATE_TEAM_INITIATED,
  CREATE_TEAM_SUCCESS,
  CREATE_TEAM_FAIL,
  ADD_TEAM_MEMBER_INITIATED,
  ADD_TEAM_MEMBER_SUCCESS,
  ADD_TEAM_MEMBER_FAIL,
  UPDATE_TEAM_INITIATED,
  UPDATE_TEAM_SUCCESS,
  UPDATE_TEAM_FAIL,
  DELETE_TEAM_INITIATED,
  DELETE_TEAM_SUCCESS,
  DELETE_TEAM_FAIL,
  MEMBER_INVITE_STATUS,
  REGISTER_PARTICIPANT_INITIATED,
  REGISTER_PARTICIPANT_SUCCESS,
  REGISTER_PARTICIPANT_FAIL

} from 'UTILS/constants';
import { getTeamMembers } from '../utils/util';

const initialState = {
  isLoading: false,
  data: {},
  error: null,

  rsvpLoading: false,
  rsvpError: null
};

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ATTENDEES_INITIATED:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case FETCH_ATTENDEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload,
        myTeam: action.payload.teams ? action.payload.teams.find(currentTeam => {
          return (
            currentTeam.creator_id === localStorage.getItem('user') ||
            currentTeam.members.find(
              member =>
                member.invitee.user_id === localStorage.getItem('user') &&
                member.status === MEMBER_INVITE_STATUS.ACCEPTED
            )
          );
        }) : {},
        error: null,
      };

    case FETCH_ATTENDEES_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case CREATE_TEAM_INITIATED:
      return {
        ...state,
        isLoading: true,
        data: action.payload,
        error: null
      };

    case CREATE_TEAM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        myTeam: action.payload,
        teams: [{...action.payload}]
      };

    case CREATE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_TEAM_MEMBER_INITIATED:
      return {isLoading: true, ...state}

    case ADD_TEAM_MEMBER_SUCCESS: 
      const myUpdatedTeam = {...state.myTeam};
      let myTeamMembers = [...myUpdatedTeam.members];
      myTeamMembers = myTeamMembers.concat(getTeamMembers(action.payload.eventDetails));
      myUpdatedTeam.members = [...myTeamMembers];
      return {
        ...state,
        myTeam: myUpdatedTeam,
        failedEmails: action.failedEmails,
        isLoading: false,
        error: null,
      }

    case ADD_TEAM_MEMBER_FAIL: return {
      ...state,
      error: action.payload,
      isLoading: false,
    }

    case UPDATE_TEAM_INITIATED:
      return {isLoading: true , ...state}

    case UPDATE_TEAM_SUCCESS:
      return {isLoading: false, ...state};

    case UPDATE_TEAM_FAIL:
      return {isLoading: false, error: action.payload, ...state}

    case DELETE_TEAM_INITIATED:
      return {
        isLoading: true,
        data: {
          ...action.payload,
          ...state
        },
        error: null
      };

    case DELETE_TEAM_SUCCESS:
      return {
        isLoading: false,
        data: {
          ...action.payload,
          ...state
        },
        error: null
      };

    case DELETE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case REGISTER_PARTICIPANT_INITIATED:
      return {
        ...state,
        rsvpLoading: true,
        
      }

    case REGISTER_PARTICIPANT_SUCCESS:
      return {
        ...state,
        rsvpLoading: false,
        
      }

    case REGISTER_PARTICIPANT_FAIL:
      return {
        ...state,
        rsvpLoading: false,
        rsvpError: action.payload,
        
      }

    default:
      return state;
  }
}
