export const FETCH_EVENT_LIST_INITIATED = 'FETCH_EVENT_LIST_INITIATED';
export const FETCH_EVENT_LIST_SUCCESS = 'FETCH_EVENT_LIST_SUCCESS';
export const FETCH_EVENT_LIST_FAIL = 'FETCH_EVENT_LIST_FAIL';

export const FETCH_EVENT_INITIATED = 'FETCH_EVENT_INITIATED';
export const FETCH_EVENT_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const FETCH_EVENT_FAIL = 'FETCH_EVENT_FAIL';

export const FETCH_TEAM_INITIATED = 'FETCH_TEAM_INITIATED';
export const FETCH_TEAM_SUCCESS = 'FETCH_TEAM_SUCCESS';
export const FETCH_TEAM_FAIL = 'FETCH_TEAM_FAIL';

export const CREATE_EVENT_INITIATED = 'CREATE_EVENT_INITIATED';
export const UPDATE_EVENT_INITIATED = 'UPDATE_EVENT_INITIATED';
export const UPDATE_EVENT_SUCCESS = 'UPDATE_EVENT_SUCCESS';
export const UPDATE_EVENT_FAIL = 'UPDATE_EVENT_FAIL';

export const FETCH_ATTENDEES_INITIATED = 'FETCH_ATTENDEES_INITIATED';
export const FETCH_ATTENDEES_SUCCESS = 'FETCH_ATTENDEES_SUCCESS';
export const FETCH_ATTENDEES_FAILED = 'FETCH_ATTENDEES_FAILED';

export const CREATE_TEAM_INITIATED='CREATE_TEAM_INITIATED';
export const UPDATE_TEAM_INITIATED='UPDATE_TEAM_INITIAED';
export const UPDATE_TEAM_SUCCESS='UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_FAIL='UPDATE_TEAM_FAIL';

export const DELETE_TEAM_INITIATED='DELETE_TEAM_INITIATED';
export const DELETE_TEAM_SUCCESS='DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_FAIL='DELETE_TEAM_FAIL';

export const ADD_TEAM_MEMBER_INITIATED='ADD_TEAM_MEMBER_INITIATED';

export const REGISTER_PARTICIPANT_INITIATED = 'REGISTER_PARTICIPANT_INITIATED';
export const REGISTER_PARTICIPANT_SUCCESS = 'REGISTER_PARTICIPANT_SUCCESS';
export const REGISTER_PARTICIPANT_FAIL = 'REGISTER_PARTICIPANT_FAIL';


export const HTTP_STANDARD_ERRORS = {
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    408: 'Request time out',
    413: 'Payload to large',
    414: 'URL to long',
    415: 'Unsupported media type',
    500: 'Internal server error',
    501: 'Not implemented',
    502: 'Bad gateway',
    503: 'Service unavailable',
    504: 'Gateway timeout',
  };