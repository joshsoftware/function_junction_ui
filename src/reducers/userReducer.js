// import { FETCH_USERS_INITIATED, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL } from 'UTILS/actionConstants';
const initialState = {
  isLoading: false,
  data: [],
  error: null,
}

export default function usersReducer (state = initialState, action) {
  switch(action.type) {
    case 'FETCH_USERS_INITIATED': return {
      isLoading: true,
      data: [],
      error: null,
    }
    case 'FETCH_USERS_SUCCESS': return {
      isLoading: false,
      data: action.payload,
      error: null,
    }
    case 'FETCH_USERS_FAIL': return {
      isLoading: false,
      data: [],
      error: action.payload,
    }
    default: return state;
  }
}