// eslint-disable-next-line import/named
import { ADD_EVENTS, ADD_ALL_EVENTS } from '../constants';

const INIT_STATE = {
  all: [],
  grouped: [],
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_EVENTS:
      return { ...state, grouped: action.payload };
    case ADD_ALL_EVENTS:
      return { ...state, all: action.payload };

    default:
      return { ...state };
  }
};
