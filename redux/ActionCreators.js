import {
  CHANGE_LANGUAGE, CHANGE_THEME
} from './ActionTypes';

// settings
export const changeLanguage = (lang) => ({
  type: CHANGE_LANGUAGE,
  payload: lang
});

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme
});