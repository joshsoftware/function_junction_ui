import {
    FETCH_ATTENDEES_INITIATED, FETCH_ATTENDEES_SUCCESS, FETCH_ATTENDEES_FAILED,
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