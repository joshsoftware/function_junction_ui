import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import eventReducer from './eventReducer';
import attendeesReducer from './attendeesReducer';

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
  attendees: attendeesReducer,
});
