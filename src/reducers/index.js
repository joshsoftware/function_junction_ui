import { combineReducers } from 'redux';
import eventsReducer from './events';
import eventReducer from './event';

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
});
