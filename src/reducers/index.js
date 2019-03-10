import { combineReducers } from 'redux';
import eventsReducer from './eventsReducer';
import eventReducer from './eventReducer';

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
});
