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
  REGISTER_PARTICIPANT_FAIL,
  INVITATION_ACCEPT_REJECT_INITIATED,
  INVITATION_ACCEPT_REJECT_SUCCESS,
  INVITATION_ACCEPT_REJECT_FAIL
} from "UTILS/constants";
import {
  RSVP_REJECT,
  RSVP_REJECT_FAIL,
  RSVP_REJECT_SUCCESS
} from "../utils/constants";
import { getTeamMembers } from "../utils/util";

const initialState = {
  isLoading: false,
  data: {},
  error: null,
  rsvp: false,
  rsvpLoading: false,
  rsvpError: null
};

function addNewAttendees({ members }) {
  const user = {
    email: localStorage.getItem("email") || "",
    name: localStorage.getItem("name") || "",
    user_id: localStorage.getItem("id") || ""
  };
  members && members.push({ invitee: user, status: "accepted" });
  return members || [];
}

export default function eventReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ATTENDEES_INITIATED:
      return {
        ...state,
        isLoading: true,
        error: null
      };

    case FETCH_ATTENDEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        rsvp: false,
        ...action.payload,
        myTeam: action.payload.teams
          ? action.payload.teams.find(currentTeam => {
              return (
                currentTeam.creator_id === localStorage.getItem("id") ||
                currentTeam.members.find(
                  member =>
                    member.invitee.user_id === localStorage.getItem("id") &&
                    member.status === MEMBER_INVITE_STATUS.ACCEPTED
                )
              );
            })
          : {},
        invitations: action.payload.teams
          ? action.payload.teams.filter(currentTeam => {
              return currentTeam.members.find(
                member =>
                  member.invitee.user_id === localStorage.getItem("id") &&
                  member.status === MEMBER_INVITE_STATUS.PENDING
              );
            })
          : [],
        error: null,
        members: action.payload.teams ? action.payload.teams[0].members : [],
        rsvpCancelled: action.payload.teams
          ? !!action.payload.teams[0].members.find(member => {
              return (
                member.invitee.user_id === localStorage.getItem("id") &&
                member.status === MEMBER_INVITE_STATUS.REJECTED
              );
            })
          : false
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
        error: null
      };

    case CREATE_TEAM_SUCCESS:
      const cloneTeam = state.teams ? [...state.teams] : [];
      cloneTeam.push(action.payload);
      return {
        ...state,
        isLoading: false,
        error: null,
        myTeam: action.payload,
        teams: cloneTeam
      };

    case CREATE_TEAM_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case ADD_TEAM_MEMBER_INITIATED:
      return { isLoading: true, ...state };

    case ADD_TEAM_MEMBER_SUCCESS:
      const myUpdatedTeam = { ...state.myTeam };
      let myTeamMembers = [...myUpdatedTeam.members];
      myTeamMembers = myTeamMembers.concat(
        getTeamMembers(action.payload.eventDetails, action.payload.failedEmails)
      );
      myUpdatedTeam.members = [...myTeamMembers];
      return {
        ...state,
        myTeam: myUpdatedTeam,
        failedEmails: action.failedEmails,
        isLoading: false,
        error: null
      };

    case ADD_TEAM_MEMBER_FAIL:
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };

    case UPDATE_TEAM_INITIATED:
      return { isLoading: true, ...state };

    case UPDATE_TEAM_SUCCESS:
      return { isLoading: false, ...state };

    case UPDATE_TEAM_FAIL:
      return { isLoading: false, error: action.payload, ...state };

    case DELETE_TEAM_INITIATED:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_TEAM_SUCCESS:
      const newTeams = [...state.teams];
      const deleteIndex = newTeams.findIndex(
        team => team.id === state.myTeam.id
      );
      newTeams.splice(deleteIndex, 1);
      return {
        ...state,
        teams: newTeams,
        isLoading: false,
        myTeam: null,
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
        rsvpLoading: true
      };
    case REGISTER_PARTICIPANT_SUCCESS:
      const updatedTeams = addNewAttendees(state);
      return {
        ...state,
        members: updatedTeams,
        rsvpLoading: false,
        rsvp: true
      };
    case REGISTER_PARTICIPANT_FAIL:
      return {
        ...state,
        rsvpLoading: false,
        rsvpError: action.payload
      };
    case INVITATION_ACCEPT_REJECT_INITIATED:
      return { isInviteLoading: true, ...state };

    case INVITATION_ACCEPT_REJECT_SUCCESS:
      const team = {
        ...state.teams.find(
          currentTeam => currentTeam.id === action.payload.teamId
        )
      };
      const memberIndex = team.members.findIndex(
        member => member.invitee.user_id === localStorage.getItem("id")
      );
      team.members[memberIndex].status = action.payload.status;
      return {
        ...state,
        isInviteLoading: false,
        error: null,
        myTeam: team
      };

    case INVITATION_ACCEPT_REJECT_FAIL:
      return {
        ...state,
        isInviteLoading: false,
        error: action.payload
      };

    case RSVP_REJECT:
      return {
        ...state,
        rsvpLoading: true
      };

    case RSVP_REJECT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        rsvpLoading: false
      };

    case RSVP_REJECT_FAIL:
      return {
        ...state,
        rsvpLoading: false,
        error: action.payload
      };
    default:
      return state;
  }
}
