// eslint-disable-next-line import/named
import { ADD_EVENTS, ADD_ALL_EVENTS } from '../constants';

// eslint-disable-next-line import/prefer-default-export
export const addEvents = (events) => {
  return {
    type: ADD_EVENTS,
    payload: events,
  };
};

export const addAllEvents = (events) => {
  return {
    type: ADD_ALL_EVENTS,
    payload: events,
  };
};
