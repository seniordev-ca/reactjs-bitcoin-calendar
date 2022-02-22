import { combineReducers } from 'redux';
import settings from './settings/reducer';
import events from './events/reducer';

const reducers = combineReducers({
  settings,
  events,
});

export default reducers;
