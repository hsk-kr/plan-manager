import {
  CHANGE_LANGUAGE,
  CHANGE_THEME
} from './ActionTypes';

const settings = (
  state = {
    language: 'korean',
    theme: 'blue'
  },
  action
) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: action.payload
      };
    default:
      return state;
  }
};

export default settings;